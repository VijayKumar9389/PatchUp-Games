// Core exports
export { GameContainer, GameArea, CompletionOverlay } from './core/GameContainer'
export { mindfulTheme, mindfulColors, transitions, accessibleTextOnColor, getAnimationDuration } from './core/theme'
export { usePointer, useAnimationFrame, useAnimationProgress, useHold, useSound } from './core/hooks'
export type { GameProps, GameComponent, GameMetadata, Difficulty, PointerState, AnimationCallback } from './core/types'

// Registry exports
export { gameRegistry, getGameById, getRandomGame, getGamesByDifficulty } from './registry'

// Game module exports
export { default as BreathingBubble } from './modules/BreathingBubble'
export { default as EmotionColorPicker } from './modules/EmotionColorPicker'
export { default as GentleReactionBell } from './modules/GentleReactionBell'
export { default as SlowTurtle } from './modules/SlowTurtle'
export { default as ThoughtClouds } from './modules/ThoughtClouds'
export { default as FeatherFloat } from './modules/FeatherFloat'
export { default as OrbitCalm } from './modules/OrbitCalm'
export { default as MemoryMatch } from './modules/MemoryMatch'
export { default as ColorHunt } from './modules/ColorHunt'
export { default as CleanWindow } from './modules/CleanWindow'
export { default as TraceShape } from './modules/TraceShape'
export { default as StarCollector } from './modules/StarCollector'
export { default as ApplePicking } from './modules/ApplePicking'
export { default as ObjectRecall } from './modules/ObjectRecall'
export { default as EmotionMatch } from './modules/EmotionMatch'
export { default as PatternComplete } from './modules/PatternComplete'
export { default as GlowOrder } from './modules/GlowOrder'
export { default as SymbolSwap } from './modules/SymbolSwap'
