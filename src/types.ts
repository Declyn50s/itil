export type ModuleId = 'M2' | 'M3' | 'M4' | 'M5' | 'M6' | 'M7' | 'EX1'

export type Lang = 'fr' | 'en'

export type Question = {
  id: string
  module: ModuleId
  stem: string
  choices: string[]
  answerIndex: number
  rationale: string
}

export type Mode = 'review' | 'test' | 'exam'

export type SessionConfig = {
  mode: Mode
  modules: ModuleId[]
  language: Lang
  questionCount: number
  feedback: 'instant' | 'end' // only for test
  examMinutes: number // only for exam
}

export type Answer = {
  questionId: string
  selectedIndex: number | null
  isCorrect: boolean | null
  answeredAt: string | null
}

export type Session = {
  id: string
  config: SessionConfig
  questionIds: string[]
  startedAt: string
  finishedAt: string | null
  currentIndex: number
  answers: Record<string, Answer>
}

export type ProgressItem = {
  questionId: string
  attempts: number
  correct: number
  wrong: number
  streak: number
  lastResult: 'correct' | 'wrong' | null
  lastSeen: string | null
  lastWrongAt: string | null
}

export type ProgressState = Record<string, ProgressItem>

export type NoteState = Record<string, { content: string; updatedAt: string }>

export type FavoriteState = Record<string, { createdAt: string }>
