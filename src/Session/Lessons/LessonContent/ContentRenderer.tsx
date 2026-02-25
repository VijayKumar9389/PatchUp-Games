import { Box, Container, Typography, alpha } from '@mui/material';
import MultipleChoiceActivity from './Activities/MultipleChoice';
import YesNoActivity from './Activities/YesOrNo';
import React, { useEffect } from 'react';
import MultiSelectActivity from './Activities/MultiSelect';
import ActivityRenderer from './ActivityRenderer';
import { speakWithPolly } from '../../components/polly';
import MinimalDndKitBuckets from './Activities/DnDBuckets';
import DnDMatch from './Activities/DnDMatch';
import FillBlank from './Activities/FillInTheBlank';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { LessonTitle } from './LessonComponents/LessonTitle';
import { LessonBodyCard } from './LessonComponents/LessonBodyCard';
import { LessonImage } from './LessonComponents/LessonImage';
import { InteractionRenderer, NavigationButtons } from './LessonComponents/InteractionRenderer';
import { useResizeObserver, SpeakButton } from './LessonComponents';
import { AudioContext } from '..';
import { useDensity } from '../../../hooks/useDensity';
const ContentRenderer = ({
    content,
    changePage,
    pageIndex,
    lesson,
    setSelectedLessonId,
    handleCompleteLesson
}) => {
    const [activityCompleted, setActivityCompleted] = React.useState(false);
    const [feedbackInfo, setFeedbackInfo] = React.useState<{ isCorrect: boolean; text?: string } | null>(null);
    const density = useDensity();
    const { muteAudio, handleSpeak } = React.useContext(AudioContext);
    useEffect(() => {
        setActivityCompleted(false);
        setFeedbackInfo(null);
    }, [pageIndex, lesson]);

    const handleActivityCompleted = (completed: boolean, isCorrect?: boolean, feedbackText?: string) => {
        setActivityCompleted(completed);
        if (isCorrect !== undefined) {
            setFeedbackInfo({ isCorrect, text: feedbackText });
        }
    };

    const completeActivity = () => {
        setActivityCompleted(true);
        changePage(1);
    };

    const lastPageIndex = lesson.pages.length - 1;
    return (
        <Box
            id="contentRenderer"
            component="section"
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                minHeight: 0,
            }}
        >
            <Container
                sx={{
                    width: "100%",
                    height: "100%",
                    p: 0,
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 0,
                }}
            >
                <LessonTitle title={content.title} />
                <Box
                    sx={{
                        flex: 1,
                        minHeight: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: density < 0.8 ? 0.5 : 1,
                        overflowY: { xs: 'auto', md: 'hidden' },
                        overflowX: 'hidden',
                        // Custom scrollbar styling
                        '&::-webkit-scrollbar': {
                            width: '6px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: 'transparent',
                            marginY: '8px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: alpha('#667eea', 0.3),
                            borderRadius: '3px',
                            '&:hover': {
                                background: alpha('#667eea', 0.5),
                            },
                        },
                        scrollbarWidth: 'thin',
                        scrollbarColor: `${alpha('#667eea', 0.3)} transparent`,
                        pr: { xs: 1, md: 0 }, // Small padding on mobile for scrollbar spacing
                    }}
                >
                    {content.sideBySide ? (
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 2,
                            alignItems: 'center',
                            flex: 1,
                            minHeight: 0,
                            overflow: 'hidden',
                        }}>
                            <Box sx={{
                                flex: { xs: '1 1 100%', md: '1 1 55%' },
                                minHeight: 0,
                                display: 'flex',
                                alignItems: 'center',
                            }}>
                                {content?.body && (
                                    <LessonBodyCard
                                        title={content.title}
                                        body={content.body}
                                        muteAudio={muteAudio}
                                        handleSpeak={handleSpeak}
                                        centerOnDesktop
                                    />
                                )}
                            </Box>

                            <Box sx={{
                                flex: { xs: '1 1 100%', md: '1 1 40%' },
                                minHeight: 0,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                overflow: 'hidden',
                            }}>
                                {content.image && (
                                    <LessonImage
                                        src={content.image}
                                        alt={content.title}
                                    />
                                )}
                            </Box>
                        </Box>
                    ) : (
                        <>
                            {content?.body && (
                                <LessonBodyCard
                                    title={content.title}
                                    body={content.body}
                                    muteAudio={muteAudio}
                                    handleSpeak={handleSpeak}
                                    centerOnDesktop
                                />
                            )}

                            {/* Feedback message for yesno/ms - between body and image */}
                            {(content.interaction?.type === 'yesno' || content.interaction?.type === 'ms' || content.interaction?.type === 'mc') && (
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    minHeight: 28,
                                    flexShrink: 0,
                                }}>
                                    <Box sx={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 0.5,
                                        px: 1.5,
                                        py: 0.5,
                                        borderRadius: '12px',
                                        backgroundColor: feedbackInfo ? (feedbackInfo.isCorrect ? alpha('#4caf50', 0.1) : alpha('#ff9800', 0.1)) : 'transparent',
                                        border: feedbackInfo ? `1px solid ${feedbackInfo.isCorrect ? alpha('#4caf50', 0.3) : alpha('#ff9800', 0.3)}` : '1px solid transparent',
                                        visibility: feedbackInfo ? 'visible' : 'hidden',
                                    }}>
                                        <CheckCircleIcon sx={{
                                            color: feedbackInfo?.isCorrect ? '#4caf50' : '#ff9800',
                                            fontSize: 14,
                                        }} />
                                        <Typography
                                            sx={{
                                                fontWeight: 600,
                                                color: feedbackInfo?.isCorrect ? '#2e7d32' : '#e65100',
                                                fontSize: `${0.8 * density}rem`,
                                            }}
                                        >
                                            {feedbackInfo?.text || (feedbackInfo?.isCorrect ? 'Correct!' : 'Not quite!')}
                                        </Typography>
                                    </Box>
                                </Box>
                            )}

                            {content.image && (
                                <Box sx={{ flex: 1, minHeight: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <LessonImage
                                        src={content.image}
                                        alt={content.title}
                                    />
                                </Box>
                            )}
                        </>
                    )}

                    {content.interaction && (
                        <Box sx={{
                            flexShrink: content.interaction.type === 'activity' ? 1 : 0,
                            flex: content.interaction.type === 'activity' ? 1 : 'none',
                            minHeight: content.interaction.type === 'activity' ? 0 : 'auto',
                            display: content.interaction.type === 'activity' ? 'flex' : 'block',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <InteractionRenderer
                                interaction={content.interaction}
                                activityCompleted={activityCompleted}
                                setActivityCompleted={handleActivityCompleted}
                                completeActivity={completeActivity}
                                handleSpeak={handleSpeak}
                            />
                        </Box>
                    )}
                </Box>

                {/* Navigation buttons fixed at bottom */}
                <NavigationButtons
                    canNavigate={!content.interaction || content.interaction.type === "next" || activityCompleted}
                    changePage={changePage}
                    pageIndex={pageIndex}
                    lastPageIndex={lastPageIndex}
                    handleCompleteLesson={handleCompleteLesson}
                />
            </Container>
        </Box>
    );
};

export default ContentRenderer;