import { useEffect, useRef, useCallback } from 'react'
import type { AnimationCallback } from '../types'

type UseAnimationFrameOptions = {
  enabled?: boolean
  fps?: number // Optional frame rate limiting
}

export function useAnimationFrame(
  callback: AnimationCallback,
  options: UseAnimationFrameOptions = {}
): void {
  const { enabled = true, fps } = options
  const requestRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const previousTimeRef = useRef<number | null>(null)
  const callbackRef = useRef(callback)

  // Keep callback ref updated
  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  const frameInterval = fps ? 1000 / fps : null

  const animate = useCallback((currentTime: number) => {
    if (startTimeRef.current === null) {
      startTimeRef.current = currentTime
    }

    if (previousTimeRef.current === null) {
      previousTimeRef.current = currentTime
    }

    const deltaTime = currentTime - previousTimeRef.current
    const elapsedTime = currentTime - startTimeRef.current

    // Frame rate limiting
    if (frameInterval === null || deltaTime >= frameInterval) {
      callbackRef.current(deltaTime, elapsedTime)
      previousTimeRef.current = currentTime
    }

    requestRef.current = requestAnimationFrame(animate)
  }, [frameInterval])

  useEffect(() => {
    if (!enabled) {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current)
        requestRef.current = null
      }
      return
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      // Still call the callback once for initial state, but don't animate
      callbackRef.current(0, 0)
      return
    }

    requestRef.current = requestAnimationFrame(animate)

    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [enabled, animate])
}

// Utility hook for simple timed animations
export function useAnimationProgress(
  durationMs: number,
  options: { enabled?: boolean; loop?: boolean; onComplete?: () => void } = {}
): number {
  const { enabled = true, loop = false, onComplete } = options
  const progressRef = useRef(0)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useAnimationFrame(
    (_deltaTime, elapsedTime) => {
      let progress = Math.min(elapsedTime / durationMs, 1)

      if (loop && progress >= 1) {
        progress = progress % 1
      } else if (progress >= 1 && onCompleteRef.current) {
        onCompleteRef.current()
      }

      progressRef.current = progress
    },
    { enabled }
  )

  return progressRef.current
}
