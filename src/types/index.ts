export interface TypingStats {
  wpm: number
  accuracy: number
  correctChars: number
  incorrectChars: number
  totalChars: number
  timeElapsed: number
  startTime: number | null
  isComplete: boolean
}

export interface CharacterState {
  char: string
  status: 'pending' | 'correct' | 'incorrect' | 'current'
  index: number
}

export interface TypingSession {
  id: string
  text: string
  characters: CharacterState[]
  stats: TypingStats
  settings: TypingSettings
  createdAt: Date
  completedAt?: Date
}

export interface TypingSettings {
  difficulty: 'easy' | 'medium' | 'hard'
  wordCount: number
  showKeyboard: boolean
  soundEnabled: boolean
  theme: 'light' | 'dark' | 'system'
  fontSize: 'small' | 'medium' | 'large'
  showWpmLive: boolean
  highlightErrors: boolean
}

export interface KeyboardLayout {
  rows: string[][]
}

export interface ProgressHistory {
  date: string
  wpm: number
  accuracy: number
  timeSpent: number
}

export type GameMode = 'words' | 'time' | 'quote' | 'custom'
