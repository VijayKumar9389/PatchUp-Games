import { useRef, useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import Plane from './images/Plane.gif';
import Mandala from './images/Mandala.png';
import { COLORS } from './utils.ts';
import { fadeVariant } from '../../../../utils/helpers';
import useImageLoader from './hooks/useImageLoader.ts';
import useCanvasColoring from "./hooks/useColoringCanvas.ts";
import ColorPicker from '../components/ColorPicker.tsx';
import { ActivityProps } from '../../../../types';
import { link } from 'framer-motion/client';
// Add more images here if you have more


const Coloring: React.FC<ActivityProps> = ({ onSend }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [selectedColor, setSelectedColor] = useState(COLORS[0].color);

    // Pick a random image on mount


    useImageLoader(canvasRef, Mandala);
    useCanvasColoring(canvasRef, selectedColor);


    const handleFinish = () => {
        onSend('Exercise completed!', false, 'coloring');
    };
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const image = new Image();
        image.src = Mandala;
        image.onload = () => {
            const dpr = window.devicePixelRatio || 1;

            // Get canvas display size
            const rect = canvas.getBoundingClientRect();

            // Set actual canvas size in device pixels
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;

            // Scale context to match display size
            ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform first
            ctx.scale(dpr, dpr);

            // Disable image smoothing
            ctx.imageSmoothingEnabled = false;

            // Clear and draw the image
            ctx.clearRect(0, 0, rect.width, rect.height);
            ctx.drawImage(image, 0, 0, rect.width, rect.height);
        };
    }, [Mandala]);

    return (
        <Box
            sx={{
                height: '100%',
                width: '100%',
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                boxSizing: 'border-box',
                minHeight: 0, // ensures padding is inside the height
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Typography variant="h5" fontWeight={600} color="text.primary">
                    Start Coloring
                </Typography>
                <Button
                    variant="contained"
                    size="small"
                    onClick={handleFinish}
                    sx={{
                        minWidth: 0,
                        lineHeight: 1.5,
                    }}
                >
                    Done
                </Button>
            </Box>

            {/* Canvas */}
            <Box
                sx={{
                    aspectRatio: '1 / 1',
                    width: '100%',
                    maxWidth: '80%',       // never overflow horizontally
                    height: 'auto',         // let height adjust to width
                    boxSizing: 'border-box',
                    alignSelf: 'center',
                }}
            >
                <canvas
                    ref={canvasRef}
                    // width={1043}
                    // height={1067}
                    style={{
                        width: '100%',
                        height: '100%',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        display: 'block',
                        margin: '0 auto', // centers the canvas
                    }}
                />
            </Box>

            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <ColorPicker selectedColor={selectedColor} setSelectedColor={setSelectedColor} />
            </Box>
        </Box>

    );
};

export default Coloring;