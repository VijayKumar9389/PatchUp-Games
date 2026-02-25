import { Box } from "@mui/material";
import React from "react";
import ImageRevealGame from "../../components/activities/ImageRevealGame";
import CountingGame from "../../components/activities/countingGame";
import GroundingGame from "../../components/activities/groundGameNoClick";
import Drawing from "../../components/activities/Drawing";
import Coloring from "../../components/activities/Coloring/ColoringActivity";
import AnimatedPicture from "../../components/activities/AnimatedPicture/AnimatedPicture";
import InfinityBreathing from "../../components/activities/InfinityBreathing";
import BreathingSquare from "../../components/activities/BreathingSquare/breathing_square";
import ScratchGame from "../../components/activities/ScratchOff";
import CircleBreakerContainer from "../../components/activities/CircleBreaker";

interface ActivityRendererProps {
    activity: string;
    completeActivity: () => void;
    handleSpeak: (text: string) => void;
}
//////////////////// FOR LESSONS ///////////////////////////////
const ActivityRenderer: React.FC<ActivityRendererProps> = ({ activity, completeActivity, handleSpeak }) => {
    const onSend = (
        text: string,
        userSelected: boolean = false,
        activityName: string = '',
    ) => {
        completeActivity();
    };

    const renderActivityComponent = () => {
        switch (activity) {
            case "breathing_square":
                return <BreathingSquare onSend={onSend} />;
            case "54321_grounding":
                return <GroundingGame onSend={onSend} />;
            case "counting_basic":
                return <CountingGame onSend={onSend} />;
            case "drawing":
                return <Drawing onSend={onSend} />;
            case "colouring":
                return <Coloring onSend={onSend} />;
            case "image_reveal_game":
                return <ImageRevealGame onSend={onSend} />;
            case "animated_picture":
                return <AnimatedPicture onSend={onSend} />;
            case "lazy_8":
                return <InfinityBreathing onSend={onSend} />;
            case "star_finder":
                return <ScratchGame onSend={onSend} />;

            case "bubble_popper":
                return <CircleBreakerContainer onSend={onSend} />;
            default:
                return <CountingGame onSend={onSend} />;
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                flex: 1,
                minHeight: 0,
                boxSizing: 'border-box',
                overflow: 'hidden',
            }}
        >
            {renderActivityComponent()}
        </Box>
    );
};

export default ActivityRenderer;