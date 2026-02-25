import React, { useRef, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { type RGBA } from "../Coloring/utils.ts";
import ColorPicker from '../components/ColorPicker.tsx';
import useDrawingCanvas from "./useDrawingCanvas.ts";
import { ActivityProps } from '../../../../types.ts';

const PROMPTS = ['a bee', 'a flower', 'a tree', 'a rocket', 'a rainbow', 'a dog', 'a castle', 'a spaceship'];

const BRUSH_SIZES = [
    { label: 'S', value: 3 },
    { label: 'M', value: 8 },
    { label: 'L', value: 18 },
];

const DRAWING_COLORS: { name: string; color: RGBA }[] = [
    { name: 'Crimson',   color: { r: 220, g: 38,  b: 38,  a: 255 } },
    { name: 'Tangerine', color: { r: 249, g: 115, b: 22,  a: 255 } },
    { name: 'Amber',     color: { r: 245, g: 158, b: 11,  a: 255 } },
    { name: 'Sunshine',  color: { r: 250, g: 204, b: 21,  a: 255 } },
    { name: 'Lime',      color: { r: 132, g: 204, b: 22,  a: 255 } },
    { name: 'Emerald',   color: { r: 22,  g: 163, b: 74,  a: 255 } },
    { name: 'Teal',      color: { r: 20,  g: 184, b: 166, a: 255 } },
    { name: 'Sky',       color: { r: 56,  g: 189, b: 248, a: 255 } },
    { name: 'Blue',      color: { r: 59,  g: 130, b: 246, a: 255 } },
    { name: 'Indigo',    color: { r: 99,  g: 102, b: 241, a: 255 } },
    { name: 'Violet',    color: { r: 168, g: 85,  b: 247, a: 255 } },
    { name: 'Rose',      color: { r: 236, g: 72,  b: 153, a: 255 } },
    { name: 'Brown',     color: { r: 120, g: 53,  b: 15,  a: 255 } },
    { name: 'Caramel',   color: { r: 194, g: 124, b: 65,  a: 255 } },
    { name: 'Slate',     color: { r: 100, g: 116, b: 139, a: 255 } },
    { name: 'Charcoal',  color: { r: 30,  g: 30,  b: 30,  a: 255 } },
];

// Custom eraser cursor: a classic rectangular eraser with a pink grip end.
// Hotspot is at the right edge (the erasing tip), centred vertically.
const ERASER_CURSOR = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='26' height='16'%3E%3Crect x='0.5' y='0.5' width='25' height='15' rx='2.5' fill='white' stroke='%23999' stroke-width='1'/%3E%3Crect x='0.5' y='0.5' width='8' height='15' fill='%23fca5a5' rx='2.5'/%3E%3Cline x1='8.5' y1='0.5' x2='8.5' y2='15.5' stroke='%23999' stroke-width='1'/%3E%3C/svg%3E") 25 8, auto`;

const Drawing: React.FC<ActivityProps> = ({ onSend }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedColor, setSelectedColor] = useState(DRAWING_COLORS[0].color);
    const [lineWidth, setLineWidth] = useState(8);
    const [isEraser, setIsEraser] = useState(false);
    const [prompt] = useState<string>(() => {
        const randomIndex = Math.floor(Math.random() * PROMPTS.length);
        return PROMPTS[randomIndex];
    });

    useDrawingCanvas(canvasRef, selectedColor, lineWidth, isEraser);

    const handleFinish = () => {
        onSend('Exercise completed!', false, 'drawing');
    };

    const handleClear = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const handleSelectColor = (color: RGBA) => {
        setSelectedColor(color);
        setIsEraser(false);
    };

    return (
        <Box
            id="drawing-activity-container"
            sx={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                p: 2,
                boxSizing: 'border-box',
                minHeight: 0,
                gap: 1.5,
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Typography variant="h5" fontWeight={600} color="text.primary">
                    Draw {prompt}
                </Typography>
                <Button
                    variant="contained"
                    size="small"
                    onClick={handleFinish}
                    sx={{ minWidth: 0, lineHeight: 1.5 }}
                >
                    Done
                </Button>
            </Box>

            {/* Canvas */}
            <Box sx={{ width: '100%', height: '260px', flexShrink: 0 }}>
                <canvas
                    ref={canvasRef}
                    style={{
                        width: '100%',
                        height: '100%',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        display: 'block',
                        backgroundColor: 'white',
                        cursor: isEraser ? ERASER_CURSOR : 'crosshair',
                    }}
                />
            </Box>

            {/* Toolbar: brush sizes + eraser + clear */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 0.5 }}>
                {/* Brush size buttons */}
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    {BRUSH_SIZES.map(({ label, value }) => {
                        const active = lineWidth === value && !isEraser;
                        return (
                            <Button
                                key={label}
                                onClick={() => { setLineWidth(value); setIsEraser(false); }}
                                size="small"
                                sx={{
                                    minWidth: 0,
                                    width: 32,
                                    height: 32,
                                    p: 0,
                                    borderRadius: '50%',
                                    border: active ? '2px solid' : '1px solid',
                                    borderColor: active ? 'primary.main' : 'divider',
                                    backgroundColor: active ? 'primary.light' : 'transparent',
                                    color: active ? 'primary.main' : 'text.secondary',
                                    fontSize: '0.7rem',
                                    fontWeight: 600,
                                    '&:hover': { backgroundColor: 'action.hover' },
                                }}
                            >
                                {label}
                            </Button>
                        );
                    })}
                </Box>

                {/* Eraser + Clear */}
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                        onClick={() => setIsEraser((e) => !e)}
                        size="small"
                        sx={{
                            minWidth: 0,
                            px: 1.5,
                            height: 32,
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            border: isEraser ? '2px solid' : '1px solid',
                            borderColor: isEraser ? 'primary.main' : 'divider',
                            backgroundColor: isEraser ? 'primary.light' : 'transparent',
                            color: isEraser ? 'primary.main' : 'text.secondary',
                            borderRadius: 2,
                            '&:hover': { backgroundColor: 'action.hover' },
                        }}
                    >
                        Eraser
                    </Button>
                    <Button
                        onClick={handleClear}
                        size="small"
                        sx={{
                            minWidth: 0,
                            px: 1.5,
                            height: 32,
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 2,
                            color: 'text.secondary',
                            '&:hover': { backgroundColor: 'action.hover' },
                        }}
                    >
                        Clear
                    </Button>
                </Box>
            </Box>

            {/* Color Picker */}
            <ColorPicker
                selectedColor={selectedColor}
                setSelectedColor={handleSelectColor}
                colors={DRAWING_COLORS}
            />
        </Box>
    );
};

export default Drawing;
