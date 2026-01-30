import { useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AppDB } from '../store/appStore'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { MODULES } from '../data/modules'
import type { ModuleId, Session } from '../types'
import { msToClock } from '../lib/utils'
import { ProgressBar } from '../components/ProgressBar'

export default function Results() {
  const { id } = useParams()
  const nav = useNavigate()
  const session = useMemo(() => (id ? AppDB.getSession(id) : null), [id])
  const qmap = useMemo(() => AppDB.getQuestionMap(), [])
  if (!session || !id) {
    return (
      <Card>
        <div className="text-sm">Résultats introuvables.</div>
        <div className="mt-3"><Button onClick={() => nav('/')}>Retour</Button></div>
      </Card>
    )
  }

  const answered = session.questionIds.map(qid => session.answers[qid]).filter(a => a?.isCorrect !== null)
  const correct = answered.filter(a => a.isCorrect).length
  const total = session.questionIds.length
  const pct = Math.round((correct / Math.max(1, total)) * 100)

  const started = new Date(session.startedAt).getTime()
  const ended = new Date(session.finishedAt ?? new Date().toISOString()).getTime()
  const duration = Math.max(0, ended - started)

  const wrongIds = session.questionIds.filter(qid => session.answers[qid]?.isCorrect === false)
  const byModule = moduleBreakdown(session, qmap)

  const reviewErrors = () => {
    const s = AppDB.createSession({
      mode: 'review',
      modules: session.config.modules,
      language: session.config.language,
      questionCount: Math.max(1, wrongIds.length),
      feedback: 'instant',
      examMinutes: 30,
    })
    // overwrite selected question set with wrongIds for precise error review
    const fixed: Session = { ...s, questionIds: wrongIds.length ? wrongIds : s.questionIds }
    for (const qid of fixed.questionIds) {
      fixed.answers[qid] = { questionId: qid, selectedIndex: null, isCorrect: null, answeredAt: null }
    }
    AppDB.saveSession(fixed)
    nav(`/session/${fixed.id}`)
  }

  return (
    <div className="space-y-4">
      <Card className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold">Résultats · {labelMode(session.config.mode)}</div>
            <div className="text-sm text-zinc-600 dark:text-zinc-300">{correct}/{total} correct · {pct}% · {msToClock(duration)}</div>
          </div>
          <Link to="/" className="text-sm underline underline-offset-4">Accueil</Link>
        </div>
        <ProgressBar value={pct} />
        <div className="flex gap-2">
          <Button onClick={reviewErrors} className="flex-1">Revoir mes erreurs</Button>
          <Button variant="secondary" onClick={() => nav('/session/new')} className="flex-1">Nouvelle session</Button>
        </div>
      </Card>

      <Card className="space-y-3">
        <div className="text-sm font-semibold">Domaines faibles</div>
        <div className="grid gap-2">
          {byModule.map(row => (
            <div key={row.module} className="rounded-2xl border border-zinc-200 p-3 dark:border-zinc-800">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">{title(row.module)}</div>
                <div className="text-sm">{row.correct}/{row.total}</div>
              </div>
              <div className="mt-2"><ProgressBar value={row.total ? Math.round((row.correct/row.total)*100) : 0} /></div>
              <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">Questions vues dans cette session</div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="space-y-3">
        <div className="text-sm font-semibold">Erreurs à revoir</div>
        {wrongIds.length ? (
          <ul className="space-y-2">
            {wrongIds.slice(0, 12).map(qid => (
              <li key={qid} className="rounded-2xl border border-zinc-200 p-3 text-sm dark:border-zinc-800">
                <div className="font-medium">{qmap[qid]?.stem}</div>
                <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{qid} · {title(qmap[qid]?.module as ModuleId)}</div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-sm text-zinc-600 dark:text-zinc-300">Aucune erreur 🎯</div>
        )}
      </Card>
    </div>
  )
}

function labelMode(m: string) {
  if (m === 'review') return 'Révision'
  if (m === 'test') return 'Test'
  if (m === 'exam') return 'Examen'
  return m
}

function title(id: ModuleId) {
  return MODULES.find(m => m.id === id)?.title ?? id
}

function moduleBreakdown(session: Session, qmap: Record<string, any>) {
  const rows: Array<{ module: ModuleId; correct: number; total: number }> = []
  const modules = Array.from(new Set(session.questionIds.map(id => qmap[id]?.module))) as ModuleId[]
  for (const m of modules) {
    const ids = session.questionIds.filter(id => qmap[id]?.module === m)
    const total = ids.length
    const correct = ids.filter(id => session.answers[id]?.isCorrect === true).length
    rows.push({ module: m, correct, total })
  }
  // sort worst first
  rows.sort((a,b) => (a.total ? a.correct/a.total : 1) - (b.total ? b.correct/b.total : 1))
  return rows
}
