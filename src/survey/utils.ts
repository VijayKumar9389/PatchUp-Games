import { gameRegistry } from '../games/registry'

// Utility to pick a random game avoiding recent ones
export function pickRandomGame(
  recentGameIds: string[],
  availableGameIds?: string[]
): string {
  const available = availableGameIds
    ? gameRegistry.filter(g => availableGameIds.includes(g.id))
    : gameRegistry

  const notRecent = available.filter(g => !recentGameIds.includes(g.id))

  const pool = notRecent.length > 0 ? notRecent : available

  return pool[Math.floor(Math.random() * pool.length)].id
}
