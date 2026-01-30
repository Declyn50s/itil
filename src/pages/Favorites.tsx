import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppDB } from '../store/appStore'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { getModulesByLang } from '../data/modules'
import type { ModuleId, Session } from '../types'

export default function Favorites() {
  const nav = useNavigate()
  const lang = AppDB.getSettings().language
  const favs = useMemo(() => AppDB.getFavorites(), [])
  const qmap = useMemo(() => AppDB.getQuestionMap(), [])
  const [module, setModule] = useState<ModuleId | 'ALL'>('ALL')

  const favIds = Object.keys(favs)
    .filter(qid => module === 'ALL' ? true : qmap[qid]?.module === module)
    .sort((a,b) => (favs[b]?.createdAt ?? '').localeCompare(favs[a]?.createdAt ?? ''))

  const start = () => {
    const modules = module === 'ALL' ? (['M2','M3','M4','M5','M6','M7'] as ModuleId[]) : [module]
    const s = AppDB.createSession({ mode:'review', modules, language: lang, questionCount: Math.max(1, favIds.length), feedback:'instant', examMinutes:30 })
    const fixed: Session = { ...s, questionIds: favIds.length ? favIds : s.questionIds }
    for (const qid of fixed.questionIds) {
      fixed.answers[qid] = { questionId: qid, selectedIndex: null, isCorrect: null, answeredAt: null }
    }
    AppDB.saveSession(fixed)
    nav(`/session/${fixed.id}`)
  }

  return (
    <div className="space-y-4">
      <Card className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">Favoris</div>
          <Button onClick={start} disabled={!favIds.length}>Réviser favoris</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <FilterChip label="Tous" active={module==='ALL'} onClick={() => setModule('ALL')} />
          {getModulesByLang(lang).map(m => (
            <FilterChip key={m.id} label={m.title} active={module===m.id} onClick={() => setModule(m.id)} />
          ))}
        </div>

        <div className="text-xs text-zinc-500 dark:text-zinc-400">{favIds.length} question(s).</div>
      </Card>

      <Card className="space-y-3">
        {favIds.length ? (
          <ul className="space-y-2">
            {favIds.map(qid => (
              <li key={qid} className="rounded-2xl border border-zinc-200 p-3 dark:border-zinc-800">
                <div className="text-sm font-medium">{qmap[qid]?.stem}</div>
                <div className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  {qid} · {getModulesByLang(lang).find(m => m.id === qmap[qid]?.module)?.title ?? qmap[qid]?.module}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-sm text-zinc-600 dark:text-zinc-300">Aucun favori pour l’instant.</div>
        )}
      </Card>
    </div>
  )
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={
        'rounded-full border px-3 py-1.5 text-xs transition ' +
        (active
          ? 'border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-900'
          : 'border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900')
      }
      type="button"
    >
      {label}
    </button>
  )
}
