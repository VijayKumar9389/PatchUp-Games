import React, { useEffect, useContext } from "react";
import { Box, Button, Typography, Stack, IconButton, alpha } from "@mui/material";
import { motion } from "framer-motion";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { AudioContext } from "../../..";

const gradientPrimary = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
const gradientPrimaryHover = 'linear-gradient(135deg, #5a6fd6 0%, #6a4190 100%)';
// Data types
interface FillRow {
    id: string;
    left: string;
    right: string;
    answer: string; // correct answer
}

interface FillBlankProps {
    rows: FillRow[];
    wordBank: string[]; // array of all options (should include all correct answers)
    setActivityCompleted?: (completed: boolean) => void;

}

export default function FillBlank({
    rows,
    wordBank,
    setActivityCompleted,

}: FillBlankProps) {
    const { muteAudio, handleSpeak } = useContext(AudioContext);
    const [submitted, setSubmitted] = React.useState(false);
    const [shakingIds, setShakingIds] = React.useState<string[]>([]);
    const [filled, setFilled] = React.useState<(string | null)[]>(
        () => Array(rows.length).fill(null)
    );
    const remaining = wordBank.filter((w) => !filled.includes(w));

    const [selectedIdx, setSelectedIdx] = React.useState<number | null>(0);
    function handleSubmit() {
        const wrongIds = getIncorrectlyMatchedIds();
        wrongIds.forEach(triggerShake);
    }
    function triggerShake(itemId: string) {
        setShakingIds(ids => [...ids, itemId]);
        setTimeout(() => {
            setShakingIds(ids => ids.filter(id => id !== itemId));
        }, 500);
    }
    function getIncorrectlyMatchedIds() {
        const wrongIds: string[] = [];
        filled.forEach((word, index) => {
            const correctAnswer = rows[index].answer;
            if (word !== correctAnswer) {
                wrongIds.push(`${index + 1}`);
            }
        });
        if (wrongIds.length === 0) {
            setSubmitted(true);
            setActivityCompleted(true);
        }
        return wrongIds;
    }

    function handleWordClick(word: string) {
        if (selectedIdx == null) return;
        setFilled((prev) => {
            const next = [...prev];
            // If current selected blank already has a word, put it back in the bank
            next[selectedIdx] = word;
            // onChange?.(next);
            return next;
        });
        setSelectedIdx(null);
    }

    // Handle blank click
    function handleBlankClick(idx: number) {
        if (filled[idx]) {
            // Remove word, return it to word bank
            setFilled((prev) => {
                const next = [...prev];
                next[idx] = null;
                // onChange?.(next);
                return next;
            });
            setSelectedIdx(null);
        } else {
            setSelectedIdx(idx);
        }
    }
    useEffect(() => {
        if (selectedIdx === null) {
            const firstEmptyIdx = filled.findIndex((f) => f === null);
            setSelectedIdx(firstEmptyIdx !== -1 ? firstEmptyIdx : null);
        }
    }, [filled, selectedIdx]);

    return (
        <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", mt: 4 }}>
            <Stack spacing={3}>
                {rows.map((row, idx) => (
                    <Box key={idx} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Typography sx={{
                            fontSize: {
                                xs: "0.8rem",
                                sm: "1rem",
                                md: "1.1rem",
                                lg: "1.25rem",
                            },
                        }}>{row.left}</Typography>
                        <motion.div
                            animate={shakingIds.includes(row.id) ? { x: [0, -6, 6, -6, 6, 0] } : { x: 0 }}
                            transition={{
                                duration: 0.5,
                                repeat: Infinity,
                                repeatType: "loop",
                                ease: "easeInOut",
                            }}
                        >

                            <Button
                                onClick={() => handleBlankClick(idx)}
                                sx={{
                                    minWidth: 80,
                                    mx: 0.5,
                                    fontWeight: 700,
                                    fontSize: "1rem",
                                    background: filled[idx] ? "#fff" : "transparent",
                                    border: selectedIdx === idx ? "1px solid #fff" : "1px solid transparent",
                                    boxSizing: "border-box",
                                }}
                            > <Typography sx={{
                                fontSize: {
                                    xs: "0.8rem",
                                    sm: "1rem",
                                    md: "1.1rem",
                                    lg: "1.25rem",
                                },
                            }}>{filled[idx] || "____"}</Typography>
                            </Button>
                        </motion.div>
                        <Typography sx={{
                            fontSize: {
                                xs: "0.8rem",
                                sm: "1rem",
                                md: "1.1rem",
                                lg: "1.25rem",
                            },
                        }}>{row.right}</Typography>
                        {!muteAudio && (
                            <IconButton
                                onClick={() => {
                                    filled[idx] ?
                                        handleSpeak(row.left + " " + filled[idx] + " " + row.right)
                                        :
                                        handleSpeak(row.left + " blank " + row.right);
                                }}
                                sx={{
                                    color: "#667eea",
                                    flexShrink: 0,
                                    width: 24,
                                    height: 24,
                                    borderRadius: "50%",
                                    "&:hover": {
                                        backgroundColor: alpha('#667eea', 0.1),
                                    },
                                }}
                            >
                                <VolumeUpIcon />
                            </IconButton>
                        )}
                    </Box>
                ))}
            </Stack>
            <Box sx={{ mt: 5, mb: 2 }}>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {remaining.map((word) => (
                        <Button
                            key={word}
                            // variant="outlined"

                            onClick={() => handleWordClick(word)}
                            sx={{
                                fontWeight: 600,
                                borderRadius: 3,
                                minWidth: 80,
                                background: "#fff",
                                border: "1px solid #bbb",
                            }}
                        ><Typography>
                                {word}
                            </Typography>
                            {!muteAudio && (
                                <IconButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleSpeak(word);
                                    }}
                                    sx={{
                                        color: "#667eea",
                                        flexShrink: 0,
                                        borderRadius: "50%",
                                        "&:hover": {
                                            backgroundColor: alpha('#667eea', 0.1),
                                        },
                                    }}
                                >
                                    <VolumeUpIcon />
                                </IconButton>
                            )}
                        </Button>
                    ))}
                </Box>
            </Box>
            {submitted ? (
                <Box mt={2} textAlign="center">
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Great Job!
                    </Typography>
                </Box>
            ) : (
                <Box mt={2} textAlign="center">
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{
                            borderRadius: '24px',
                            border: 'none',
                            px: 3,
                            py: 1,
                            fontWeight: 600,
                            textTransform: 'none',
                            background: gradientPrimary,
                            color: 'white',
                            boxShadow: `0 4px 12px ${alpha('#667eea', 0.3)}`,
                            '&:hover': {
                                background: gradientPrimaryHover,
                                boxShadow: `0 6px 16px ${alpha('#667eea', 0.4)}`,
                            },
                        }}
                    >
                        Submit
                    </Button>
                </Box>
            )}
        </Box>
    );
}
