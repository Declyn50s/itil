import { Link, useNavigate } from 'react-router-dom'
import { Play, RotateCcw, Star, Zap } from 'lucide-react'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { getModulesByLang } from '../data/modules'
import { AppDB } from '../store/appStore'
import { ProgressBar } from '../components/ProgressBar'
import type { ModuleId } from '../types'
import { t } from '../lib/i18n'

export default function Home() {
  const nav = useNavigate()
  const lang = AppDB.getSettings().language
  const lastId = AppDB.getLastSessionId()
  const last = lastId ? AppDB.getSession(lastId) : null
  const progress = AppDB.getProgress()

  const questionsByLang = AppDB.getQuestions(lang)

  const countByModule = (m: ModuleId) => questionsByLang.filter(q => q.module === m).length

  const masteryByModule = (m: ModuleId) => {
    const qids = questionsByLang.filter(q => q.module === m).map(q => q.id)
    if (!qids.length) return 0
    const mastered = qids.filter(id => (progress[id]?.streak ?? 0) >= 3).length
    return Math.round((mastered / qids.length) * 100)
  }

  const quickStart5 = () => {
    const s = AppDB.createSession({
      mode: 'review',
      modules: ['M2','M3','M4','M5','M6','M7'],
      language: lang,
      questionCount: 5,
      feedback: 'instant',
      examMinutes: 30,
    })
    nav(`/session/${s.id}`)
  }

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold tracking-tight">{t(lang, 'home_title')}</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">{t(lang, 'home_sub')}</p>

        <div className="flex flex-wrap gap-2">
          <Button onClick={() => nav('/session/new')} className="gap-2"><Play size={18} /> {t(lang, 'home_start')}</Button>
          <Button variant="secondary" onClick={quickStart5} className="gap-2"><Zap size={18} /> {t(lang, 'home_quick5')}</Button>
          <Button variant="secondary" className="gap-2" onClick={() => nav('/favorites')}>
            <Star size={18} /> {t(lang, 'nav_favorites')}
          </Button>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-2">
        {getModulesByLang(lang).map(m => (
          <Card key={m.id} className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold">{m.title}</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-300">{m.subtitle}</div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Link to={`/module/${m.id}/summary`} className="underline underline-offset-4">{t(lang, 'home_summary')}</Link>
                <Link to={`/session/new?module=${m.id}`} className="underline underline-offset-4">{t(lang, 'home_review')}</Link>
              </div>
            </div>
            <ProgressBar value={masteryByModule(m.id)} />
            <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
              <span>{t(lang, 'home_mastered')}: {masteryByModule(m.id)}%</span>
              <span>{countByModule(m.id)} {t(lang, 'home_questions')}</span>
            </div>
          </Card>
        ))}
      </section>

      <section className="grid gap-3 md:grid-cols-2">
        <Card className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="font-semibold">{t(lang, 'home_resume')}</div>
            <RotateCcw size={18} className="text-zinc-500" />
          </div>
          {last ? (
            <>
              <div className="text-sm text-zinc-600 dark:text-zinc-300">
                {labelMode(last.config.mode, lang)}, {last.config.questionCount} {t(lang, 'home_questions')}
              </div>
              <Button onClick={() => nav(`/session/${last.id}`)} className="w-full">{t(lang, 'home_continue')}</Button>
            </>
          ) : (
            <div className="text-sm text-zinc-600 dark:text-zinc-300">{t(lang, 'home_none')}</div>
          )}
        </Card>

        <Card className="space-y-3">
          <div className="font-semibold">{t(lang, 'home_daily')}</div>
          <div className="text-sm text-zinc-600 dark:text-zinc-300">{t(lang, 'home_daily_text')}</div>
          <Button variant="secondary" onClick={quickStart5} className="w-full">{t(lang, 'home_launch5')}</Button>
        </Card>
      </section>
    </div>
  )
}

function labelMode(m: string, lang: 'fr' | 'en') {
  if (m === 'review') return t(lang, 'new_review')
  if (m === 'test') return t(lang, 'new_test')
  if (m === 'exam') return t(lang, 'new_exam')
  return m
}
