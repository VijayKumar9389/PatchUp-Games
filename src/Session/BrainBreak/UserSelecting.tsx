import { useState, useEffect, useRef, useCallback, useMemo, useContext } from "react";
import { Box, Paper } from "@mui/material";
import Message from "../components/Message";
import { motion } from 'framer-motion';
import UserOptions from "../components/user-interaction/userOptions";
import { speakWithPolly } from "../components/polly";
import { SessionContext } from "..";
interface Message {
    id: number;
    text: string;
    role: "user" | "assistant";
}
interface UserSelectingProps {
    messages: Message[];
    isLoading: boolean;
    curUserOptions: string[];
    selectActivity: (activity: string) => void;
}
const UserSelecting: React.FC<UserSelectingProps> = ({ messages, isLoading, curUserOptions, selectActivity }) => {
    const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
    const { muteAudio } = useContext(SessionContext);
    const handleSpeak = (text: string) => {
        if (isSpeaking) return;
        speakWithPolly(text, isSpeaking, setIsSpeaking);
    };
    const latestNonUserMessage = useMemo(() => {
        return [...messages].reverse().find((msg) => msg.role !== 'user');
    }, [messages]);

    const onSelectedOption = async (option: string) => {
        selectActivity(option);
    }
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                overflowY: 'auto',
                height: '100%',
                padding: 1,
                marginBottom: 0,
                maxWidth: '100%',
                minWidth: 0,        // ✅ important for flex layouts
            }}
        >
            <Box minHeight={'120px'}>
                {latestNonUserMessage && (
                    <motion.div
                        key={latestNonUserMessage.id} // ensure re-animation on change
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <Paper
                            sx={{
                                maxWidth: '100%',                   // keep paper inside
                                p: 1.5,
                                borderRadius: 4,
                                backgroundColor: 'white',
                                overflowWrap: 'anywhere',          // ✅ wrap long words/URLs
                                wordBreak: 'break-word',
                            }}
                        >
                            <Message
                                message={latestNonUserMessage}
                                handleSpeak={handleSpeak}
                                muteAudio={muteAudio}
                            />
                        </Paper>
                    </motion.div>
                )}
            </Box>
            {curUserOptions.length > 0 && (
                <UserOptions
                    curUserOptions={curUserOptions}
                    onSelectedOption={onSelectedOption}
                    disabled={isLoading}
                    isLoading={isLoading}
                    handleSpeak={handleSpeak}
                    muteAudio={muteAudio}
                />
            )}

        </Box>
    );
};

export default UserSelecting;
