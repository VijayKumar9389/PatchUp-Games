import React, { useState, useContext, useLayoutEffect, useRef } from 'react';
import { Box, Button, Typography, Stack, IconButton, alpha } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { AudioContext } from '../../..';
import { useDensity } from '../../../../../hooks/useDensity';

interface Option {
    label: string;
    isCorrect: boolean;
}

interface MultiProps {
    question: string;
    correctText?: string;
    incorrectText?: string;
    options: Option[];
    setActivityCompleted: (completed: boolean, isCorrect?: boolean, feedbackText?: string) => void;
}

const MultiSelectActivity = ({
    question,
    options,
    correctText,
    incorrectText,
    setActivityCompleted,
}: MultiProps) => {
    const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const { muteAudio, handleSpeak } = useContext(AudioContext);
    const density = useDensity();

    const toggleOption = (index: number) => {
        if (submitted) return;

        setSelectedIndices((prev) =>
            prev.includes(index)
                ? prev.filter((i) => i !== index)
                : [...prev, index]
        );
    };

    const handleSubmit = () => {
        setSubmitted(true);
        const correct = selectedIndices.length === options.filter((o) => o.isCorrect).length &&
            selectedIndices.every((i) => options[i].isCorrect);
        const feedbackText = correct ? (correctText || 'Correct!') : (incorrectText || 'Not quite!');
        setActivityCompleted(true, correct, feedbackText);
    };

    const isCorrect =
        submitted &&
        selectedIndices.length === options.filter((o) => o.isCorrect).length &&
        selectedIndices.every((i) => options[i].isCorrect);

    const buttonRefs = useRef<HTMLButtonElement[]>([]);
    useLayoutEffect(() => {
        if (!buttonRefs.current.length) return;

        const maxHeight = Math.max(
            ...buttonRefs.current.map(el => el?.offsetHeight || 0)
        );

        buttonRefs.current.forEach(el => {
            if (el) el.style.height = `${maxHeight}px`;
        });
    }, [options]);
    const renderOption = (i: number) => {
        const option = options[i];
        if (!option) return null;
        const isSelected = selectedIndices.includes(i);

        let bgColor = 'white';
        let textColor = '#4a5568';
        let borderColor = '#e2e8f0';
        let shadowColor = 'rgba(0,0,0,0.04)';
        let iconColor = '#cbd5e0';

        if (isSelected && !submitted) {
            bgColor = alpha('#667eea', 0.08);
            textColor = '#667eea';
            borderColor = '#667eea';
            shadowColor = 'rgba(102,126,234,0.15)';
            iconColor = '#667eea';
        }

        if (submitted) {
            if (isSelected && option.isCorrect) {
                bgColor = alpha('#4caf50', 0.1);
                textColor = '#2e7d32';
                borderColor = '#4caf50';
                iconColor = '#4caf50';
            } else if (isSelected && !option.isCorrect) {
                bgColor = alpha('#ff9800', 0.1);
                textColor = '#e65100';
                borderColor = '#ff9800';
                iconColor = '#ff9800';
            } else if (!isSelected && option.isCorrect) {
                bgColor = alpha('#ff9800', 0.05);
                textColor = '#e65100';
                borderColor = '#ffb74d';
                iconColor = '#ffb74d';
            }
        }

        return (
            <Box
                key={i}
                onClick={() => toggleOption(i)}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    p: 2,
                    backgroundColor: bgColor,
                    borderRadius: '999px',
                    border: `2px solid ${borderColor}`,
                    cursor: submitted ? 'default' : 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': submitted ? {} : {
                        backgroundColor: isSelected ? bgColor : alpha('#667eea', 0.04),
                        borderColor: isSelected ? borderColor : '#667eea',
                        transform: 'translateY(-1px)',
                    },
                }}
            >
                {/* Checkbox Icon */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                    flexShrink: 0,
                }}>
                    {isSelected ? (
                        <CheckCircleIcon sx={{ fontSize: 24, color: iconColor }} />
                    ) : (
                        <RadioButtonUncheckedIcon sx={{ fontSize: 24, color: iconColor }} />
                    )}
                </Box>

                {/* Label */}
                <Typography
                    sx={{
                        flex: 1,
                        fontSize: `${1.1 * density}rem`,
                        fontWeight: 500,
                        color: textColor,
                        lineHeight: 1.5,
                    }}
                >
                    {option.label}
                </Typography>

                {/* Sound Button */}
                {!muteAudio && (
                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            handleSpeak(option.label);
                        }}
                        sx={{
                            ml: 1,
                            flexShrink: 0,
                            width: 40,
                            height: 40,
                            borderRadius: '999px',
                            backgroundColor: alpha('#667eea', 0.08),
                            color: '#667eea',
                            border: '1px solid',
                            borderColor: alpha('#667eea', 0.15),
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                backgroundColor: alpha('#667eea', 0.15),
                                borderColor: alpha('#667eea', 0.25),
                            },
                        }}
                    >
                        <VolumeUpIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                )}
            </Box>
        );
    };

    return (
        <Box>
            <Typography
                gutterBottom
                sx={{
                    fontSize: `${1.25 * density}rem`,
                    fontWeight: 600,
                    mb: density < 0.8 ? 1.5 : 3,
                    color: '#2d3748',
                    letterSpacing: '-0.01em',
                }}
            >
                {question}
            </Typography>

            <Stack direction="column" spacing={density < 0.8 ? 1 : 1.5}>
                {options.map((_, i) => renderOption(i))}
            </Stack>

            {!submitted && (
                <Box mt={3} textAlign="center">
                    <Button
                        variant="outlined"
                        onClick={handleSubmit}
                        disabled={selectedIndices.length === 0}
                        sx={{
                            borderRadius: '999px',
                            border: '2px solid #667eea',
                            px: 5,
                            py: 1.5,
                            fontWeight: 600,
                            textTransform: 'none',
                            backgroundColor: 'white',
                            color: '#667eea',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                backgroundColor: alpha('#667eea', 0.04),
                                borderColor: '#5a6fd6',
                                transform: 'translateY(-1px)',
                            },
                            '&:disabled': {
                                backgroundColor: '#f7fafc',
                                color: '#a0aec0',
                                borderColor: '#e2e8f0',
                            },
                        }}
                    >
                        Submit
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default MultiSelectActivity;
