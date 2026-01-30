import { useMemo } from 'react'
import { Card } from '../components/Card'
import { MODULES } from '../data/modules'
import { AppDB } from '../store/appStore'
import type { ModuleId } from '../types'
import { ProgressBar } from '../components/ProgressBar'

export default function Stats() {
  const progress = useMemo(() => AppDB.getProgress(), [])
  const questions = useMemo(() => AppDB.getQuestions(), [])

  const moduleStats = MODULES.map(m => {
    const ids = questions.filter(q => q.module === m.id).map(q => q.id)
    const attempts = ids.reduce((acc, id) => acc + (progress[id]?.attempts ?? 0), 0)
    const wrong = ids.reduce((acc, id) => acc + (progress[id]?.wrong ?? 0), 0)
    const correct = ids.reduce((acc, id) => acc + (progress[id]?.correct ?? 0), 0)
    const mastered = ids.filter(id => (progress[id]?.streak ?? 0) >= 3).length
    const masteryPct = ids.length ? Math.round((mastered / ids.length) * 100) : 0
    const scorePct = (correct + wrong) ? Math.round((correct / (correct + wrong)) * 100) : 0
    return { id: m.id, title: m.title, subtitle: m.subtitle, attempts, wrong, correct, masteryPct, scorePct, total: ids.length }
  })

  // “À revoir”: wrong recently or streak 0
  const toReview = questions
    .filter(q => (progress[q.id]?.lastResult === 'wrong') || ((progress[q.id]?.attempts ?? 0) > 0 && (progress[q.id]?.streak ?? 0) === 0))
    .sort((a,b) => (progress[b.id]?.lastWrongAt ?? '').localeCompare(progress[a.id]?.lastWrongAt ?? ''))
    .slice(0, 12)

  return (
    <div className="space-y-4">
      <Card className="space-y-2">
        <div className="text-sm font-semibold">Stats</div>
        <div className="text-sm text-zinc-600 dark:text-zinc-300">
          Maîtrise = streak ≥ 3. Objectif: faire monter le score et réduire “À revoir”.
        </div>
      </Card>

      <div className="grid gap-3 md:grid-cols-2">
        {moduleStats.map(s => (
          <Card key={s.id} className="space-y-3">
            <div>
              <div className="text-sm font-semibold">{s.title}</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-300">{s.subtitle}</div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                <span>Maîtrise</span><span>{s.masteryPct}%</span>
              </div>
              <ProgressBar value={s.masteryPct} />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                <span>Score (historique)</span><span>{s.scorePct}%</span>
              </div>
              <ProgressBar value={s.scorePct} />
            </div>

            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              Tentatives: {s.attempts} · Correct: {s.correct} · Faux: {s.wrong} · Banque: {s.total}
            </div>
          </Card>
        ))}
      </div>

      <Card className="space-y-3">
        <div className="text-sm font-semibold">À revoir</div>
        {toReview.length ? (
          <ul className="space-y-2">
            {toReview.map(q => (
              <li key={q.id} className="rounded-2xl border border-zinc-200 p-3 text-sm dark:border-zinc-800">
                <div className="font-medium">{q.stem}</div>
                <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  {q.id} · {MODULES.find(m => m.id === (q.module as ModuleId))?.title ?? q.module}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-sm text-zinc-600 dark:text-zinc-300">Rien à revoir pour l’instant.</div>
        )}
      </Card>
    </div>
  )
}
