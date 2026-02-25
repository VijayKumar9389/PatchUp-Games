import React, { useState } from 'react';
import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { speakWithPolly } from '../polly';
import FadingText from './components/FadingText';
import { motion } from 'framer-motion';
import { fadeVariant } from '../../../utils/helpers';
interface GameProps {
    onSend: (text: string, userSelected: boolean, activity: string) => void;
    showInstructions?: boolean;
}


const GroundingGame: React.FC<GameProps> = ({ onSend, showInstructions = false }) => {
    const columns = [5, 4, 3, 2, 1];
    const [stage, setStage] = useState<number>(0);
    const headings = ['List 5 things you can see!', 'List 4 things you can feel or touch!', 'List 3 things you can hear!', 'List 2 things you can smell!', 'List 1 thing you can taste!']
    const [values, setValues] = useState<string[]>(['', '', '', '', ''])
    const labels = ['Item', 'Object', 'Sound', 'Scent', 'Taste']
    const [started, setStarted] = useState<boolean>(false);
    function nextStep() {
        if (stage === 4) {
            onSend('Exercise Completed!', false, 'breathing_square');
        } else {
            // speakWithPolly(headings[stage + 1], false, () => { });
            setValues(['', '', '', '', ''])
            setStage(prev => prev + 1);
        }
    }
    let messages = [];
    if (showInstructions) {
        messages = [
            'Let’s try a quick game to help you feel more calm and in control.',
            'This game can help settle your mind when things feel overwhelming.',
            'Follow along with the instructions and fill in the blanks.',
        ];
    }
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={1}
        >
            <FadingText
                messages={messages}
                stayOnLastMessage={false}
                interval={4000}
                onCompleteCycle={() => {
                    setStarted(true);
                }
                }
            />
            {started && (
                <motion.div
                    key="grounding-game"
                    variants={fadeVariant}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    style={{ width: '100%' }}
                >
                    <Stack spacing={4} alignItems="center" sx={{ p: 2 }}>
                        <Typography variant="h5">{headings[stage]}</Typography>

                        <Stack spacing={2}>
                            {Array.from({ length: columns[stage] }).map((_, rowIndex) => (
                                <Box
                                    key={rowIndex}
                                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                                >
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        size='small'
                                        autoComplete="off"
                                        placeholder={labels[stage] + ' ' + (rowIndex + 1)}
                                        value={values[rowIndex]}
                                        onChange={(e) => {
                                            const newValues = [...values];
                                            newValues[rowIndex] = e.target.value;
                                            setValues(newValues);
                                        }}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderColor: values[rowIndex] ? '#81c784' : undefined,
                                            },
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderColor: values[rowIndex] ? '#81c784' : undefined,
                                            },
                                        }}
                                    />
                                </Box>
                            ))}

                            <Button
                                variant="contained"
                                onClick={nextStep}
                                disabled={values.filter(val => val.trim() !== '').length < 5 - stage}
                            >
                                Done!
                            </Button>
                        </Stack>
                    </Stack>
                </motion.div>
            )}

        </Box>
    );
};

export default GroundingGame;
