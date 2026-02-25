import React, { useEffect, useState, createContext } from "react";
import { Box } from "@mui/material";
import { motion, AnimatePresence } from 'framer-motion';
import BrainBreak from "./BrainBreak";
export const ChatContext = createContext(null);
import { beginSessionFallback } from "./FallBackUtils";

const ActivitiesOnly: React.FC<{
    availableActivities: string[],
    userState: string,
    setUserState: React.Dispatch<React.SetStateAction<string>>,
}> = ({ availableActivities, userState, setUserState }) => {

    const [sessionUUID, setSessionUUID] = useState<string | null>(null);
    const [messages, setMessages] = useState<{ id: number; text: string; role: "user" | "assistant" }[]>([]);
    const [curUserOptions, setCurUserOptions] = useState<string[]>([]);
    const fadeVariant = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
    };

    const useHardUnloadWarning = () => {
        useEffect(() => {
            const handleBeforeUnload = (e: BeforeUnloadEvent) => {
                e.preventDefault();
                e.returnValue = ''; // Required for most browsers
            };
            window.addEventListener('beforeunload', handleBeforeUnload);
            return () => {
                window.removeEventListener('beforeunload', handleBeforeUnload);
            };
        }, []);
    };

    async function beginSession() { // could maybe move down to chat.tsx and pass setPreChatCompleted instead
        const fakeData = beginSessionFallback(availableActivities);
        setSessionUUID(fakeData.session_uuid);
        setMessages((prevMessages) => [
            ...prevMessages,
            { id: Date.now(), text: fakeData.initial_message, role: "assistant" },
        ]);
        setCurUserOptions(fakeData.options);
    }
    useEffect(() => {
        setUserState("options");
        beginSession();
    }, []);
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            width: '100%',
            height: '100%',
        }}
        >
            <AnimatePresence mode="wait">
                <motion.div
                    key="chat"
                    variants={fadeVariant}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                >
                    <BrainBreak
                        availableActivities={availableActivities}
                        messages={messages}
                        setMessages={setMessages}
                        sessionUUID={sessionUUID}
                        curUserOptions={curUserOptions}
                        setCurUserOptions={setCurUserOptions}
                        userState={userState}
                        setUserState={setUserState}
                    />

                </motion.div>

            </AnimatePresence>
        </Box>

    );
};

export default ActivitiesOnly;
