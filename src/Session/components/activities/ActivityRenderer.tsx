import { Paper } from "@mui/material";
import React, { useEffect, useRef } from "react";
import ImageRevealGame from "./ImageRevealGame";
import CountingGame from "./countingGame";
import GroundingGame from "./groundGameNoClick";
import Drawing from "./Drawing";
import ColouringContainer from "./Coloring";
import AnimatedPicture from "./AnimatedPicture/AnimatedPicture";
import InfinityBreathing from "./InfinityBreathing";
import BreathingSquareContainer from "./BreathingSquare/BreathingSquareContainer";
import ScratchGame from "./ScratchOff";
import CircleBreakerContainer from "./CircleBreaker";

interface ActivityRendererProps {
    activity: string;
    setUserState: React.Dispatch<React.SetStateAction<string>>;
    sendActivity: (text: string, userSelected: boolean, activty: string, duration: number) => void;
}
// ACTIVITY ONLY RENDERER (NOT USED IN LESSONS)
const ActivityRenderer: React.FC<ActivityRendererProps> = ({ activity, setUserState, sendActivity }) => {
    const startTimeRef = useRef<number | null>(null);
    // Start timer on mount
    useEffect(() => {
        startTimeRef.current = Date.now();
        return () => {
            // On unmount, calculate time spent
            if (startTimeRef.current) {
                const timeSpentMs = Date.now() - startTimeRef.current;
            }
        };
    }, [activity]);

    const onSend = (
        text: string,
        userSelected: boolean = false,
        activityName: string = '',
    ) => {
        const timeSpentMs =
            startTimeRef.current !== null ? Date.now() - startTimeRef.current : 0;

        sendActivity(text, userSelected, activityName || activity, timeSpentMs);
    };

    const renderActivityComponent = () => {
        switch (activity) {
            case "breathing_square":
                return <BreathingSquareContainer onSend={onSend} showInstructions={false} />;
            case "54321_grounding":
                return <GroundingGame onSend={onSend} showInstructions={true} />;
            case "counting_basic":
                return <CountingGame onSend={onSend} showInstructions={true} />;
            case "drawing":
                return <Drawing onSend={onSend} />;
            case "colouring":
                return <ColouringContainer onSend={onSend} showInstructions={true} />;
            case "image_reveal_game":
                return <ImageRevealGame onSend={onSend} />;
            case "animated_picture":
                return <AnimatedPicture onSend={onSend} />;
            case "lazy_8":
                return <InfinityBreathing onSend={onSend} showInstructions={true} />;
            case "star_finder":
                return <ScratchGame onSend={onSend} showInstructions={true} />;

            case "bubble_popper":
                return <CircleBreakerContainer onSend={onSend} showInstructions={true} />;
            default:
                return <CountingGame onSend={onSend} showInstructions={true} />;
        }
    };

    return (
        <Paper
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                height: '100%',
            }}
        >
            {renderActivityComponent()}
        </Paper>
    );
};

export default ActivityRenderer;