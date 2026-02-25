import React, { useState } from 'react';
import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { speakWithPolly } from '../../polly';
import FadingText from '../components/FadingText';
import { motion } from 'framer-motion';
import { fadeVariant } from '../../../../utils/helpers';
import ScratchCard from './ScratchOffGame';

interface GameProps {
    onSend: (text: string, userSelected: boolean, activity: string) => void;
    showInstructions?: boolean;
}


const ScratchGame: React.FC<GameProps> = ({ onSend, showInstructions = false }) => {
    const [started, setStarted] = useState<boolean>(false);
    const [finished, setFinished] = useState<boolean>(false);
    const messages = showInstructions ? [
        'When we feel overwhelmed, it can be helpful to take a break and play a game.',
        'Let’s relax for a bit with a quick game.',
        'Find All 5 stars!'
    ] : ['Find All 5 stars!'];
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={2}
        >
            {!finished ? <FadingText
                messages={messages}
                stayOnLastMessage={true}
                interval={4000}
                onCompleteCycle={() => {
                    setStarted(true);
                }
                }
            /> :
                <Typography variant="h6" color="primary" gutterBottom>
                    Great job! You found all the stars!
                </Typography>}
            {started && (
                <motion.div
                    key="grounding-game"
                    variants={fadeVariant}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    style={{ width: '100%', alignItems: 'center', display: 'flex', justifyContent: 'center' }}

                >
                    <ScratchCard onSend={onSend} setFinished={setFinished} />
                </motion.div>
            )}

        </Box>
    );
};

export default ScratchGame;
