import React, { useState } from 'react';
import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { speakWithPolly } from '../../polly';
import FadingText from '../components/FadingText';
import { motion } from 'framer-motion';
import { fadeVariant } from '../../../../utils/helpers';
import CircleGridGame from './CircleBreaker';

interface GameProps {
    onSend: (text: string, userSelected: boolean, activity: string) => void;
    showInstructions?: boolean;
}


const CircleBreakerContainer: React.FC<GameProps> = ({ onSend, showInstructions = false }) => {
    const [started, setStarted] = useState<boolean>(false);
    const [finished, setFinished] = useState<boolean>(false);
    const messages = showInstructions ? [
        'When we feel overwhelmed, it can be helpful to take a break and play a game.',
        'Let’s relax for a bit with a quick game.',
        'Divide all the circles!'
    ] : ['Divide all the circles!'];
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={2}

            height="100%"
            width={'100%'}
            boxSizing={'border-box'}
        // sx={{ position: 'relative' }} // <-- Add relative positioning
        >
            <Box
                display="flex"
                alignItems="center"
                flexDirection={'row'}
                justifyContent={started ? "space-between" : "center"}
                gap={2}
                sx={{ width: '100%', flexWrap: 'nowrap', mb: 1 }}
            >
                {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}> */}
                {!finished ? (

                    <FadingText
                        messages={messages}
                        stayOnLastMessage={true}
                        interval={4000}
                        onCompleteCycle={() => setStarted(true)}
                    />
                ) : (
                    <Typography variant="h6" color="primary" gutterBottom>
                        Great job! You completed the game!
                    </Typography>
                )}
                {/* </Box> */}

                {started && (
                    <Button sx={{ mb: 1 }} variant="contained" size="small" onClick={() => onSend('Circle game completed!', false, 'circle_breaker')} color="primary">
                        Skip
                    </Button>
                )}
            </Box>

            {started && (
                <motion.div
                    key="grounding-game"
                    variants={fadeVariant}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    style={{
                        width: '100%',
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <CircleGridGame
                        onSend={onSend}
                        setFinished={setFinished}
                    />
                </motion.div>
            )}
        </Box>

    );
};

export default CircleBreakerContainer;
