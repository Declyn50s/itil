import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppDB } from '../store/appStore'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { ModuleChips } from '../components/ModuleChips'
import { ProgressBar } from '../components/ProgressBar'
import { Check, Flag, NotebookPen, Star, Timer, X } from 'lucide-react'
import { msToClock, nowIso } from '../lib/utils'
import type { Question, Session } from '../types'
import { cn } from '../lib/utils'
import { t } from '../lib/i18n'

export default function SessionRunner() {
  const { id } = useParams()
  const nav = useNavigate()
  const [tick, setTick] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  const session = useMemo(() => (id ? AppDB.getSession(id) : null), [id, tick])
  const qmap = useMemo(() => AppDB.getQuestionMap(), [])
  const notes = useMemo(() => AppDB.getNotes(), [tick])
  const favs = useMemo(() => AppDB.getFavorites(), [tick])

  useEffect(() => {
    const t = window.setInterval(() => setTick(x => x + 1), 500)
    return () => window.clearInterval(t)
  }, [])

  if (!session || !id) {
    return (
      <Card>
        <div className="text-sm">{t(AppDB.getSettings().language, 'session_not_found')}</div>
        <div className="mt-3">
          <Button onClick={() => nav('/')}>{t(AppDB.getSettings().language, 'back')}</Button>
        </div>
      </Card>
    )
  }

  const lang = session.config.language

  const total = session.questionIds.length
  const idx = session.currentIndex
  const qid = session.questionIds[idx]
  const q = qmap[qid]
  const a = session.answers[qid]
  const answered = a?.isCorrect !== null

  const isExam = session.config.mode === 'exam'
  const isTest = session.config.mode === 'test'
  const instantFeedback = session.config.mode === 'review' || (isTest && session.config.feedback === 'instant')

  const startedAt = new Date(session.startedAt).getTime()
  const now = Date.now()
  const elapsedMs = now - startedAt
  const remainingMs = isExam ? Math.max(0, session.config.examMinutes * 60_000 - elapsedMs) : 0
  const timeUp = isExam && remainingMs <= 0 && !session.finishedAt

  useEffect(() => {
    if (timeUp) {
      AppDB.finishSession(id)
      nav(`/results/${id}`, { replace: true })
    }
  }, [timeUp, id, nav])

  const progressPct = Math.round(((idx) / Math.max(1, total)) * 100)

  const select = (choiceIndex: number) => {
    if (answered) return
    const correct = choiceIndex === q.answerIndex
    const next: Session = structuredClone(session)
    next.answers[qid] = {
      questionId: qid,
      selectedIndex: choiceIndex,
      isCorrect: correct,
      answeredAt: nowIso(),
    }
    // In exam mode, do not update progress until end? (we still can update, but it's hidden)
    if (!isExam) AppDB.updateProgress(qid, correct)
    AppDB.saveSession(next)
    setShowAnswer(false)
  }

  const toggleFav = () => {
    AppDB.toggleFavorite(qid)
    setTick(x => x + 1)
  }

  const saveNote = (content: string) => {
    AppDB.setNote(qid, content)
    setTick(x => x + 1)
  }

  const next = () => {
    const nextSession: Session = structuredClone(session)
    const nextIndex = Math.min(total - 1, idx + 1)
    nextSession.currentIndex = nextIndex
    AppDB.saveSession(nextSession)
    setShowAnswer(false)
  }

  const prev = () => {
    const nextSession: Session = structuredClone(session)
    const nextIndex = Math.max(0, idx - 1)
    nextSession.currentIndex = nextIndex
    AppDB.saveSession(nextSession)
    setShowAnswer(false)
  }

  const finish = () => {
    if (isExam) {
      // update progress at end using answers
      const s = AppDB.finishSession(id)
      if (s) {
        for (const qid of s.questionIds) {
          const ans = s.answers[qid]
          if (ans.isCorrect !== null) AppDB.updateProgress(qid, Boolean(ans.isCorrect))
        }
      }
    } else {
      AppDB.finishSession(id)
    }
    nav(`/results/${id}`)
  }

  return (
    <div className="space-y-4">
      <Card className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="text-sm font-semibold">
              {labelMode(session.config.mode, lang)} · {t(lang, 'question')} {idx + 1}/{total}
            </div>
            <ModuleChips modules={session.config.modules} />
          </div>

          {isExam && (
            <div className={cn('flex items-center gap-2 rounded-xl border px-3 py-2 text-sm',
              remainingMs <= 30_000 ? 'border-red-300 text-red-600 dark:border-red-800 dark:text-red-300' : 'border-zinc-200 dark:border-zinc-800'
            )}>
              <Timer size={18} />
              <span>{msToClock(remainingMs)}</span>
            </div>
          )}
        </div>

        <ProgressBar value={progressPct} />
      </Card>

      <Card className="space-y-4">
        <div className="text-lg font-semibold leading-snug">{q.stem}</div>

        <div className="grid gap-2">
          {q.choices.map((c, i) => {
            const selected = a?.selectedIndex === i
            const correct = answered && i === q.answerIndex
            const wrongSelected = answered && selected && a.isCorrect === false
            const disabled = answered && instantFeedback
            return (
              <button
                key={i}
                disabled={disabled}
                onClick={() => select(i)}
                className={cn(
                  'rounded-2xl border px-4 py-3 text-left text-sm transition focus:outline-none focus:ring-2 focus:ring-zinc-400 disabled:cursor-not-allowed',
                  'border-zinc-200 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900',
                  selected && 'border-zinc-900 dark:border-white',
                  correct && instantFeedback && 'border-green-600 bg-green-50 dark:bg-green-950',
                  wrongSelected && instantFeedback && 'border-red-600 bg-red-50 dark:bg-red-950',
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="pr-2">
                    <div className="font-medium">{String.fromCharCode(65 + i)}.</div>
                    <div className="text-sm text-zinc-700 dark:text-zinc-200">{c}</div>
                  </div>
                  {instantFeedback && answered && (
                    <div className="mt-1">
                      {correct ? <Check size={18} /> : wrongSelected ? <X size={18} /> : null}
                    </div>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={toggleFav} className="gap-2">
            <Star size={18} />
            {favs[qid] ? t(lang, 'remove_favorite') : t(lang, 'favorite')}
          </Button>

          {!isExam && (
            <Button variant="secondary" onClick={() => setShowAnswer(v => !v)} className="gap-2">
              <Flag size={18} />
              {showAnswer ? t(lang, 'hide_answer') : t(lang, 'show_answer')}
            </Button>
          )}

          <Button variant="secondary" onClick={() => document.getElementById('note')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="gap-2">
            <NotebookPen size={18} />
            {t(lang, 'note')}
          </Button>
        </div>

        {/* Feedback */}
        {!isExam && answered && (instantFeedback || showAnswer) && (
          <div className={cn('rounded-2xl border p-4',
            a.isCorrect ? 'border-green-300 bg-green-50 dark:border-green-900 dark:bg-green-950' : 'border-red-300 bg-red-50 dark:border-red-900 dark:bg-red-950'
          )}>
            <div className="flex items-center gap-2 text-sm font-semibold">
              {a.isCorrect ? <Check size={18} /> : <X size={18} />}
              {a.isCorrect ? t(lang, 'correct') : t(lang, 'incorrect')}
            </div>
            <div className="mt-2 text-sm">
              <span className="font-medium">{t(lang, 'good_answer')}</span> {String.fromCharCode(65 + q.answerIndex)}. {q.choices[q.answerIndex]}
            </div>
            <div className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">{q.rationale}</div>
          </div>
        )}

        {/* Notes */}
        {!isExam && (
          <div id="note" className="space-y-2">
            <div className="text-sm font-semibold">{t(lang, 'your_note')}</div>
            <textarea
              defaultValue={notes[qid]?.content ?? ''}
              onBlur={(e) => saveNote(e.target.value)}
              placeholder={t(lang, 'note_ph')}
              className="min-h-[96px] w-full rounded-2xl border border-zinc-200 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-zinc-400 dark:border-zinc-800 dark:bg-zinc-950"
            />
            <div className="text-xs text-zinc-500 dark:text-zinc-400">{t(lang, 'note_hint')}</div>
          </div>
        )}

        <div className="flex gap-2">
          <Button variant="secondary" onClick={prev} disabled={idx === 0} className="flex-1">{t(lang, 'previous')}</Button>
          {idx < total - 1 ? (
            <Button onClick={next} className="flex-1" disabled={isExam ? false : (instantFeedback ? !answered : false)}>
              {t(lang, 'next')}
            </Button>
          ) : (
            <Button onClick={finish} className="flex-1">{t(lang, 'finish')}</Button>
          )}
        </div>

        {isExam && (
          <div className="text-xs text-zinc-500 dark:text-zinc-400">{t(lang, 'exam_hint')}</div>
        )}
      </Card>
    </div>
  )
}

function labelMode(m: string, lang: 'fr' | 'en') {
  if (m === 'review') return t(lang, 'new_review')
  if (m === 'test') return t(lang, 'new_test')
  if (m === 'exam') return t(lang, 'new_exam')
  return m
}
