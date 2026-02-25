import React, { useRef, useEffect, useState } from 'react'
import { useTheme, useMediaQuery } from '@mui/material';

interface ScratchCardProps {
    onSend: (message: string, isError?: boolean, activityType?: string) => void;
    setFinished?: React.Dispatch<React.SetStateAction<boolean>>;
}


const ScratchCard: React.FC<ScratchCardProps> = ({ onSend, setFinished }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const [revealedStars, setRevealedStars] = useState<Set<number>>(new Set())
    const [revealed, setRevealed] = useState(false)
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.only('xs'));
    const isSm = useMediaQuery(theme.breakpoints.only('sm'));
    const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
    if (isXs) {
        var width = 250
        var height = 250
        var revealRadius = 15
    } else if (isSm) {
        var width = 400
        var height = 400
        var revealRadius = 20
    } else if (isMdUp) {
        var width = 500
        var height = 500
        var revealRadius = 25
    }
    const padding = 30
    const [starPositions] = useState(() =>
        Array.from({ length: 5 }, () => ({
            x: Math.floor(Math.random() * (width - 2 * padding)) + padding,
            y: Math.floor(Math.random() * (height - 2 * padding)) + padding,
        }))
    )

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        canvas.width = width
        canvas.height = height

        ctx.fillStyle = '#888'
        ctx.fillRect(0, 0, width, height)

        ctx.globalCompositeOperation = 'destination-out'
    }, [])

    const getLocalCoords = (
        e: React.MouseEvent | React.TouchEvent
    ): { x: number; y: number } => {
        const canvas = canvasRef.current
        if (!canvas) return { x: 0, y: 0 }

        const rect = canvas.getBoundingClientRect()
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

        return {
            x: ((clientX - rect.left) / rect.width) * canvas.width,
            y: ((clientY - rect.top) / rect.height) * canvas.height,
        }
    }

    const scratch = (x: number, y: number) => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        ctx.beginPath()
        ctx.arc(x, y, 20, 0, 2 * Math.PI)
        ctx.fill()
    }

    const checkStarHit = (x: number, y: number) => {
        const newRevealed = new Set(revealedStars)

        starPositions.forEach((star, index) => {
            if (newRevealed.has(index)) return

            const dx = x - star.x
            const dy = y - star.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < revealRadius) {
                newRevealed.add(index)
            }
        })

        if (newRevealed.size !== revealedStars.size) {
            setRevealedStars(newRevealed)
            if (newRevealed.size === starPositions.length && !revealed) {
                setRevealed(true)
                setFinished?.(true)
                setTimeout(() => {
                    onSend('Exercise Completed!', false, 'scratch_game')
                }, 5000)
            }
        }
    }

    const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault()
        const { x, y } = getLocalCoords(e)
        scratch(x, y)
        checkStarHit(x, y)
    }



    return (
        <div
            style={{
                position: 'relative',
                width,
                height,
                boxSizing: "border-box", // <--- optional, helps avoid weirdness
                overflow: "hidden",      // <--- optional, prevents bleed outside
            }}
        >

            <div
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#fff',
                    zIndex: 0,
                }}
            >
                {starPositions.map((star, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            left: star.x,
                            top: star.y,
                            transform: 'translate(-50%, -50%)',
                            fontSize: 32,
                            userSelect: 'none',
                            opacity: revealedStars.has(index) ? 1 : 0.2,
                            transition: 'opacity 0.3s ease',
                        }}
                    >
                        ⭐
                    </div>
                ))}
            </div>

            {/* Scratch layer */}
            <canvas
                ref={canvasRef}
                width={width}
                height={height}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    touchAction: 'none',
                    zIndex: 1,
                }}
                onMouseDown={handleMove}
                onMouseMove={(e) => e.buttons === 1 && handleMove(e)}
                onTouchStart={handleMove}
                onTouchMove={handleMove}
            />
        </div>
    )
}

export default ScratchCard
