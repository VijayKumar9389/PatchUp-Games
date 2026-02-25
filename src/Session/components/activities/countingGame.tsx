import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import FadingText from './components/FadingText';

interface CountingGameProps {
    onSend: (text: string, userSelected: boolean, activity: string) => void;
    showInstructions?: boolean;
}

const TARGET = 10;
const ACCENT = '#60A5FA';
const SUCCESS = '#34D399';

// Gentle colour shift across the count (blue → teal → green)
const STEP_COLORS = [
    '#60A5FA', // 1
    '#5EADF8',
    '#5CB5F2',
    '#57BCEC',
    '#52C4E6',
    '#4ECBE0',
    '#46D1C5',
    '#3FD4B2',
    '#38D79F',
    '#34D399', // 10
];

const CountingGame: React.FC<CountingGameProps> = ({ onSend, showInstructions = false }) => {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(!showInstructions);

    const done = count >= TARGET;
    const color = done ? SUCCESS : count > 0 ? STEP_COLORS[count - 1] : ACCENT;
    const prompt = done ? 'Great job!' : count === 0 ? 'Starting…' : 'Keep going…';

    const messages = showInstructions
        ? [
            'Even though counting to ten is easy, it can be a great way to practice patience and mindfulness.',
            "Let's start counting together!",
        ]
        : [];

    // Auto-increment once per second after instructions finish
    useEffect(() => {
        if (!started || done) return;
        const timer = setTimeout(() => {
            const next = count + 1;
            setCount(next);
            if (next >= TARGET) {
                setTimeout(() => onSend('Counting game completed!', false, 'countingGame'), 1800);
            }
        }, 1500);
        return () => clearTimeout(timer);
    }, [count, started, done]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 2, py: 2 }}>

            {/* ── Instructions ─────────────────────────────────────────────── */}
            {!started && (
                <FadingText
                    messages={messages}
                    interval={3400}
                    stayOnLastMessage={false}
                    onCompleteCycle={() => setStarted(true)}
                />
            )}

            {/* ── Game ─────────────────────────────────────────────────────── */}
            {started && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>

                    {/* Number circle */}
                    <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                        {/* Pulse ring — expands outward on each new number */}
                        <AnimatePresence>
                            {!done && count > 0 && (
                                <motion.div
                                    key={count}
                                    initial={{ scale: 0.7, opacity: 0.55 }}
                                    animate={{ scale: 1.75, opacity: 0 }}
                                    transition={{ duration: 0.6, ease: 'easeOut' }}
                                    style={{
                                        position: 'absolute',
                                        width: 148,
                                        height: 148,
                                        borderRadius: '50%',
                                        border: `2px solid ${color}`,
                                        pointerEvents: 'none',
                                    }}
                                />
                            )}
                        </AnimatePresence>

                        {/* Main circle */}
                        <motion.div
                            animate={{
                                borderColor: color,
                                boxShadow: done
                                    ? `0 0 24px 6px ${SUCCESS}44`
                                    : `0 0 22px 3px ${color}44`,
                                background: done
                                    ? `${SUCCESS}18`
                                    : `${color}14`,
                            }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                            style={{
                                width: 148,
                                height: 148,
                                borderRadius: '50%',
                                border: `2.5px solid ${color}`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                userSelect: 'none',
                                position: 'relative',
                            }}
                        >
                            <AnimatePresence mode="wait">
                                {done ? (
                                    <motion.div
                                        key="check"
                                        initial={{ scale: 0.4, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ type: 'spring', stiffness: 380, damping: 18 }}
                                    >
                                        <Typography sx={{ fontSize: '3.2rem', color: SUCCESS, lineHeight: 1 }}>
                                            ✓
                                        </Typography>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key={count}
                                        initial={{ scale: 1.45, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.55, opacity: 0 }}
                                        transition={{ duration: 0.2, ease: 'easeOut' }}
                                    >
                                        <Typography sx={{
                                            fontSize: count === 0 ? '1.1rem' : '3.8rem',
                                            fontWeight: 200,
                                            color,
                                            lineHeight: 1,
                                            letterSpacing: count === 0 ? '0.1em' : 0,
                                            textTransform: 'uppercase',
                                        }}>
                                            {count === 0 ? 'Ready' : count}
                                        </Typography>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </Box>

                    {/* Status label */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={prompt}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Typography sx={{
                                fontSize: '0.8rem',
                                color: done ? SUCCESS : 'rgba(255,255,255,0.4)',
                                letterSpacing: '0.12em',
                                textTransform: 'uppercase',
                            }}>
                                {prompt}
                            </Typography>
                        </motion.div>
                    </AnimatePresence>

                    {/* Progress dots */}
                    <Box sx={{ display: 'flex', gap: 0.75 }}>
                        {Array.from({ length: TARGET }).map((_, i) => {
                            const filled = i < count;
                            const active = i === count - 1 && !done;
                            return (
                                <motion.div
                                    key={i}
                                    animate={{
                                        backgroundColor: filled
                                            ? (done ? SUCCESS : STEP_COLORS[i])
                                            : 'rgba(255,255,255,0.14)',
                                        scale: active ? 1.35 : 1,
                                    }}
                                    transition={{ duration: 0.25 }}
                                    style={{ width: 8, height: 8, borderRadius: '50%' }}
                                />
                            );
                        })}
                    </Box>

                </Box>
            )}

        </Box>
    );
};

export default CountingGame;
