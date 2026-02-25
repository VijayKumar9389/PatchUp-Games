import React, { useState } from 'react';
import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { speakWithPolly } from '../polly';
interface GroundingGameProps {
    onSend: (text: string, userSelected: boolean, activity: string) => void;
}


const GroundingGame: React.FC<GroundingGameProps> = ({ onSend }) => {
    const columns = [5, 4, 3, 2, 1];
    const [stage, setStage] = useState<number>(0);
    const headings = ['List 5 things you can see!', 'List 4 things you can feel or touch!', 'List 3 things you can hear!', 'List 2 things you can smell!', 'List 1 thing you can taste!']
    const [completeArray, setCompleteArray] = useState<number[]>([0, 0, 0, 0, 0])
    const [values, setValues] = useState<string[]>(['', '', '', '', ''])
    const labels = ['Item', 'Object', 'Sound', 'Scent', 'Taste']
    function markAnswerComplete(idx: number) {
        setCompleteArray(prev => {
            const updated = [...prev];
            updated[idx] = 1;
            return updated;
        });
    }
    function nextStep() {
        if (stage === 4) {
            onSend('Exercise Completed!', false, 'breathing_square');
        } else {
            speakWithPolly(headings[stage + 1], false, () => { });
            setCompleteArray([0, 0, 0, 0, 0])
            setValues(['', '', '', '', ''])
            setStage(prev => prev + 1);
        }
    }

    return (
        <Stack spacing={4} alignItems="center" sx={{ p: 4 }}>
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
                                    borderColor: completeArray[rowIndex] ? '#81c784' : undefined,
                                    borderWidth: 2,
                                },
                                '& .MuiOutlinedInput-notchedOutline': {
                                    borderColor: completeArray[rowIndex] ? '#81c784' : undefined,
                                },
                            }}
                        />
                        <IconButton
                            color={completeArray[rowIndex] ? 'success' : "primary"}
                            onClick={() => markAnswerComplete(rowIndex)}
                            disabled={values[rowIndex] === ''}
                        >
                            <CheckIcon />
                        </IconButton>
                    </Box>
                ))}

                <Button
                    variant="contained"
                    onClick={nextStep}
                    disabled={completeArray.reduce((sum, val) => sum + val, 0) < 5 - stage}
                >
                    Done!
                </Button>
            </Stack>
        </Stack>

    );
};

export default GroundingGame;
