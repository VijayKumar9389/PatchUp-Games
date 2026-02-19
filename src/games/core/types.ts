import type { ComponentType } from 'react'

export type Difficulty = 'easy' | 'medium' | 'hard'

export type GameProps = {
  onComplete?: () => void
  duration?: number
  difficulty?: Difficulty
  colorTheme?: string
}

export type GameComponent = ComponentType<GameProps>

export type GameMetadata = {
  id: string
  name: string
  description: string
  component: GameComponent
  minDuration?: number
  maxDuration?: number
  supportedDifficulties?: Difficulty[]
}

export type PointerState = {
  isDown: boolean
  x: number
  y: number
  pressure: number
}

export type AnimationCallback = (deltaTime: number, elapsedTime: number) => void
