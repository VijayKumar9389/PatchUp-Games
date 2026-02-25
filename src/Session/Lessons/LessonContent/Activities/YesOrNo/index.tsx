import React, { useState } from 'react';
import { Box, Button, Stack, Typography, alpha } from '@mui/material';
import { useDensity } from '../../../../../hooks/useDensity';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

type StyleType = 'text' | 'thumbs' | 'icons';

interface Props {
    question: string;
    correctAnswer: 'yes' | 'no';
    style?: StyleType;
    correctText?: string;
    incorrectText?: string;
    setActivityCompleted?: (completed: boolean, isCorrect?: boolean, feedbackText?: string) => void;
}

const YesNoActivity = ({ question, correctAnswer, correctText, incorrectText, style = 'text', setActivityCompleted }: Props) => {
    const [selected, setSelected] = useState<'yes' | 'no' | null>(null);
    const density = useDensity();

    const handleSelect = (choice: 'yes' | 'no') => {
        setSelected(choice);
        const isCorrectChoice = choice === correctAnswer || correctAnswer === null;
        const feedbackText = isCorrectChoice ? (correctText || 'Correct!') : (incorrectText || 'Not quite!');
        if (setActivityCompleted) setActivityCompleted(true, isCorrectChoice, feedbackText);
    };

    const renderIcon = (type: 'yes' | 'no', isSelected: boolean) => {
        const iconSx = {
            fontSize: 28,
            transition: 'transform 0.2s ease',
            transform: isSelected ? 'scale(1.1)' : 'scale(1)',
        };

        if (style === 'thumbs') {
            return type === 'yes'
                ? <ThumbUpIcon sx={iconSx} />
                : <ThumbDownIcon sx={iconSx} />;
        } else if (style === 'icons') {
            return type === 'yes'
                ? <CheckCircleIcon sx={iconSx} />
                : <CancelIcon sx={iconSx} />;
        }
        return null;
    };

    const getButtonStyle = (type: 'yes' | 'no') => {
        const isSelected = selected === type;
        const isYes = type === 'yes';

        // Base colors
        const yesColor = '#4caf50';
        const noColor = '#ef5350';
        const baseColor = isYes ? yesColor : noColor;

        if (!selected) {
            // Unselected state - clean white with colored accents
            return {
                backgroundColor: 'white',
                color: baseColor,
                borderColor: '#e2e8f0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                '&:hover': {
                    backgroundColor: alpha(baseColor, 0.04),
                    borderColor: baseColor,
                    boxShadow: `0 4px 12px ${alpha(baseColor, 0.15)}`,
                    transform: 'translateY(-2px)',
                },
            };
        }

        if (isSelected) {
            // Selected state - show correct/incorrect
            const isCorrectChoice = type === correctAnswer;
            const feedbackColor = isCorrectChoice ? '#4caf50' : '#ff9800';
            return {
                backgroundColor: alpha(feedbackColor, 0.1),
                color: isCorrectChoice ? '#2e7d32' : '#e65100',
                borderColor: feedbackColor,
                boxShadow: `0 4px 12px ${alpha(feedbackColor, 0.2)}`,
                '&:hover': {
                    backgroundColor: alpha(feedbackColor, 0.1),
                },
            };
        }

        // Non-selected after selection - dimmed
        return {
            backgroundColor: '#f7fafc',
            color: '#a0aec0',
            borderColor: '#e2e8f0',
            boxShadow: 'none',
            '&:hover': {
                backgroundColor: '#f7fafc',
            },
        };
    };

    return (
        <Box sx={{ py: 1 }}>
            {question && (
                <Typography
                    sx={{
                        fontSize: `${1.1 * density}rem`,
                        fontWeight: 600,
                        color: '#2d3748',
                        letterSpacing: '-0.01em',
                        textAlign: 'center',
                        mb: 1.5,
                    }}
                >
                    {question}
                </Typography>
            )}

            <Stack direction="row" spacing={2} justifyContent="center">
                {(['yes', 'no'] as const).map((choice) => {
                    const isSelected = selected === choice;
                    const isYes = choice === 'yes';

                    return (
                        <Button
                            key={choice}
                            onClick={() => handleSelect(choice)}
                            variant="outlined"
                            sx={{
                                minWidth: Math.round(120 * density),
                                height: Math.round(48 * density),
                                borderRadius: '999px',
                                border: '2px solid',
                                fontSize: `${1.15 * density}rem`,
                                fontWeight: 600,
                                textTransform: 'none',
                                display: 'flex',
                                gap: 1,
                                transition: 'all 0.2s ease',
                                ...getButtonStyle(choice),
                            }}
                        >
                            {style !== 'text' && renderIcon(choice, isSelected)}
                            {style === 'text' && (isYes ? 'Yes' : 'No')}
                        </Button>
                    );
                })}
            </Stack>

        </Box>
    );
};

export default YesNoActivity;
