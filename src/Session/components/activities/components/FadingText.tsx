import React, { useEffect, useState, useRef } from 'react';
import { Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const fadeVariant = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.8 } },
    exit: { opacity: 0, transition: { duration: 0.8 } },
};

type FadingTextProps = {
    messages: string[];
    interval?: number;
    onCompleteCycle?: () => void;
    stayOnLastMessage?: boolean;
};

const FadingText: React.FC<FadingTextProps> = ({
    messages,
    interval = 3000,
    onCompleteCycle,
    stayOnLastMessage = false,
}) => {
    const [index, setIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        if (isComplete) return;

        timerRef.current = window.setInterval(() => {
            setIndex((prev) => prev + 1);
        }, interval);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [interval, isComplete]);

    // Watch index to detect completion
    useEffect(() => {
        if (index >= messages.length) {
            if (timerRef.current) clearInterval(timerRef.current);
            setIsComplete(true);
            if (onCompleteCycle) onCompleteCycle();
        }
    }, [index, messages.length, onCompleteCycle]);

    // Don't render anything if complete and not supposed to stay on last message
    if (isComplete && stayOnLastMessage) {
        return (
            <Typography variant="h5" align="center">
                {messages[messages.length - 1]}
            </Typography>
        );
    } else if (isComplete && !stayOnLastMessage) {
        return null;
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={index}
                variants={fadeVariant}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                <Typography variant="h5" align="center">
                    {messages[index]}
                </Typography>
            </motion.div>
        </AnimatePresence>
    );
};

export default FadingText;
