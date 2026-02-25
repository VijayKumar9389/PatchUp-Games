import React from "react";
import UserSelecting from "./UserSelecting";
import { Box } from "@mui/material";
import ActivityRenderer from "../components/activities/ActivityRenderer";
import { APIUtils } from "../../utils/apiUtils";
import { completeActivityFallback } from "../FallBackUtils";

interface BreainBreakProps {
    availableActivities: string[];
    messages: { id: number; text: string; role: "user" | "assistant" }[];
    setMessages: React.Dispatch<React.SetStateAction<{ id: number; text: string; role: "user" | "assistant" }[]>>;
    sessionUUID: string | null;
    curUserOptions: string[];
    setCurUserOptions: React.Dispatch<React.SetStateAction<string[]>>;
    userState: string;
    setUserState: React.Dispatch<React.SetStateAction<string>>;
}

const BrainBreak: React.FC<BreainBreakProps> = ({
    availableActivities,
    messages,
    setMessages,
    sessionUUID,
    curUserOptions,
    setCurUserOptions,
    userState,
    setUserState

}) => {
    // const [userState, setUserState] = React.useState<string>("");
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [curActivity, setCurActivity] = React.useState<string>('');
    const [curActivityID, setCurActivityID] = React.useState<number>(0);
    const selectActivity = async (activity: string) => {
        setCurActivity(activity);
        setUserState('activity');
        try {
            const response = await APIUtils.POST(
                APIUtils.getAPI_URL() + 'api/session/start_activity/',
                {
                    session_uuid: sessionUUID,
                    activity: activity
                }
            );
            if (response.status === 200) {
                setCurActivityID(response.data);
            }
        } catch (error) {
            // const fakeData = startActivityFallback();
            console.error(error);
        }
    }

    const sendActivity = async (text: string, userSelected: boolean = false, activity: string = '', duration: number = 0) => {
        setIsLoading(true);
        // setIsSpeaking(true);
        setMessages((prevMessages) => [
            ...prevMessages,
            { id: Date.now(), text, role: "user" },
        ]);
        try {
            let message;
            if (userSelected) {
                message = {
                    'text': text,
                    'type': 'option_selected'
                }
            }
            else if (activity) {
                message = {
                    'text': 'user completed: ' + activity,
                    'type': 'activity_completed',
                    'activity': activity,

                }
            }
            else {
                message = {
                    'text': text,
                    'type': 'text'
                }
            }

            const fakeData = completeActivityFallback(availableActivities);
            setMessages((prevMessages) => [
                ...prevMessages,
                { id: Date.now(), text: fakeData.text, role: "assistant" },
            ]);
            setCurUserOptions(fakeData.options);
            setCurActivity('');
            setUserState('options');
        } finally {

            setIsLoading(false);

        }
    }
    return (
        <Box id='Brainbreak container' sx={{
            minHeight: userState == 'activity' ? '3vh' : '25vh',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            // position: 'relative',
            width: '100%',
            minWidth: 0,
            boxSizing: 'border-box',
        }}>
            {userState === 'activity' ? (
                <ActivityRenderer
                    activity={curActivity}
                    setUserState={setUserState}
                    sendActivity={sendActivity}
                />
            ) : (
                <UserSelecting
                    messages={messages}
                    isLoading={isLoading}
                    curUserOptions={curUserOptions}
                    selectActivity={selectActivity}
                />
            )}
        </Box>
    );
};

export default BrainBreak;
