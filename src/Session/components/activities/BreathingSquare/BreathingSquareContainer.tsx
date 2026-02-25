import React, { useState } from 'react';
import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { speakWithPolly } from '../../polly';
import FadingText from '../components/FadingText';
import { motion } from 'framer-motion';
import { fadeVariant } from '../../../../utils/helpers';
import BreathingSquare from './breathing_square';
interface GameProps {
    onSend: (text: string, userSelected: boolean, activity: string) => void;
    showInstructions?: boolean;
}


const BreathingSquareContainer: React.FC<GameProps> = ({ onSend, showInstructions = false }) => {
    const [started, setStarted] = useState<boolean>(false);
    let messages = [];
    if (showInstructions) {
        messages = [
            'Let’s take a moment to slow down and reset.',
            'This simple breathing exercise can help you feel more calm and in control.',
            'Trace the square and follow along with the instructions.'
        ];
    }

    return (
        <Box
        // display="flex"
        // flexDirection="column"
        // alignItems="center"
        // justifyContent="center"
        // height="100%"
        // boxSizing={'border-box'}
        // p={2}
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
                    <BreathingSquare onSend={onSend} />
                </motion.div>
            )}

        </Box>
    );
};

export default BreathingSquareContainer;
