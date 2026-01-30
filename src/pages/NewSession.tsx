import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { getModulesByLang } from '../data/modules'
import type { Mode, ModuleId, SessionConfig } from '../types'
import { AppDB } from '../store/appStore'
import { cn } from '../lib/utils'
import { t } from '../lib/i18n'

export default function NewSession() {
  const nav = useNavigate()
  const loc = useLocation()
  const preset = new URLSearchParams(loc.search).get('module') as ModuleId | null

  const lang = AppDB.getSettings().language

  const [mode, setMode] = useState<Mode>('review')
  const [modules, setModules] = useState<ModuleId[]>(preset ? [preset] : ['M2'])
  const [questionCount, setQuestionCount] = useState(10)
  const [feedback, setFeedback] = useState<'instant' | 'end'>('instant')
  const [examMinutes, setExamMinutes] = useState(30)

  const availableCount = useMemo(() => {
    const all = AppDB.getQuestions(lang)
    return all.filter(q => modules.includes(q.module)).length
  }, [modules, lang])

  const moduleCounts = useMemo(() => {
    const all = AppDB.getQuestions(lang)
    const map: Record<string, number> = {}
    for (const q of all) map[q.module] = (map[q.module] ?? 0) + 1
    return map
  }, [lang])

  const suggestedCounts = useMemo(() => {
    const base = [5, 10, 20, 40]
    const max = Math.max(1, availableCount)
    const filtered = base.filter(n => n < max)
    const result = [...filtered, max]
    // Avoid duplicates and keep sorted
    return Array.from(new Set(result)).sort((a, b) => a - b)
  }, [availableCount])

  // Ensure questionCount never exceeds what's available (per selected modules + language)
  useEffect(() => {
    const max = Math.max(1, availableCount)
    if (questionCount > max) setQuestionCount(max)
  }, [availableCount, questionCount])

  const toggleModule = (id: ModuleId) => {
    setModules(prev => {
      if (prev.includes(id)) return prev.length === 1 ? prev : prev.filter(x => x !== id)
      return [...prev, id]
    })
  }

  const start = () => {
    const config: SessionConfig = {
      mode,
      modules,
      language: lang,
      questionCount,
      feedback,
      examMinutes,
    }
    const s = AppDB.createSession(config)
    nav(`/session/${s.id}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">{t(lang, 'new_title')}</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">{t(lang, 'new_sub')}</p>
      </div>

      <Card className="space-y-4">
        <div className="text-sm font-semibold">{t(lang, 'new_modules')}</div>
        <div className="grid gap-2 sm:grid-cols-2">
          {getModulesByLang(lang).map(m => {
            const count = moduleCounts[m.id] ?? 0
            const disabled = count === 0
            return (
            <button
              key={m.id}
              onClick={() => toggleModule(m.id)}
              disabled={disabled}
              className={cn(
                'rounded-2xl border px-4 py-3 text-left transition',
                disabled && 'opacity-50 cursor-not-allowed',
                modules.includes(m.id)
                  ? 'border-zinc-900 bg-zinc-50 dark:border-white dark:bg-zinc-900'
                  : 'border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900',
              )}
            >
              <div className="text-sm font-semibold">{m.title}</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-300">{m.subtitle}</div>
              <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">{count} {t(lang, 'home_questions')}</div>
            </button>
            )
          })}
        </div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          {t(lang, 'new_available')}: {availableCount}
        </div>
        {modules.length === 1 && (
          <div className="pt-2">
            <Link to={`/module/${modules[0]}/summary`} className="text-sm underline underline-offset-4">
              {t(lang, 'home_summary')}
            </Link>
          </div>
        )}

      </Card>

      <Card className="space-y-4">
        <div className="text-sm font-semibold">{t(lang, 'new_mode')}</div>
        <div className="flex flex-wrap gap-2">
          <ChoiceButton label={t(lang, 'new_review')} active={mode==='review'} onClick={() => setMode('review')} />
          <ChoiceButton label={t(lang, 'new_test')} active={mode==='test'} onClick={() => setMode('test')} />
          <ChoiceButton label={t(lang, 'new_exam')} active={mode==='exam'} onClick={() => setMode('exam')} />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <div className="text-sm font-medium">{t(lang, 'new_count')}</div>
            <div className="flex gap-2">
              {suggestedCounts.map(n => (
                <ChoiceButton key={n} label={String(n)} active={questionCount===n} onClick={() => setQuestionCount(n)} />
              ))}
              <input
                type="number"
                min={1}
                max={Math.max(1, availableCount)}
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value || 1))}
                className="w-24 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-950"
              />
            </div>
          </div>

          {mode === 'test' && (
            <div className="space-y-1">
              <div className="text-sm font-medium">{t(lang, 'new_feedback')}</div>
              <div className="flex gap-2">
                <ChoiceButton label={t(lang, 'new_instant')} active={feedback==='instant'} onClick={() => setFeedback('instant')} />
                <ChoiceButton label={t(lang, 'new_end')} active={feedback==='end'} onClick={() => setFeedback('end')} />
              </div>
            </div>
          )}

          {mode === 'exam' && (
            <div className="space-y-1">
              <div className="text-sm font-medium">{t(lang, 'new_timer')}</div>
              <div className="flex gap-2">
                {[30,45,60].map(n => (
                  <ChoiceButton key={n} label={String(n)} active={examMinutes===n} onClick={() => setExamMinutes(n)} />
                ))}
                <input
                  type="number"
                  min={5}
                  max={180}
                  value={examMinutes}
                  onChange={(e) => setExamMinutes(Number(e.target.value || 30))}
                  className="w-24 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-950"
                />
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">{t(lang, 'new_exam_hint')}</div>
            </div>
          )}
        </div>
      </Card>

      <div className="flex gap-2">
        <Button onClick={start} className="flex-1">{t(lang, 'new_start')}</Button>
        <Button variant="secondary" onClick={() => nav('/')} className="flex-1">{t(lang, 'new_cancel')}</Button>
      </div>
    </div>
  )
}

function ChoiceButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-xl border px-3 py-2 text-sm transition',
        active
          ? 'border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-zinc-900'
          : 'border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900',
      )}
      type="button"
    >
      {label}
    </button>
  )
}
