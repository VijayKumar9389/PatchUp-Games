import { useState, useCallback, useRef, useEffect } from 'react'

type UseHoldOptions = {
  minHoldTime?: number // Minimum time to register as a hold (ms)
  onHoldStart?: () => void
  onHoldEnd?: (duration: number) => void
  onHoldProgress?: (progress: number, duration: number) => void
  targetDuration?: number // Duration for progress calculation
}

type UseHoldReturn = {
  isHolding: boolean
  holdDuration: number
  holdProgress: number // 0-1 based on targetDuration
  handlers: {
    onPointerDown: (e: React.PointerEvent) => void
    onPointerUp: (e: React.PointerEvent) => void
    onPointerLeave: (e: React.PointerEvent) => void
    onPointerCancel: (e: React.PointerEvent) => void
  }
}

export function useHold(options: UseHoldOptions = {}): UseHoldReturn {
  const {
    minHoldTime = 0,
    onHoldStart,
    onHoldEnd,
    onHoldProgress,
    targetDuration = 3000,
  } = options

  const [isHolding, setIsHolding] = useState(false)
  const [holdDuration, setHoldDuration] = useState(0)
  const [holdProgress, setHoldProgress] = useState(0)

  const startTimeRef = useRef<number | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const hasTriggeredStartRef = useRef(false)
  const optionsRef = useRef(options)

  useEffect(() => {
    optionsRef.current = options
  }, [options])

  const updateHoldState = useCallback(() => {
    if (startTimeRef.current === null) return

    const now = performance.now()
    const duration = now - startTimeRef.current
    setHoldDuration(duration)

    const progress = Math.min(duration / targetDuration, 1)
    setHoldProgress(progress)

    // Trigger onHoldStart after minHoldTime
    if (duration >= minHoldTime && !hasTriggeredStartRef.current) {
      hasTriggeredStartRef.current = true
      onHoldStart?.()
    }

    onHoldProgress?.(progress, duration)

    animationFrameRef.current = requestAnimationFrame(updateHoldState)
  }, [minHoldTime, targetDuration, onHoldStart, onHoldProgress])

  const startHold = useCallback(() => {
    startTimeRef.current = performance.now()
    hasTriggeredStartRef.current = false
    setIsHolding(true)
    setHoldDuration(0)
    setHoldProgress(0)
    animationFrameRef.current = requestAnimationFrame(updateHoldState)
  }, [updateHoldState])

  const endHold = useCallback(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }

    if (startTimeRef.current !== null) {
      const duration = performance.now() - startTimeRef.current
      if (duration >= minHoldTime) {
        onHoldEnd?.(duration)
      }
    }

    startTimeRef.current = null
    setIsHolding(false)
    setHoldDuration(0)
    setHoldProgress(0)
  }, [minHoldTime, onHoldEnd])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault()
    startHold()
  }, [startHold])

  const handlePointerUp = useCallback((_e: React.PointerEvent) => {
    endHold()
  }, [endHold])

  const handlePointerLeave = useCallback((_e: React.PointerEvent) => {
    endHold()
  }, [endHold])

  const handlePointerCancel = useCallback((_e: React.PointerEvent) => {
    endHold()
  }, [endHold])

  return {
    isHolding,
    holdDuration,
    holdProgress,
    handlers: {
      onPointerDown: handlePointerDown,
      onPointerUp: handlePointerUp,
      onPointerLeave: handlePointerLeave,
      onPointerCancel: handlePointerCancel,
    },
  }
}
