import { type RefObject, useEffect, useRef } from 'react';
import type { RGBA } from '../Coloring/utils.ts';

/**
 * A custom hook that enables drawing on a canvas using mouse or touch input.
 * Supports dynamic resizing, brush size, and eraser mode.
 */
const useDrawingCanvas = (
    canvasRef: RefObject<HTMLCanvasElement | null>,
    color: RGBA,
    lineWidth: number = 5,
    isEraser: boolean = false
) => {
    const drawing = useRef(false);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

    /**
     * Resizes the canvas buffer to match its rendered CSS dimensions.
     * Preserves the existing drawing content after resize.
     */
    const resizeCanvas = (canvas: HTMLCanvasElement) => {
        const dpr = window.devicePixelRatio || 1;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        if (width === 0 || height === 0) return;

        // Save current drawing before clearing
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext('2d');
        tempCtx?.drawImage(canvas, 0, 0);

        // Set new buffer size (clears the canvas)
        canvas.width = width * dpr;
        canvas.height = height * dpr;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        // Restore the previous drawing
        if (tempCanvas.width > 0 && tempCanvas.height > 0) {
            ctx.drawImage(tempCanvas, 0, 0, width, height);
        }

        ctxRef.current = ctx;
    };

    /**
     * Initialises the canvas and observes it for size changes.
     */
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        resizeCanvas(canvas);

        const observer = new ResizeObserver(() => resizeCanvas(canvas));
        observer.observe(canvas);

        return () => observer.disconnect();
    }, [canvasRef]);

    /**
     * Attaches mouse and touch drawing event listeners.
     * Re-runs whenever color, lineWidth, or isEraser changes.
     */
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = ctxRef.current;
        if (!canvas || !ctx) return;

        const getPointerPos = (e: MouseEvent | TouchEvent) => {
            const rect = canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;

            const clientX = 'touches' in e ? e.touches[0]?.clientX : (e as MouseEvent).clientX;
            const clientY = 'touches' in e ? e.touches[0]?.clientY : (e as MouseEvent).clientY;

            return {
                x: (clientX - rect.left) * (canvas.width / rect.width) / dpr,
                y: (clientY - rect.top) * (canvas.height / rect.height) / dpr,
            };
        };

        const handleStart = (e: MouseEvent | TouchEvent) => {
            if (!ctxRef.current) return;

            if (isEraser) {
                ctxRef.current.globalCompositeOperation = 'destination-out';
                ctxRef.current.strokeStyle = 'rgba(0, 0, 0, 1)';
            } else {
                ctxRef.current.globalCompositeOperation = 'source-over';
                ctxRef.current.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
            }

            ctxRef.current.lineWidth = lineWidth;
            drawing.current = true;

            const { x, y } = getPointerPos(e);
            ctxRef.current.beginPath();
            ctxRef.current.moveTo(x, y);
        };

        const handleMove = (e: MouseEvent | TouchEvent) => {
            if (!drawing.current || !ctxRef.current) return;
            e.preventDefault();

            const { x, y } = getPointerPos(e);
            ctxRef.current.lineTo(x, y);
            ctxRef.current.stroke();
        };

        const handleEnd = () => {
            drawing.current = false;
            if (ctxRef.current) {
                ctxRef.current.globalCompositeOperation = 'source-over';
            }
        };

        canvas.addEventListener('mousedown', handleStart);
        canvas.addEventListener('mousemove', handleMove);
        window.addEventListener('mouseup', handleEnd);

        canvas.addEventListener('touchstart', handleStart, { passive: false });
        canvas.addEventListener('touchmove', handleMove, { passive: false });
        window.addEventListener('touchend', handleEnd);

        return () => {
            canvas.removeEventListener('mousedown', handleStart);
            canvas.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleEnd);

            canvas.removeEventListener('touchstart', handleStart);
            canvas.removeEventListener('touchmove', handleMove);
            window.removeEventListener('touchend', handleEnd);
        };
    }, [canvasRef, color, lineWidth, isEraser]);
};

export default useDrawingCanvas;
