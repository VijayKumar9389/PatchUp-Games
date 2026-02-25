import React, { useState, useEffect, useContext } from "react";
import { Typography, IconButton } from "@mui/material";

import VolumeUpIcon from '@mui/icons-material/VolumeUp';
interface MessageProps {
    id: number;
    text: string;
    role: "user" | "assistant";
}

const Message: React.FC<{
    message: MessageProps;
    handleSpeak: (text: string) => void;
    muteAudio: boolean;
}> = ({ message, handleSpeak, muteAudio }) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
    const delay = 15;

    useEffect(() => {
        setCurrentText('');
        setCurrentIndex(0);
    }, [message.text, message.role]);

    useEffect(() => {
        if (message.role === "user") {
            setCurrentText(message.text);
            return;
        } else {
            if (currentIndex < message.text.length) {
                const timeout = setTimeout(() => {
                    setCurrentText(prevText => prevText + message.text[currentIndex]);
                    setCurrentIndex(prevIndex => prevIndex + 1);

                }, delay);

                return () => clearTimeout(timeout);
            }
        }
    }, [currentIndex, delay, message.text]);

    return (
        <Typography variant="h5" sx={{ color: message.role === "user" ? "white" : "black" }}>
            {currentText}
            {currentText === message.text && !muteAudio &&
                <IconButton
                    onClick={() => handleSpeak(message.text)}
                    sx={{
                        color: "black",
                        flexShrink: 0,
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        "&:hover": {
                            backgroundColor: "rgba(255,255,255,0.15)",
                        },
                    }}
                >
                    <VolumeUpIcon />
                </IconButton>
            }
        </Typography>
    )

};

export default Message;