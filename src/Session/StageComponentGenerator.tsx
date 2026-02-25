import React, { useEffect, useState, useContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeVariantFast } from '../utils/helpers';
import { generateQuestionSet } from './QuestionSetGenerator';
import CheckInComplete from "./questions/FinalPage";
import { SessionContext } from '.';
import { APIUtils } from '../utils/apiUtils';
import { Box, useTheme, useMediaQuery, Typography, Button, Divider } from '@mui/material';

export const labelMap: Record<string, string> = {
    'educator_check_in': 'Educator Check-In',
    'educator_setup': 'Educator Setup',
    'student_check_in': 'Student Check-In',
};
interface StageComponentProps {
    stageMetaData: any;
    setCurStage: React.Dispatch<React.SetStateAction<number>>;
    uuid: string;
    assign_student_method: string | null;
    classroomName: string | null;
    isSmallScreen: boolean;
    curStage: number;
    isPreview?: boolean;
}

export const StageComponentGenerator: React.FC<StageComponentProps> = ({
    stageMetaData,
    setCurStage,
    uuid,
    assign_student_method,
    classroomName,
    isSmallScreen,
    curStage,
    isPreview = false,
}) => {

    const [curQuestionIdx, setCurQuestionIdx] = useState(0);
    const [answers, setAnswers] = useState<any>({});
    const [loading, setLoading] = useState(false);
    const [stageSkipped, setStageSkipped] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { sessionID, assignedStudent, sessionStages, setSessionStages, muteAudio } = useContext(SessionContext);
    let questionCount = stageMetaData.details.questions.length;
    const stageQuestions = generateQuestionSet(
        stageMetaData,
        setCurQuestionIdx,
        setAnswers,
        muteAudio
    );
    // not sure about having this
    if (questionCount > 0) {
        stageQuestions.push(
            <CheckInComplete setCurStage={setCurStage} label={labelMap[stageMetaData.stage]} />
        );
        questionCount += 1;
    }

    async function submitAnswers(skip = false) {
        setLoading(true);
        setStageSkipped(skip);
        let newStudentQuestions = false;
        try {
            const response = await APIUtils.POST(APIUtils.getAPI_URL() + `api/session/submit_stage/`,
                {
                    'answers': answers,
                    'classroom_uuid': uuid,
                    'stage': stageMetaData.stage,
                    'session_id': sessionID,
                    'student': assignedStudent,
                    'isPreview': isPreview,
                    'skipped': skip,
                });
            if (response.status === 200) {
                const student_check_in_details = response.data.student_check_in_details;
                newStudentQuestions = student_check_in_details.questions.length > 0 && !sessionStages.some(stage => stage.stage === "student_check_in");
                if (newStudentQuestions) {
                    setSessionStages(prev => [
                        ...prev,
                        { stage: "student_check_in", details: student_check_in_details }
                    ]);
                }
            } else {
                console.log('Error fetching basic classroom data:', response.statusText);
            }
        } catch (error) {
            console.log('Error fetching basic classroom data:', error);
        } finally {
            if (skip && !newStudentQuestions) {
                setCurStage(prev => prev + 1);
            }
            setLoading(false);
        }
    }
    useEffect(() => {
        if (stageSkipped) {
            setCurStage(prev => prev + 1);
        }

    }, [sessionStages]);

    useEffect(() => {
        if (curQuestionIdx === questionCount - 1 && questionCount > 0) {
            submitAnswers();
        }
    }, [curQuestionIdx]);

    return (
        <Box sx={{ position: "relative", }}>
            <Box sx={{ width: '100%', mb: 1 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        // mb: 0.5,
                    }}
                >
                    {classroomName && !isSmallScreen && (
                        <Typography
                            variant="h4"
                            sx={{
                                color: "white",
                                fontWeight: "bold",
                                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                                // fontSize: '1.7rem',
                            }}
                        >
                            {classroomName}
                        </Typography>
                    )}

                    <Typography
                        variant="h4"
                        sx={{
                            color: "white",
                            fontWeight: "bold",
                            textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                        }}
                    >
                        {labelMap[sessionStages[curStage]?.stage]}
                    </Typography>


                </Box>

                <Divider sx={{ bgcolor: "white", px: 1 }} />

            </Box>
            {stageMetaData.stage !== 'student_check_in' && (
                <Box
                    sx={{
                        position: "absolute",
                        top: isMobile ? -6 : 40,   // 👈 key change
                        right: 0,
                        // mt: 1,
                    }}
                >
                    <Button
                        // variant="contained"
                        onClick={() => submitAnswers(true)}
                        disabled={loading}
                        size='small'
                        sx={{
                            backgroundColor: 'primary.main',
                            color: 'white',
                            borderRadius: 5,
                            border: '2px solid white',
                            fontSize: "0.8rem",
                            mb: 0.5,
                            '&:hover': { backgroundColor: 'primary.dark' },
                        }}
                    >
                        Skip section
                    </Button>
                </Box>
            )}
            <Box >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`stage-${curQuestionIdx}`}
                        variants={fadeVariantFast}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        {stageQuestions[curQuestionIdx]}
                    </motion.div>
                </AnimatePresence>
            </Box>
        </Box>
    )
};

export default StageComponentGenerator;
