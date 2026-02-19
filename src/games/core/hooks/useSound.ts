import { useCallback, useRef, useEffect, useState } from 'react'

type ToneType = 'sine' | 'square' | 'triangle' | 'sawtooth'

type UseSoundOptions = {
  enabled?: boolean
  volume?: number // 0-1
  defaultToneType?: ToneType
}

type PlayToneOptions = {
  frequency?: number
  duration?: number // ms
  type?: ToneType
  fadeIn?: number // ms
  fadeOut?: number // ms
  volume?: number
}

type UseSoundReturn = {
  playTone: (options?: PlayToneOptions) => void
  playChime: () => void
  playSuccess: () => void
  playGentle: () => void
  stopAll: () => void
  isSupported: boolean
  setEnabled: (enabled: boolean) => void
}

// Gentle frequencies for calming tones
const FREQUENCIES = {
  gentle: 440, // A4
  low: 261.63, // C4
  mid: 329.63, // E4
  high: 523.25, // C5
  chime: [523.25, 659.25, 783.99], // C5, E5, G5 (major chord)
}

export function useSound(options: UseSoundOptions = {}): UseSoundReturn {
  const { enabled: initialEnabled = true, volume = 0.3, defaultToneType = 'sine' } = options

  const [enabled, setEnabled] = useState(initialEnabled)
  const audioContextRef = useRef<AudioContext | null>(null)
  const activeNodesRef = useRef<Set<OscillatorNode>>(new Set())

  // Check Web Audio API support
  const isSupported = typeof window !== 'undefined' && 'AudioContext' in window

  // Initialize audio context lazily (must be triggered by user interaction)
  const getAudioContext = useCallback(() => {
    if (!isSupported) return null

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext()
    }

    // Resume if suspended (browsers suspend until user interaction)
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume()
    }

    return audioContextRef.current
  }, [isSupported])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      activeNodesRef.current.forEach(node => {
        try {
          node.stop()
        } catch {
          // Ignore errors from already stopped nodes
        }
      })
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  const playTone = useCallback((toneOptions: PlayToneOptions = {}) => {
    if (!enabled || !isSupported) return

    const ctx = getAudioContext()
    if (!ctx) return

    const {
      frequency = FREQUENCIES.gentle,
      duration = 200,
      type = defaultToneType,
      fadeIn = 20,
      fadeOut = 50,
      volume: toneVolume = volume,
    } = toneOptions

    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.type = type
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime)

    // Envelope for smooth sound
    gainNode.gain.setValueAtTime(0, ctx.currentTime)
    gainNode.gain.linearRampToValueAtTime(toneVolume, ctx.currentTime + fadeIn / 1000)
    gainNode.gain.setValueAtTime(toneVolume, ctx.currentTime + (duration - fadeOut) / 1000)
    gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + duration / 1000)

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    activeNodesRef.current.add(oscillator)
    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + duration / 1000)

    oscillator.onended = () => {
      activeNodesRef.current.delete(oscillator)
      oscillator.disconnect()
      gainNode.disconnect()
    }
  }, [enabled, isSupported, getAudioContext, defaultToneType, volume])

  const playChime = useCallback(() => {
    if (!enabled || !isSupported) return

    // Play a gentle chord
    FREQUENCIES.chime.forEach((freq, index) => {
      setTimeout(() => {
        playTone({
          frequency: freq,
          duration: 400,
          fadeIn: 30,
          fadeOut: 150,
          volume: volume * 0.8,
        })
      }, index * 100)
    })
  }, [enabled, isSupported, playTone, volume])

  const playSuccess = useCallback(() => {
    if (!enabled || !isSupported) return

    // Rising two-tone success sound
    playTone({ frequency: FREQUENCIES.mid, duration: 150 })
    setTimeout(() => {
      playTone({ frequency: FREQUENCIES.high, duration: 200, fadeOut: 100 })
    }, 120)
  }, [enabled, isSupported, playTone])

  const playGentle = useCallback(() => {
    if (!enabled || !isSupported) return

    playTone({
      frequency: FREQUENCIES.low,
      duration: 300,
      type: 'triangle',
      fadeIn: 50,
      fadeOut: 150,
      volume: volume * 0.5,
    })
  }, [enabled, isSupported, playTone, volume])

  const stopAll = useCallback(() => {
    activeNodesRef.current.forEach(node => {
      try {
        node.stop()
      } catch {
        // Ignore errors from already stopped nodes
      }
    })
    activeNodesRef.current.clear()
  }, [])

  return {
    playTone,
    playChime,
    playSuccess,
    playGentle,
    stopAll,
    isSupported,
    setEnabled,
  }
}
