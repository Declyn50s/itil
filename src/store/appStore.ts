import { storage } from '../lib/storage'
import { nowIso } from '../lib/utils'
import type { FavoriteState, NoteState, ProgressState, ProgressItem, Session, SessionConfig, Question, Lang } from '../types'
import { QUESTIONS_ALL, getQuestionsByLang } from '../data/questions'

const KEY = {
  favorites: 'itilcoach:favorites',
  notes: 'itilcoach:notes',
  progress: 'itilcoach:progress',
  sessions: 'itilcoach:sessions',
  lastSessionId: 'itilcoach:lastSessionId',
  settings: 'itilcoach:settings',
} as const

export type Settings = {
  theme: 'light' | 'dark'
  language: Lang
}

const defaultSettings: Settings = { theme: 'light', language: 'fr' }

export const AppDB = {
  getQuestions(lang?: Lang): Question[] {
    if (lang) return getQuestionsByLang(lang)
    return QUESTIONS_ALL
  },
  getQuestionMap(): Record<string, Question> {
    const map: Record<string, Question> = {}
    // Map ALL questions so old sessions (FR/EN) can still render
    for (const q of QUESTIONS_ALL) map[q.id] = q
    return map
  },
  // Settings
  getSettings(): Settings {
    const raw = storage.get<Partial<Settings>>(KEY.settings, defaultSettings as any)
    const theme = raw.theme === 'dark' || raw.theme === 'light' ? raw.theme : defaultSettings.theme
    const language = raw.language === 'en' || raw.language === 'fr' ? raw.language : defaultSettings.language
    return { theme, language }
  },
  setSettings(s: Settings) {
    storage.set(KEY.settings, s)
  },
  // Favorites
  getFavorites(): FavoriteState {
    return storage.get(KEY.favorites, {})
  },
  toggleFavorite(questionId: string) {
    const favs = storage.get<FavoriteState>(KEY.favorites, {})
    if (favs[questionId]) delete favs[questionId]
    else favs[questionId] = { createdAt: nowIso() }
    storage.set(KEY.favorites, favs)
    return favs
  },
  isFavorite(questionId: string) {
    const favs = storage.get<FavoriteState>(KEY.favorites, {})
    return Boolean(favs[questionId])
  },
  // Notes
  getNotes(): NoteState {
    return storage.get(KEY.notes, {})
  },
  setNote(questionId: string, content: string) {
    const notes = storage.get<NoteState>(KEY.notes, {})
    notes[questionId] = { content, updatedAt: nowIso() }
    storage.set(KEY.notes, notes)
    return notes
  },
  // Progress
  getProgress(): ProgressState {
    return storage.get(KEY.progress, {})
  },
  updateProgress(questionId: string, isCorrect: boolean) {
    const p = storage.get<ProgressState>(KEY.progress, {})
    const cur: ProgressItem = p[questionId] ?? {
      questionId,
      attempts: 0,
      correct: 0,
      wrong: 0,
      streak: 0,
      lastResult: null,
      lastSeen: null,
      lastWrongAt: null,
    }
    cur.attempts += 1
    cur.lastSeen = nowIso()
    if (isCorrect) {
      cur.correct += 1
      cur.streak = cur.lastResult === 'correct' ? cur.streak + 1 : 1
      cur.lastResult = 'correct'
    } else {
      cur.wrong += 1
      cur.streak = 0
      cur.lastResult = 'wrong'
      cur.lastWrongAt = nowIso()
    }
    p[questionId] = cur
    storage.set(KEY.progress, p)
    return p
  },
  // Sessions
  getSessions(): Record<string, Session> {
    return storage.get(KEY.sessions, {})
  },
  getSession(id: string): Session | null {
    const all = storage.get<Record<string, Session>>(KEY.sessions, {})
    return all[id] ?? null
  },
  saveSession(session: Session) {
    const all = storage.get<Record<string, Session>>(KEY.sessions, {})
    all[session.id] = session
    storage.set(KEY.sessions, all)
    storage.set(KEY.lastSessionId, session.id)
  },
  getLastSessionId(): string | null {
    return storage.get(KEY.lastSessionId, null as any)
  },
  clearLastSessionId() {
    storage.remove(KEY.lastSessionId)
  },
  createSession(config: SessionConfig): Session {
    const id = `S_${Math.random().toString(16).slice(2)}_${Date.now()}`
    const questionIds = pickQuestions(config)
    const answers: Session['answers'] = {}
    for (const qid of questionIds) {
      answers[qid] = { questionId: qid, selectedIndex: null, isCorrect: null, answeredAt: null }
    }
    const s: Session = {
      id,
      config,
      questionIds,
      startedAt: nowIso(),
      finishedAt: null,
      currentIndex: 0,
      answers,
    }
    this.saveSession(s)
    return s
  },
  finishSession(id: string) {
    const s = this.getSession(id)
    if (!s) return null
    if (!s.finishedAt) s.finishedAt = nowIso()
    this.saveSession(s)
    return s
  },
}

function pickQuestions(config: SessionConfig): string[] {
  const pool = getQuestionsByLang(config.language).filter(q => config.modules.includes(q.module)).map(q => q.id)
  // If not enough questions, allow repeats (for MVP)
  const ids: string[] = []
  const max = Math.max(1, pool.length)
  const count = Math.max(1, Math.min(config.questionCount, max))
  for (let i = 0; i < count; i++) {
    const pick = pool[i % pool.length]
    ids.push(pick)
  }
  // light shuffle for variety except review favorites sometimes
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const tmp = ids[i]; ids[i] = ids[j]; ids[j] = tmp
  }
  return ids
}
