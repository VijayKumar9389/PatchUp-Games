import React, { useState } from 'react';
import { Box } from '@mui/material';

import FadingText from '../components/FadingText';
import { motion } from 'framer-motion';
import { fadeVariant } from '../../../../utils/helpers';


interface GameProps {
    onSend: (text: string, userSelected: boolean, activity: string) => void;
}


const BoxBreakerGame: React.FC<GameProps> = ({ onSend }) => {
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
                messages={[
                    'When we feel overwhelmed, it can be helpful to take a break and play a game.',
                    'Let’s relax for a bit with a quick game.',
                    'Break the boxes until you find the star!'
                ]}
                stayOnLastMessage={true}
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
                    {/* <ScratchCard onSend={onSend} /> */}
                </motion.div>
            )}

        </Box>
    );
};

export default BoxBreakerGame;
