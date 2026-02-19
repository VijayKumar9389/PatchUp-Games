import { useState, useCallback, useRef, useEffect } from 'react'
import type { RefObject } from 'react'
import type { PointerState } from '../types'

type UsePointerOptions = {
  onPointerDown?: (state: PointerState) => void
  onPointerUp?: (state: PointerState) => void
  onPointerMove?: (state: PointerState) => void
  onPointerEnter?: (state: PointerState) => void
  onPointerLeave?: (state: PointerState) => void
}

type UsePointerReturn = {
  state: PointerState
  handlers: {
    onPointerDown: (e: React.PointerEvent) => void
    onPointerUp: (e: React.PointerEvent) => void
    onPointerMove: (e: React.PointerEvent) => void
    onPointerEnter: (e: React.PointerEvent) => void
    onPointerLeave: (e: React.PointerEvent) => void
    onPointerCancel: (e: React.PointerEvent) => void
  }
  ref: RefObject<HTMLElement | null>
}

const initialState: PointerState = {
  isDown: false,
  x: 0,
  y: 0,
  pressure: 0,
}

export function usePointer(options: UsePointerOptions = {}): UsePointerReturn {
  const [state, setState] = useState<PointerState>(initialState)
  const ref = useRef<HTMLElement | null>(null)
  const optionsRef = useRef(options)

  // Keep options ref updated
  useEffect(() => {
    optionsRef.current = options
  }, [options])

  const getRelativePosition = useCallback((e: React.PointerEvent) => {
    const element = ref.current
    if (!element) {
      return { x: e.clientX, y: e.clientY }
    }
    const rect = element.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }, [])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    const pos = getRelativePosition(e)
    const newState: PointerState = {
      isDown: true,
      x: pos.x,
      y: pos.y,
      pressure: e.pressure || 1,
    }
    setState(newState)
    optionsRef.current.onPointerDown?.(newState)
  }, [getRelativePosition])

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    const pos = getRelativePosition(e)
    const newState: PointerState = {
      isDown: false,
      x: pos.x,
      y: pos.y,
      pressure: 0,
    }
    setState(newState)
    optionsRef.current.onPointerUp?.(newState)
  }, [getRelativePosition])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const pos = getRelativePosition(e)
    const newState: PointerState = {
      isDown: state.isDown,
      x: pos.x,
      y: pos.y,
      pressure: e.pressure || (state.isDown ? 1 : 0),
    }
    setState(newState)
    optionsRef.current.onPointerMove?.(newState)
  }, [getRelativePosition, state.isDown])

  const handlePointerEnter = useCallback((e: React.PointerEvent) => {
    const pos = getRelativePosition(e)
    const newState: PointerState = {
      isDown: state.isDown,
      x: pos.x,
      y: pos.y,
      pressure: e.pressure || 0,
    }
    optionsRef.current.onPointerEnter?.(newState)
  }, [getRelativePosition, state.isDown])

  const handlePointerLeave = useCallback((e: React.PointerEvent) => {
    const pos = getRelativePosition(e)
    const newState: PointerState = {
      isDown: false,
      x: pos.x,
      y: pos.y,
      pressure: 0,
    }
    setState(newState)
    optionsRef.current.onPointerLeave?.(newState)
  }, [getRelativePosition])

  const handlePointerCancel = useCallback((_e: React.PointerEvent) => {
    setState(prev => ({ ...prev, isDown: false, pressure: 0 }))
  }, [])

  return {
    state,
    handlers: {
      onPointerDown: handlePointerDown,
      onPointerUp: handlePointerUp,
      onPointerMove: handlePointerMove,
      onPointerEnter: handlePointerEnter,
      onPointerLeave: handlePointerLeave,
      onPointerCancel: handlePointerCancel,
    },
    ref,
  }
}
