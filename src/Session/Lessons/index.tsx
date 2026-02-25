import React from "react";
import { lessonList } from "./LessonSelect/LessonList";
import { Box } from "@mui/material";
import LessonSelect from "./LessonSelect/LessonSelect";
import LessonContainer from "./LessonContent/LessonContainer";
import { AnimatePresence, motion } from "framer-motion";
import { fadeVariant } from "../../utils/helpers";
import { Student } from "../../types";
import { createContext } from "react";
import { speakWithPolly } from "../components/polly";

export const AudioContext = createContext<any>(null);

interface LessonProps {
    selectedStudent?: Student | null;
    selectedLessonId: string | null;
    setSelectedLessonId: React.Dispatch<React.SetStateAction<string | null>>;
    setSELChoice?: React.Dispatch<React.SetStateAction<'lesson' | 'activity' | null>>;
    muteAudio?: boolean;
}

const Lessons: React.FC<LessonProps> = ({
    selectedStudent,
    selectedLessonId,
    setSelectedLessonId,
    setSELChoice,
    muteAudio = false, // eslint-disable-line @typescript-eslint/no-unused-vars
}) => {
    const [completedLessons, setCompletedLessons] = React.useState<Set<number>>(
        () => new Set()
    );
    const [isSpeaking, setIsSpeaking] = React.useState(false);

    const handleSpeak = (text: string) => {
        if (isSpeaking) return;
        speakWithPolly(text, isSpeaking, setIsSpeaking);
    };

    return (
        <AudioContext.Provider value={{ muteAudio: false, handleSpeak }}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                }}
            >
                <AnimatePresence mode="wait">
                    {!selectedLessonId ? (
                        <motion.div
                            key="lesson-select"
                            variants={fadeVariant}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            style={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'hidden',
                            }}
                        >
                            <LessonSelect
                                setSelectedLessonId={setSelectedLessonId}
                                completedLessons={completedLessons}
                                lessonList={lessonList}
                                setSELChoice={setSELChoice}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="lesson-content"
                            variants={fadeVariant}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            style={{
                                flex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'hidden',
                            }}
                        >
                            <LessonContainer
                                selectedLessonId={selectedLessonId}
                                setSelectedLessonId={setSelectedLessonId}
                                selectedStudent={selectedStudent}
                                setCompletedLessons={setCompletedLessons}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </Box>
        </AudioContext.Provider>
    );
};

export default Lessons;
