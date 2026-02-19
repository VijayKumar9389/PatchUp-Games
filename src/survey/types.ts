export type QuestionType = 'text' | 'multiple_choice' | 'yes_no'

export type Question = {
  id: string
  type: QuestionType
  text: string
  options?: string[]
  required?: boolean
}

export type Answer = {
  questionId: string
  value: string | string[]
}

export type SurveyState = {
  currentIndex: number
  answers: Answer[]
  showingGame: boolean
  currentGameId: string | null
  recentGameIds: string[]
}

export type SurveyConfig = {
  gameFrequency?: number // Show game every N questions (default: 2)
  maxRecentGames?: number // Number of recent games to track for no-repeat (default: 3)
  allowSkip?: boolean // Allow skipping questions
  showProgress?: boolean // Show progress indicator
  transitionDuration?: number // Transition duration in ms (default: 500)
}

export type SurveyEngineProps = {
  questions: Question[]
  gameIds?: string[] // Specific games to use, or all if not specified
  config?: SurveyConfig
  onComplete?: (answers: Answer[]) => void
  onAnswerChange?: (answer: Answer) => void
  devMode?: boolean
}
