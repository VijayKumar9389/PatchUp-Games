import { useState, useContext } from 'react';
import { Box, Typography, Stack, IconButton, alpha } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { AudioContext } from '../../..';
import { useDensity } from '../../../../../hooks/useDensity';

interface Option {
    label: string;
    isCorrect: boolean;
}

interface MCProps {
    question: string;
    correctText?: string;
    incorrectText?: string;
    options: Option[];
    setActivityCompleted: (completed: boolean, isCorrect?: boolean, feedbackText?: string) => void;
}

const MultipleChoiceActivity = ({
    question,
    options,
    correctText,
    incorrectText,
    setActivityCompleted,
}: MCProps) => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isCompleted, setIsCompleted] = useState(false);
    const { muteAudio, handleSpeak } = useContext(AudioContext);
    const density = useDensity();

    const handleSelect = (index: number) => {
        if (isCompleted) return;
        setSelectedIndex(index);
        const isCorrectChoice = options[index].isCorrect;
        const feedbackText = isCorrectChoice ? (correctText || 'Correct!') : (incorrectText || 'Not quite!');

        if (isCorrectChoice) {
            setIsCompleted(true);
            setActivityCompleted(true, true, feedbackText);
        } else {
            // Show feedback but don't complete - allow retry
            setActivityCompleted(false, false, feedbackText);
        }
    };

    const renderOption = (i: number) => {
        const option = options[i];
        if (!option) return null;
        const isSelected = selectedIndex === i;

        let bgColor = 'white';
        let textColor = '#4a5568';
        let borderColor = '#e2e8f0';
        let iconColor = '#cbd5e0';

        if (isSelected) {
            if (option.isCorrect) {
                // Correct answer selected
                bgColor = alpha('#4caf50', 0.1);
                textColor = '#2e7d32';
                borderColor = '#4caf50';
                iconColor = '#4caf50';
            } else {
                // Wrong answer selected
                bgColor = alpha('#ff9800', 0.1);
                textColor = '#e65100';
                borderColor = '#ff9800';
                iconColor = '#ff9800';
            }
        }

        return (
            <Box
                key={i}
                onClick={() => handleSelect(i)}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    p: 2,
                    backgroundColor: bgColor,
                    borderRadius: '999px',
                    border: `2px solid ${borderColor}`,
                    cursor: isCompleted ? 'default' : 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': isCompleted ? {} : {
                        backgroundColor: isSelected ? bgColor : alpha('#667eea', 0.04),
                        borderColor: isSelected ? borderColor : '#667eea',
                        transform: 'translateY(-1px)',
                    },
                }}
            >
                {/* Radio Icon */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                    flexShrink: 0,
                }}>
                    {isSelected ? (
                        <RadioButtonCheckedIcon sx={{ fontSize: 24, color: iconColor }} />
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
        </Box>
    );
};

export default MultipleChoiceActivity;
