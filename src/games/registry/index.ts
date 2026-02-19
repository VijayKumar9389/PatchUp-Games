import type { GameMetadata } from '../core/types'

// Import only the games we're keeping
import BreathingBubble from '../modules/BreathingBubble'
import EmotionColorPicker from '../modules/EmotionColorPicker'
import GentleReactionBell from '../modules/GentleReactionBell'
import SlowTurtle from '../modules/SlowTurtle'
import ThoughtClouds from '../modules/ThoughtClouds'
import FeatherFloat from '../modules/FeatherFloat'
import OrbitCalm from '../modules/OrbitCalm'
import MemoryMatch from '../modules/MemoryMatch'
import ColorHunt from '../modules/ColorHunt'
import CleanWindow from '../modules/CleanWindow'
import TraceShape from '../modules/TraceShape'
import StarCollector from '../modules/StarCollector'
import ApplePicking from '../modules/ApplePicking'
import ObjectRecall from '../modules/ObjectRecall'
import EmotionMatch from '../modules/EmotionMatch'
import PatternComplete from '../modules/PatternComplete'
import GlowOrder from '../modules/GlowOrder'
import SymbolSwap from '../modules/SymbolSwap'
import ColoringBook from '../modules/ColoringBook'

export const gameRegistry: GameMetadata[] = [
  {
    id: 'breathing-bubble',
    name: 'Breathing Bubble',
    description: 'Press and hold to inflate a bubble as you breathe in, release to breathe out.',
    component: BreathingBubble,
    minDuration: 15000,
    maxDuration: 60000,
    supportedDifficulties: ['easy'],
  },
  {
    id: 'odd-emotion-out',
    name: 'Odd Emotion Out',
    description: 'Find the emotion that doesn\'t fit with the others.',
    component: EmotionColorPicker,
    minDuration: 5000,
    maxDuration: 15000,
    supportedDifficulties: ['easy'],
  },
  {
    id: 'reaction-bell',
    name: 'Reaction Bell',
    description: 'Tap the bell as fast as you can when it lights up.',
    component: GentleReactionBell,
    minDuration: 15000,
    maxDuration: 45000,
    supportedDifficulties: ['easy', 'medium'],
  },
  {
    id: 'slow-turtle',
    name: 'Slow Turtle',
    description: 'Tap slowly to help the turtle walk to the finish.',
    component: SlowTurtle,
    minDuration: 15000,
    maxDuration: 45000,
    supportedDifficulties: ['easy', 'medium'],
  },
  {
    id: 'thought-clouds',
    name: 'Thought Clouds',
    description: 'Tap floating thought clouds to pop them and let go of worries.',
    component: ThoughtClouds,
    minDuration: 20000,
    maxDuration: 60000,
    supportedDifficulties: ['easy', 'medium'],
  },
  {
    id: 'feather-float',
    name: 'Feather Float',
    description: 'Keep tapping to lift the feather up and away into the sky.',
    component: FeatherFloat,
    minDuration: 15000,
    maxDuration: 45000,
    supportedDifficulties: ['easy'],
  },
  {
    id: 'orbit-calm',
    name: 'Orbit Calm',
    description: 'Tap in rhythm as the planet orbits the sun.',
    component: OrbitCalm,
    minDuration: 20000,
    maxDuration: 60000,
    supportedDifficulties: ['easy', 'medium'],
  },
  {
    id: 'memory-match',
    name: 'Memory Match',
    description: 'Flip cards to find matching pairs of calming symbols.',
    component: MemoryMatch,
    minDuration: 30000,
    maxDuration: 90000,
    supportedDifficulties: ['easy', 'medium'],
  },
  {
    id: 'color-hunt',
    name: 'Color Hunt',
    description: 'Find and tap all the blue shapes among the colors.',
    component: ColorHunt,
    minDuration: 20000,
    maxDuration: 60000,
    supportedDifficulties: ['easy', 'medium'],
  },
  {
    id: 'clean-window',
    name: 'Clean Window',
    description: 'Drag finger to clear foggy glass.',
    component: CleanWindow,
    minDuration: 15000,
    maxDuration: 45000,
    supportedDifficulties: ['easy'],
  },
  {
    id: 'trace-shape',
    name: 'Trace the Shape',
    description: 'Trace the glowing shape outline slowly.',
    component: TraceShape,
    minDuration: 15000,
    maxDuration: 45000,
    supportedDifficulties: ['easy'],
  },
  {
    id: 'star-collector',
    name: 'Star Collector',
    description: 'Tap the stars before they fade away.',
    component: StarCollector,
    minDuration: 15000,
    maxDuration: 45000,
    supportedDifficulties: ['easy'],
  },
  {
    id: 'apple-picking',
    name: 'Apple Picking',
    description: 'Catch falling apples with your basket.',
    component: ApplePicking,
    minDuration: 15000,
    maxDuration: 45000,
    supportedDifficulties: ['easy'],
  },
  {
    id: 'object-recall',
    name: 'Object Recall',
    description: 'Memorize items and pick which ones you saw.',
    component: ObjectRecall,
    minDuration: 15000,
    maxDuration: 45000,
    supportedDifficulties: ['easy', 'medium'],
  },
  {
    id: 'emotion-match',
    name: 'Emotion Match',
    description: 'Match emotion faces to their words.',
    component: EmotionMatch,
    minDuration: 15000,
    maxDuration: 45000,
    supportedDifficulties: ['easy'],
  },
  {
    id: 'pattern-complete',
    name: 'Pattern Complete',
    description: 'Find the next number in the sequence.',
    component: PatternComplete,
    minDuration: 15000,
    maxDuration: 45000,
    supportedDifficulties: ['easy', 'medium'],
  },
  {
    id: 'glow-order',
    name: 'Glow Order',
    description: 'Watch the lights flash and repeat the sequence.',
    component: GlowOrder,
    minDuration: 20000,
    maxDuration: 60000,
    supportedDifficulties: ['easy', 'medium'],
  },
  {
    id: 'symbol-swap',
    name: 'Symbol Swap',
    description: 'Find which symbol changed.',
    component: SymbolSwap,
    minDuration: 15000,
    maxDuration: 45000,
    supportedDifficulties: ['easy', 'medium'],
  },
  {
    id: 'coloring-book',
    name: 'Coloring Book',
    description: 'Select colors and tap to fill in the picture.',
    component: ColoringBook,
    minDuration: 30000,
    maxDuration: 120000,
    supportedDifficulties: ['easy'],
  },
]

export function getGameById(id: string): GameMetadata | undefined {
  return gameRegistry.find(game => game.id === id)
}

export function getRandomGame(exclude?: string[]): GameMetadata {
  const available = exclude
    ? gameRegistry.filter(g => !exclude.includes(g.id))
    : gameRegistry

  if (available.length === 0) {
    return gameRegistry[Math.floor(Math.random() * gameRegistry.length)]
  }

  return available[Math.floor(Math.random() * available.length)]
}

export function getGamesByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): GameMetadata[] {
  return gameRegistry.filter(
    game => game.supportedDifficulties?.includes(difficulty)
  )
}
