import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Typography } from "@mui/material";

interface BreathingSquareProps {
    onSend: (text: string, userSelected: boolean, activity: string) => void;
}

// ── Timing ──────────────────────────────────────────────────────────────────
const PHASE_MS = 4000;
const PHASE_S = 4;
const TOTAL_CYCLES = 2;
const TOTAL_PHASES = 4 * TOTAL_CYCLES; // 8 breathing phases

// ── Phase metadata ───────────────────────────────────────────────────────────
const PHASES = [
    { label: "Breathe In", hint: "Inhale slowly…", color: "#60A5FA", strokeW: 2.5 },
    { label: "Hold", hint: "Hold it…", color: "#A78BFA", strokeW: 2.5 },
    { label: "Breathe Out", hint: "Exhale gently…", color: "#34D399", strokeW: 2.5 },
    { label: "Hold", hint: "Stay still…", color: "#A78BFA", strokeW: 2.5 },
] as const;

// ── SVG geometry ─────────────────────────────────────────────────────────────
const W = 300, H = 300;
const CX = W / 2, CY = H / 2;
const SIDE = 230;
const HS = SIDE / 2;   // half-side → corner coords are CX±HS, CY±HS
const RX = 14;         // corner radius (visual only; dot follows straight edges)

/** Returns dot {x,y} for t ∈ [0, TOTAL_PHASES). Each integer step = one phase. */
function dotAt(t: number): { x: number; y: number } {
    const seg = Math.floor(t) % 4;
    const p = t % 1;
    switch (seg) {
        case 0: return { x: CX - HS + SIDE * p, y: CY - HS };          // top:    L → R
        case 1: return { x: CX + HS, y: CY - HS + SIDE * p }; // right:  T → B
        case 2: return { x: CX + HS - SIDE * p, y: CY + HS };          // bottom: R → L
        case 3: return { x: CX - HS, y: CY + HS - SIDE * p }; // left:   B → T
        default: return { x: CX - HS, y: CY - HS };
    }
}

