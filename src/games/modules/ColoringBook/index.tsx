import { useState, useCallback, useEffect, memo, useRef } from 'react'
import { Box, Typography } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { GameContainer } from '../../core/GameContainer'
import { useSound } from '../../core/hooks'
import { mindfulColors } from '../../core/theme'
import type { GameProps } from '../../core/types'
import type { Region } from './types'
import { getRandomTemplate } from './templates'

const COLORS = [
  mindfulColors.pastel.pink,
  mindfulColors.pastel.mint,
  mindfulColors.pastel.peach,
  mindfulColors.pastel.lavender,
  mindfulColors.pastel.lemon,
  mindfulColors.pastel.coral,
  mindfulColors.pastel.sage,
  mindfulColors.pastel.periwinkle,
]

export const ColoringBook = memo(function ColoringBook({
  onComplete,
}: GameProps) {
  const [template] = useState(() => getRandomTemplate())
  const [regions, setRegions] = useState<Region[]>(template.regions)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const { playTone, playChime } = useSound()
  const filledCountRef = useRef(0)

  const filledCount = regions.filter(r => r.currentColor !== '#FFFFFF').length
  filledCountRef.current = filledCount

  const handleColorSelect = useCallback((color: string) => {
    setSelectedColor(color)
    playTone({ frequency: 300, duration: 50, volume: 0.1 })
  }, [playTone])

  const handleRegionClick = useCallback((regionId: string) => {
    if (!selectedColor || isComplete) return

    setRegions(prev => prev.map(r =>
      r.id === regionId ? { ...r, currentColor: selectedColor } : r
    ))

    // Play a tone that rises with progress
    playTone({ frequency: 400 + filledCountRef.current * 30, duration: 100, volume: 0.15 })
  }, [selectedColor, isComplete, playTone])

  const handleRegionKeyDown = useCallback((e: React.KeyboardEvent, regionId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleRegionClick(regionId)
    }
  }, [handleRegionClick])

  // Check completion
  useEffect(() => {
    const allFilled = regions.every(r => r.currentColor !== '#FFFFFF')
    if (allFilled && !isComplete && filledCount > 0) {
      setIsComplete(true)
      playChime()
      const timeout = setTimeout(() => {
        onComplete?.()
      }, 1500)
      return () => clearTimeout(timeout)
    }
  }, [regions, isComplete, filledCount, onComplete, playChime])

  const instruction = isComplete
    ? 'Beautiful!'
    : selectedColor
    ? `Tap a region to color it (${filledCount}/${regions.length})`
    : 'Select a color, then tap a region'

  return (
    <GameContainer
      title="Coloring Book"
      instruction={instruction}
      ariaLabel="Select colors and tap regions to fill in the picture"
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 1.5, sm: 2 },
        }}
      >
        {/* Color palette */}
        <Box
          role="group"
          aria-label="Color palette"
          sx={{
            display: 'flex',
            gap: { xs: 0.5, sm: 1 },
            flexWrap: 'wrap',
            justifyContent: 'center',
            p: 1,
            borderRadius: 2,
            background: alpha(mindfulColors.background.paper, 0.8),
          }}
        >
          {COLORS.map(color => (
            <Box
              key={color}
              role="button"
              tabIndex={0}
              aria-label={`Select ${color} color`}
              aria-pressed={selectedColor === color}
              onClick={() => handleColorSelect(color)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleColorSelect(color)
                }
              }}
              sx={{
                width: { xs: 32, sm: 40 },
                height: { xs: 32, sm: 40 },
                backgroundColor: color,
                borderRadius: '50%',
                cursor: 'pointer',
                border: selectedColor === color
                  ? `3px solid ${mindfulColors.text.primary}`
                  : '2px solid transparent',
                boxShadow: selectedColor === color
                  ? `0 0 0 2px ${alpha(color, 0.5)}, 0 2px 8px ${alpha('#000', 0.2)}`
                  : `0 2px 4px ${alpha('#000', 0.1)}`,
                transition: 'all 0.2s ease',
                transform: selectedColor === color ? 'scale(1.1)' : 'scale(1)',
                '&:hover': {
                  transform: 'scale(1.15)',
                  boxShadow: `0 4px 8px ${alpha('#000', 0.15)}`,
                },
                '&:focus': {
                  outline: `3px solid ${mindfulColors.primary.main}`,
                  outlineOffset: 2,
                },
                '&:focus:not(:focus-visible)': {
                  outline: 'none',
                },
                '&:focus-visible': {
                  outline: `3px solid ${mindfulColors.primary.main}`,
                  outlineOffset: 2,
                },
              }}
            />
          ))}
        </Box>

        {/* SVG template */}
        <Box
          sx={{
            width: '100%',
            maxWidth: { xs: 280, sm: 350 },
            aspectRatio: template.viewBox.split(' ').slice(2).join('/'),
            borderRadius: 3,
            overflow: 'hidden',
            background: alpha('#fff', 0.95),
            boxShadow: `0 4px 16px ${alpha('#000', 0.1)}`,
            p: { xs: 1, sm: 2 },
          }}
        >
          <svg
            viewBox={template.viewBox}
            width="100%"
            height="100%"
            style={{ display: 'block' }}
            aria-label={`${template.name} coloring template`}
          >
            {regions.map(region => (
              <path
                key={region.id}
                d={region.path}
                fill={region.currentColor}
                stroke={mindfulColors.text.primary}
                strokeWidth="1.5"
                strokeLinejoin="round"
                onClick={() => handleRegionClick(region.id)}
                onKeyDown={(e) => handleRegionKeyDown(e as unknown as React.KeyboardEvent, region.id)}
                role="button"
                tabIndex={isComplete ? -1 : 0}
                aria-label={`${region.id.replace(/-/g, ' ')} region${region.currentColor !== '#FFFFFF' ? ', colored' : ''}`}
                style={{
                  cursor: isComplete ? 'default' : 'pointer',
                  transition: 'fill 0.2s ease',
                  outline: 'none',
                }}
              />
            ))}
          </svg>
        </Box>

        {/* Progress indicator */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 0.5,
          }}
        >
          {regions.map((region) => (
            <Box
              key={region.id}
              sx={{
                width: { xs: 8, sm: 10 },
                height: { xs: 8, sm: 10 },
                borderRadius: '50%',
                backgroundColor: region.currentColor !== '#FFFFFF'
                  ? region.currentColor
                  : alpha(mindfulColors.text.secondary, 0.2),
                border: `1px solid ${alpha(mindfulColors.text.secondary, 0.3)}`,
                transition: 'background-color 0.3s ease, transform 0.3s ease',
                transform: region.currentColor !== '#FFFFFF' ? 'scale(1.1)' : 'scale(1)',
              }}
              aria-hidden="true"
            />
          ))}
        </Box>

        {/* Completion message */}
        {isComplete && (
          <Typography
            sx={{
              color: mindfulColors.primary.dark,
              fontWeight: 600,
              fontSize: { xs: '1rem', sm: '1.2rem' },
              animation: 'pulse 2s ease-in-out infinite',
              '@keyframes pulse': {
                '0%, 100%': { transform: 'scale(1)', opacity: 1 },
                '50%': { transform: 'scale(1.05)', opacity: 0.9 },
              },
            }}
          >
            Great job!
          </Typography>
        )}
      </Box>
    </GameContainer>
  )
})

export default ColoringBook
