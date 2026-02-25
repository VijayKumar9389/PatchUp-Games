// this will be fallback front end instructions in case an API fails. 
// we won't get data, but we still want to have a working UI
// the UI can display everything, just need to simulate a successful API response.

export const beginSessionFallback = (availableActivities: string[]) => {
    {
        return {
            session_uuid: 'fallback-session-uuid',
            "initial_message": "Hi there! Let's do a quick activity together. Choose which one you'd like to try.",
            "options": availableActivities,
            "mute_audio": true,
        };
    }
};

export const startActivityFallback = (

) => {
    return 0; // return a dummy activity ID
}

export const completeActivityFallback = (
    availableActivities: string[]
) => {
    return {
        "text": "Here are some activities you can try:",
        "options": availableActivities
    };
};
