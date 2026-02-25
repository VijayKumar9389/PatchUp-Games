import { Box, CircularProgress, alpha } from '@mui/material';
import React, { useEffect, useState, createContext } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeVariantFast } from '../utils/helpers';
import { JSX } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { APIUtils } from '../utils/apiUtils';
import StageComponentGenerator from './StageComponentGenerator';
import Lessons from './Lessons';
import ActivitiesOnly from './activitiesOnly';
import CheckInComplete from './questions/FinalPage';

export const SessionContext = createContext<any | undefined>(undefined);

interface SessionParentProps {
    survey?: boolean;
}

const SessionParent: React.FC<SessionParentProps> = ({ }) => {
    const [curStage, setCurStage] = useState(0);
    const [selectedLessonId, setSelectedLessonId] = React.useState<string | null>(null);
    const [initialLoading, setInitialLoading] = useState(true);
    const { uuid } = useParams<{ uuid: string }>();
    const [classroomName, setClassroomName] = useState<string>('');
    const [grades, setGrades] = useState<number[]>([]);
    const [grade, setGrade] = useState<string | null>(null);
    const [muteAudio, setMuteAudio] = useState<boolean>(false);
    const [sessionStages, setSessionStages] = useState<any[]>([]);
    const [sessionID, setSessionID] = useState<number | null>(null);
    const [assign_student_method, setAssignStudentMethod] = useState<string | null>(null);
    const [assignedStudent, setAssignedStudent] = useState<any>(null);
    const [SELChoice, setSELChoice] = useState<string | null>('lesson');
    const [availableSELActivities, setAvailableSELActivities] = useState<any[]>([]);
    const [userState, setUserState] = React.useState<string>("");
    const [searchParams] = useSearchParams();
    const isPreview = searchParams.get('preview') === 'true';

    useEffect(() => {
        async function fetchClassroomSetupData() {
            try {
                const url = uuid
                    ? `api/session/setup/${uuid}/`
                    : `api/session/setup/`;

                const response = await APIUtils.GET(APIUtils.getAPI_URL() + url);
                if (response.status === 200) {
                    const data = response.data;
                    setClassroomName(data.name);
                    setGrades(data.grades);
                    setGrade(data.grade);
                    setMuteAudio(data.mute_audio);
                    setAssignStudentMethod(data.assign_student_method);
                    setAvailableSELActivities(data.enabled_SEL_content);
                    let stages = [];
                    let availableSELChoices = data.available_SEL_categories;
                    if (availableSELChoices === 'both') {
                        availableSELChoices = 'lesson';
                    } else if (availableSELChoices === 'activities_only') {
                        availableSELChoices = 'activity';
                    } else if (availableSELChoices === 'lessons_only') {
                        availableSELChoices = 'lesson';
                    }
                    setSELChoice(availableSELChoices);
                    if (data.educator_check_in) {
                        stages.push({
                            'stage': 'educator_check_in',
                            'details': response.data.educator_check_in_details
                        });
                    }
                    if (data.educator_setup) {
                        stages.push({
                            'stage': 'educator_setup',
                            'details': response.data.educator_setup_details
                        });
                    }
                    if (data.student_check_in) {
                        stages.push({
                            'stage': 'student_check_in',
                            'details': response.data.student_check_in_details
                        });
                    }
                    setSessionStages(stages);
                } else {
                    console.error('Error fetching basic classroom data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching basic classroom data:', error);
            } finally {
                setInitialLoading(false);
            }
        }
        fetchClassroomSetupData();
    }, []);

    const generateSELContent = (): JSX.Element | null => {
        if (SELChoice === 'lesson') {
            return (
                <Lessons
                    selectedStudent={assignedStudent}
                    selectedLessonId={selectedLessonId}
                    setSelectedLessonId={setSelectedLessonId}
                    setSELChoice={setSELChoice}
                    muteAudio={muteAudio}
                />
            );
        } else if (SELChoice === 'activity') {
            return (
                <ActivitiesOnly
                    availableActivities={availableSELActivities}
                    userState={userState}
                    setUserState={setUserState}
                />
            );
        } else {
            return (<CheckInComplete label={'Check-in'} />);
        }
    };

    if (initialLoading) {
        return (
            <Box
                sx={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <CircularProgress size={50} sx={{ color: 'white' }} />
                </motion.div>
            </Box>
        );
    }

    return (
        <SessionContext.Provider value={{
            grades,
            grade,
            uuid,
            sessionID,
            setSessionID,
            sessionStages,
            setSessionStages,
            assign_student_method,
            setAssignedStudent,
            assignedStudent,
            setSELChoice,
            muteAudio,
        }}>
            <Box
                sx={{
                    height: '100vh',
                    width: '100vw',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: { xs: 2, sm: 3, md: 4 },
                    boxSizing: 'border-box',
                }}
            >
                {/* Decorative background elements */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: '-15%',
                        right: '-10%',
                        width: { xs: '200px', md: '350px' },
                        height: { xs: '200px', md: '350px' },
                        borderRadius: '50%',
                        background: alpha('#fff', 0.05),
                        pointerEvents: 'none',
                    }}
                />
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '-10%',
                        left: '-5%',
                        width: { xs: '150px', md: '250px' },
                        height: { xs: '150px', md: '250px' },
                        borderRadius: '50%',
                        background: alpha('#00a2e8', 0.03),
                        pointerEvents: 'none',
                    }}
                />

                {/* Main panel */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            maxWidth: { xs: '100%', sm: '90%', md: '1100px', lg: '1300px' },
                            height: { xs: '100%', sm: 'auto', md: '75vh' },
                            maxHeight: { xs: '100%', sm: '85vh', md: '75vh' },
                            minHeight: { sm: '400px', md: '450px' },
                            background: alpha('#fff', 0.95),
                            backdropFilter: 'blur(20px)',
                            borderRadius: { xs: '16px', sm: '24px' },
                            boxShadow: `
                                0 4px 6px -1px ${alpha('#000', 0.1)},
                                0 10px 15px -3px ${alpha('#000', 0.1)},
                                0 25px 50px -12px ${alpha('#000', 0.25)}
                            `,
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        {/* Card inner content */}
                        <Box
                            sx={{
                                flex: 1,
                                overflow: 'auto',
                                p: { xs: 2, sm: 2.5, md: 3 },
                                display: 'flex',
                                flexDirection: 'column',
                                '&::-webkit-scrollbar': {
                                    width: '5px',
                                },
                                '&::-webkit-scrollbar-track': {
                                    background: 'transparent',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    background: alpha('#667eea', 0.2),
                                    borderRadius: '3px',
                                },
                            }}
                        >
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`stage-${curStage}-${SELChoice}`}
                                    variants={fadeVariantFast}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    style={{
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        minHeight: 0,
                                    }}
                                >
                                    {curStage >= sessionStages.length ?
                                        generateSELContent()
                                        :
                                        <StageComponentGenerator
                                            key={sessionStages[curStage].id || curStage}
                                            stageMetaData={sessionStages[curStage]}
                                            setCurStage={setCurStage}
                                            uuid={uuid}
                                            assign_student_method={assign_student_method}
                                            classroomName={classroomName}
                                            isSmallScreen={false}
                                            curStage={curStage}
                                            isPreview={isPreview}
                                        />
                                    }
                                </motion.div>
                            </AnimatePresence>
                        </Box>
                    </Box>
                </motion.div>
            </Box>
        </SessionContext.Provider>
    );
};

export default SessionParent;
