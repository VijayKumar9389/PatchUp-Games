import React, { useState } from 'react';
import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { speakWithPolly } from '../../polly';
import FadingText from '../components/FadingText';
import { motion } from 'framer-motion';
import { fadeVariant } from '../../../../utils/helpers';
import Coloring from './ColoringActivity';
interface GameProps {
    onSend: (text: string, userSelected: boolean, activity: string) => void;
    showInstructions?: boolean;
}


const ColouringContainer: React.FC<GameProps> = ({ onSend, showInstructions = false }) => {
    let messages = [];
    if (showInstructions) {
        messages = [
            'Colouring can be a great way to relax and express yourself.',
            'Spend some time adding colour to this picture.',
            'Once you are done, click the "Done" button.',
        ];
    }
    const [started, setStarted] = useState<boolean>(false);


    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={2}
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
                    <Coloring onSend={onSend} />
                </motion.div>
            )}

        </Box>
    );
};

export default ColouringContainer;
