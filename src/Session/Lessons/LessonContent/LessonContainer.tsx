import React, { useState, useEffect } from 'react';
import { Box, CircularProgress } from '@mui/material';
import { lessonImporters } from './LessonData/allLessons';
import ContentRenderer from './ContentRenderer';
import { AnimatePresence, motion } from "framer-motion";
import { fadeVariantFast } from '../../../utils/helpers';
import { APIUtils } from '../../../utils/apiUtils';

interface LessonContainerProps {
    selectedLessonId: string | null;
    setSelectedLessonId: React.Dispatch<React.SetStateAction<string | null>>;
    selectedStudent?: any;
    setCompletedLessons: React.Dispatch<React.SetStateAction<Set<number>>>;
}

const LessonContainer: React.FC<LessonContainerProps> = ({
    selectedLessonId,
    setSelectedLessonId,
    setCompletedLessons,
}) => {
    const [lesson, setLesson] = useState<any>(null);
    const [pageIndex, setPageIndex] = useState(0);
    const page = lesson ? lesson.pages[pageIndex] : null;
    React.useEffect(() => {
        let cancelled = false;
        async function load() {
            const importer = lessonImporters[selectedLessonId];
            if (!importer) throw new Error("Lesson not found!");
            const module = await importer();
            if (!cancelled) {
                setLesson(module.default || module[Object.keys(module)[0]]);
            }
        }
        if (selectedLessonId) {
            load();
        } else {
            setLesson(null);
        }
        return () => { cancelled = true; };
    }, [selectedLessonId]);

    function preloadImages(imageUrls: string[]) {
        if (!imageUrls) return;
        imageUrls.forEach((url: string) => {
            const img = new window.Image();
            img.src = url;
        });
    }
    useEffect(() => {
        if (lesson && lesson.imageUrls) {
            preloadImages(lesson.imageUrls);
        }
    }, [lesson]);
    if (!lesson) {
        return (
            <Box sx={{ width: '100%', height: '40vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }



    const changePage = (direction: number) => {
        if (direction === 1 && pageIndex < lesson.pages.length - 1)
            setPageIndex((prev: number) => prev + 1);
        else if (direction === -1 && pageIndex > 0)
            setPageIndex((prev: number) => prev - 1);
    };

    const handleCompleteLesson = async () => {
        try {
            await APIUtils.POST(
                APIUtils.getAPI_URL() + 'api/session/complete_lesson/',
                {
                    lesson_id: selectedLessonId,

                }
            );

        } catch (error) {
            console.error("Error completing lesson:", error);
        } finally {
            setCompletedLessons((prev: Set<number>) => {
                const next = new Set(prev);
                next.add(selectedLessonId as any);
                return next;
            });
            setSelectedLessonId(null);
        }
    };

    return (
        <Box sx={{ color: 'white', width: '100%', height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column' }} >
            <AnimatePresence mode="wait">
                <motion.div
                    key={pageIndex} // ensures remount on page change
                    variants={fadeVariantFast}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}
                >
                    <ContentRenderer

                        content={page.content}
                        changePage={changePage}
                        pageIndex={pageIndex}
                        lesson={lesson}
                        setSelectedLessonId={setSelectedLessonId}
                        handleCompleteLesson={handleCompleteLesson}
                    />
                </motion.div>
            </AnimatePresence>
        </Box>
    );
};

export default LessonContainer;
