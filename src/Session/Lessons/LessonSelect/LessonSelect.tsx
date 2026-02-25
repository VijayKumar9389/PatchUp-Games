import React from 'react';
import { Box, Button, Typography, useTheme, useMediaQuery, alpha } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { motion } from 'framer-motion';
import type { LessonSummary } from './LessonList';

interface LessonSelectProps {
    setSelectedLessonId: React.Dispatch<React.SetStateAction<string | null>>;
    completedLessons: Set<string | number>;
    lessonList: LessonSummary[];
    setSELChoice?: React.Dispatch<React.SetStateAction<'lesson' | 'activity' | null>>;
}

const LessonSelect: React.FC<LessonSelectProps> = ({
    setSelectedLessonId,
    completedLessons,
    lessonList,
    setSELChoice
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleSelect = (lessonId: string) => {
        setSelectedLessonId(lessonId);
    };

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}
        >
            {/* Header */}
            <Box sx={{ mb: { xs: 1.5, sm: 2 }, flexShrink: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: { xs: 28, sm: 32 },
                            height: { xs: 28, sm: 32 },
                            borderRadius: '8px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        }}
                    >
                        <AutoAwesomeIcon sx={{ color: 'white', fontSize: { xs: 16, sm: 18 } }} />
                    </Box>
                    <Typography
                        variant={isMobile ? 'h6' : 'h5'}
                        sx={{
                            fontWeight: 700,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Choose a Lesson
                    </Typography>
                </Box>
            </Box>

            {/* Lesson Cards Grid */}
            <Box
                sx={{
                    flex: 1,
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    '&::-webkit-scrollbar': { width: '4px' },
                    '&::-webkit-scrollbar-thumb': {
                        background: alpha('#667eea', 0.2),
                        borderRadius: '2px',
                    },
                }}
            >
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: 'repeat(2, 1fr)',
                            sm: 'repeat(3, 1fr)',
                            md: 'repeat(4, 1fr)',
                        },
                        gap: { xs: 1, sm: 1.5 },
                    }}
                >
                    {lessonList.map((lesson: LessonSummary, index: number) => {
                        const isCompleted = completedLessons.has(lesson.id);

                        return (
                            <motion.div
                                key={lesson.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.03, duration: 0.3 }}
                            >
                                <Box
                                    onClick={() => handleSelect(lesson.id)}
                                    sx={{
                                        position: 'relative',
                                        borderRadius: { xs: '12px', sm: '16px' },
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        aspectRatio: '4/3',
                                        boxShadow: `0 2px 12px ${alpha('#000', 0.1)}`,
                                        transition: 'all 0.25s ease',
                                        '&:hover': {
                                            transform: 'translateY(-3px) scale(1.02)',
                                            boxShadow: `0 8px 24px ${alpha('#667eea', 0.25)}`,
                                            '& .play-overlay': {
                                                opacity: 1,
                                                transform: 'translate(-50%, -50%) scale(1)',
                                            },
                                            '& .lesson-img': { transform: 'scale(1.08)' },
                                            '& .title-overlay': {
                                                background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
                                            },
                                        },
                                        '&:active': { transform: 'translateY(-1px) scale(1.01)' },
                                    }}
                                >
                                    {/* Full Background Image */}
                                    {lesson.thumbnail ? (
                                        <Box
                                            component="img"
                                            className="lesson-img"
                                            src={lesson.thumbnail}
                                            alt={lesson.title}
                                            sx={{
                                                position: 'absolute',
                                                inset: 0,
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                transition: 'transform 0.4s ease',
                                            }}
                                        />
                                    ) : (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                inset: 0,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            }}
                                        >
                                            <AutoAwesomeIcon sx={{ fontSize: 40, color: alpha('#fff', 0.4) }} />
                                        </Box>
                                    )}

                                    {/* Title Overlay at Bottom */}
                                    <Box
                                        className="title-overlay"
                                        sx={{
                                            position: 'absolute',
                                            inset: 0,
                                            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
                                            display: 'flex',
                                            alignItems: 'flex-end',
                                            p: { xs: 1, sm: 1.5 },
                                            transition: 'background 0.3s ease',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: 600,
                                                fontSize: { xs: '0.75rem', sm: '0.85rem' },
                                                color: 'white',
                                                lineHeight: 1.3,
                                                textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            {lesson.title}
                                        </Typography>
                                    </Box>

                                    {/* Play button on hover */}
                                    <Box
                                        className="play-overlay"
                                        sx={{
                                            position: 'absolute',
                                            top: '50%',
                                            left: '50%',
                                            transform: 'translate(-50%, -50%) scale(0.8)',
                                            width: { xs: 40, sm: 48 },
                                            height: { xs: 40, sm: 48 },
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: `0 4px 15px ${alpha('#000', 0.3)}`,
                                            opacity: 0,
                                            transition: 'all 0.25s ease',
                                            pointerEvents: 'none',
                                        }}
                                    >
                                        <PlayArrowRoundedIcon sx={{ color: 'white', fontSize: { xs: 24, sm: 28 }, ml: 0.3 }} />
                                    </Box>

                                    {/* Completed badge */}
                                    {isCompleted && (
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: { xs: 6, sm: 8 },
                                                right: { xs: 6, sm: 8 },
                                                px: 1,
                                                py: 0.3,
                                                borderRadius: '20px',
                                                background: '#4caf50',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 0.5,
                                                boxShadow: `0 2px 8px ${alpha('#4caf50', 0.4)}`,
                                            }}
                                        >
                                            <CheckCircleIcon sx={{ color: 'white', fontSize: 14 }} />
                                            <Typography
                                                sx={{
                                                    color: 'white',
                                                    fontSize: '0.65rem',
                                                    fontWeight: 600,
                                                }}
                                            >
                                                Done
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            </motion.div>
                        );
                    })}
                </Box>
            </Box>

            {/* Activities Button */}
            {completedLessons.size > 0 && (
                <Box sx={{ mt: 2, textAlign: 'center', flexShrink: 0 }}>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => setSELChoice?.('activity')}
                        sx={{
                            px: 3,
                            py: 1,
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            textTransform: 'none',
                            boxShadow: `0 4px 12px ${alpha('#667eea', 0.3)}`,
                            '&:hover': {
                                boxShadow: `0 6px 16px ${alpha('#667eea', 0.4)}`,
                            },
                        }}
                    >
                        Continue to Activities
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default LessonSelect;