// ── Component ────────────────────────────────────────────────────────────────
const BreathingSquare: React.FC<BreathingSquareProps> = ({ onSend }) => {
    const [stepIdx, setStepIdx] = useState(0);
    const [countdown, setCountdown] = useState(PHASE_S);
    const [dot, setDot] = useState(() => dotAt(0));
    const rafRef = useRef<number | null>(null);
    const doneRef = useRef(false);

    // Single RAF loop drives all state so nothing is stale/laggy
    useEffect(() => {
        const t0 = performance.now();
        doneRef.current = false;

        const frame = (now: number) => {
            if (doneRef.current) return;

            const total = (now - t0) / PHASE_MS;   // phase-units elapsed

            if (total >= TOTAL_PHASES) {
                doneRef.current = true;
                setStepIdx(TOTAL_PHASES - 1);
                setCountdown(1);
                setTimeout(() => onSend("Exercise Completed!", false, "breathing_square"), 900);
                return;
            }

            const step = Math.floor(total);
            const frac = total % 1;
            const secs = Math.max(Math.ceil(PHASE_S - frac * PHASE_S), 1);

            setStepIdx(step);
            setCountdown(secs);
            setDot(dotAt(total));

            rafRef.current = requestAnimationFrame(frame);
        };

        rafRef.current = requestAnimationFrame(frame);
        return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const phase = PHASES[stepIdx % 4];
    const cycle = Math.floor(stepIdx / 4) + 1;
    const color = phase?.color;
    const curPhase = stepIdx % 4;
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            //  gap: 1.5, 
            py: 1
        }}>

            {/* ── Phase label ─────────────────────────────────────────────── */}
            <Box sx={{ minHeight: 62, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={stepIdx}
                        initial={{ opacity: 0, y: 7 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -7 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        style={{ textAlign: "center" }}
                    >
                        <Typography sx={{
                            fontSize: { xs: "1.4rem", sm: "1.7rem" },
                            fontWeight: 500,
                            // letterSpacing: "0.18em",
                            // textTransform: "uppercase",
                            color,
                            lineHeight: 1.2,
                        }}>
                            {phase?.label}
                        </Typography>
                        <Typography sx={{
                            fontSize: "0.8rem",
                            color: color,
                            mt: 0.4,
                            // letterSpacing: "0.07em"
                        }}
                        >
                            {phase?.hint}
                        </Typography>
                    </motion.div>
                </AnimatePresence>
            </Box>

            {/* ── SVG canvas ──────────────────────────────────────────────── */}
            <Box sx={{ width: "100%", maxWidth: W, aspectRatio: "1/1", mx: "auto" }}>
                <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: "visible", display: "block" }}>
                    <defs>
                        {/* Square glow */}
                        <filter id="bsq-sq-glow" x="-25%" y="-25%" width="150%" height="150%">
                            <feGaussianBlur stdDeviation="5" result="b" />
                            <feMerge>
                                <feMergeNode in="b" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        {/* Dot glow */}
                        <filter id="bsq-dot-glow" x="-120%" y="-120%" width="340%" height="340%">
                            <feGaussianBlur stdDeviation="8" result="b" />
                            <feMerge>
                                <feMergeNode in="b" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        {/* Soft fill inside the square */}
                        <radialGradient id="bsq-fill" cx="50%" cy="50%" r="60%">
                            <stop offset="0%" stopColor={color} stopOpacity={0.07} />
                            <stop offset="100%" stopColor={color} stopOpacity={0.01} />
                        </radialGradient>
                    </defs>

                    {/* ── Ghost / track square ──────────────────────────── */}
                    <rect
                        x={CX - HS} y={CY - HS} width={SIDE} height={SIDE}
                        rx={RX}
                        fill="none"
                        stroke="rgba(255,255,255,0.07)"
                        strokeWidth={1.5}
                    />

                    {/* ── Coloured glowing square ───────────────────────── */}
                    <motion.rect
                        x={CX - HS} y={CY - HS} width={SIDE} height={SIDE}
                        rx={RX}
                        fill="url(#bsq-fill)"
                        stroke={color}
                        strokeWidth={2}
                        strokeOpacity={0.95}
                        filter="url(#bsq-sq-glow)"
                        animate={{ stroke: color }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                    />

                    {/* ── Corner side-labels ────────────────────────────── */}
                    {/* Top – Breathe In */}

                    <text x={CX} y={CY - HS - 16} textAnchor="middle" fill={color}
                        fontSize={9} fontFamily="sans-serif" letterSpacing={1.5}
                        opacity={curPhase === 0 ? 1 : 0}
                    >
                        BREATHE IN
                    </text>

                    {/* Right – Hold */}
                    <text x={CX + HS + 22} y={CY} textAnchor="middle" fill={color}
                        fontSize={9} fontFamily="sans-serif" letterSpacing={1.5}
                        transform={`rotate(90,${CX + HS + 22},${CY})`}
                        opacity={curPhase === 1 ? 1 : 0}>
                        HOLD
                    </text>
                    {/* Bottom – Breathe Out */}
                    <text x={CX} y={CY + HS + 26} textAnchor="middle" fill={color}
                        fontSize={9} fontFamily="sans-serif" letterSpacing={1.5}
                        opacity={curPhase === 2 ? 1 : 0}>
                        BREATHE OUT
                    </text>
                    {/* Left – Hold */}
                    <text x={CX - HS - 22} y={CY} textAnchor="middle" fill={color}
                        fontSize={9} fontFamily="sans-serif" letterSpacing={1.5}
                        transform={`rotate(-90,${CX - HS - 22},${CY})`}
                        opacity={curPhase === 3 ? 1 : 0}>
                        HOLD
                    </text>

                    {/* ── Countdown ─────────────────────────────────────── */}
                    <text x={CX} y={CY + 4} textAnchor="middle" dominantBaseline="middle"
                        fill={color} fontSize={54} fontFamily="sans-serif" fontWeight={200}>
                        {countdown}
                    </text>
                    <text x={CX} y={CY + 38} textAnchor="middle" dominantBaseline="middle"
                        fill="rgba(255,255,255,0.2)" fontSize={10} fontFamily="sans-serif" letterSpacing={2.5}>
                        ROUND {cycle}
                    </text>

                    {/* ── Dot ───────────────────────────────────────────── */}
                    {/* outer halo */}
                    <circle cx={dot.x} cy={dot.y} r={15} fill={color} opacity={0.18} filter="url(#bsq-dot-glow)" />
                    {/* ring */}
                    <circle cx={dot.x} cy={dot.y} r={9} fill="none" stroke={color} strokeWidth={1.8} opacity={0.55} />
                    {/* coloured fill */}
                    <circle cx={dot.x} cy={dot.y} r={6} fill={color} />
                    {/* white highlight */}
                    <circle cx={dot.x} cy={dot.y} r={2.8} fill="white" opacity={0.9} />
                </svg>
            </Box>

            {/* ── Cycle progress indicators ────────────────────────────────── */}
            <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
                {Array.from({ length: TOTAL_CYCLES }).map((_, i) => {
                    const done = Math.floor(stepIdx / 4) > i;
                    const current = Math.floor(stepIdx / 4) === i;
                    return (
                        <motion.div
                            key={i}
                            animate={{ backgroundColor: done ? "#6B7280" : current ? color : "rgba(255,255,255,0.18)" }}
                            transition={{ duration: 0.4 }}
                            style={{ width: 8, height: 8, borderRadius: "50%" }}
                        />
                    );
                })}
            </Box>

        </Box>
    );
};

export default BreathingSquare;
