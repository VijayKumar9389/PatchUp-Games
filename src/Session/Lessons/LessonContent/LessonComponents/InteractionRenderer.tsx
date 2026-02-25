import { Box, Button, alpha } from "@mui/material";
import MultiSelectActivity from "../Activities/MultiSelect";
import MultipleChoiceActivity from '../Activities/MultipleChoice';
import YesNoActivity from '../Activities/YesOrNo';
import ActivityRenderer from '../ActivityRenderer';
import MinimalDndKitBuckets from '../Activities/DnDBuckets';
import DnDMatch from '../Activities/DnDMatch';
import FillBlank from '../Activities/FillInTheBlank';

type Props = {
    interaction: any;
    activityCompleted: boolean;
    setActivityCompleted: (v: boolean) => void;
    completeActivity: (...args: any[]) => any;
    handleSpeak: (t: string) => void;
    changePage: (delta: number) => void;
    pageIndex: number;
    lastPageIndex: number;
    handleCompleteLesson: () => void;
};

const buttonStyle = {
    borderRadius: "14px",
    border: "2px solid #667eea",
    px: 3,
    py: 1,
    fontWeight: 600,
    textTransform: 'none' as const,
    backgroundColor: 'white',
    color: '#667eea',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor: alpha('#667eea', 0.04),
        borderColor: '#5a6fd6',
        boxShadow: `0 4px 12px ${alpha('#667eea', 0.15)}`,
        transform: 'translateY(-1px)',
    },
    '&:disabled': {
        backgroundColor: '#f7fafc',
        color: '#a0aec0',
        borderColor: '#e2e8f0',
        boxShadow: 'none',
    },
};

export function InteractionRenderer({
    interaction,
    activityCompleted,
    setActivityCompleted,
    completeActivity,
    handleSpeak,
}: Omit<Props, 'changePage' | 'pageIndex' | 'lastPageIndex' | 'handleCompleteLesson'>) {
    return (
        <Box sx={{ width: "100%" }}>
            {interaction.type === "mc" && (
                <MultipleChoiceActivity
                    {...interaction}
                    setActivityCompleted={setActivityCompleted}
                />
            )}

            {interaction.type === "yesno" && (
                <YesNoActivity
                    {...interaction}
                    setActivityCompleted={setActivityCompleted}
                />
            )}

            {interaction.type === "ms" && (
                <MultiSelectActivity
                    {...interaction}
                    setActivityCompleted={setActivityCompleted}
                />
            )}

            {interaction.type === "activity" && (
                <ActivityRenderer
                    activity={interaction.activity}
                    completeActivity={completeActivity}
                    handleSpeak={handleSpeak}
                />
            )}

            {interaction.type === "dndBucket" && (
                <MinimalDndKitBuckets
                    {...interaction}
                    setActivityCompleted={setActivityCompleted}
                />
            )}

            {interaction.type === "dndMatch" && (
                <DnDMatch
                    {...interaction}
                    setActivityCompleted={setActivityCompleted}
                />
            )}

            {interaction.type === "fillBlank" && (
                <FillBlank
                    {...interaction}
                    setActivityCompleted={setActivityCompleted}
                />
            )}
        </Box>
    );
}

export function NavigationButtons({
    canNavigate,
    changePage,
    pageIndex,
    lastPageIndex,
    handleCompleteLesson,
}: {
    canNavigate: boolean;
    changePage: (delta: number) => void;
    pageIndex: number;
    lastPageIndex: number;
    handleCompleteLesson: () => void;
}) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                pt: 2,
                flexShrink: 0,
                minHeight: 52, // Reserve space even when buttons are hidden
            }}
        >
            <Box sx={{ visibility: canNavigate ? 'visible' : 'hidden' }}>
                <Button
                    onClick={() => changePage(-1)}
                    disabled={pageIndex === 0}
                    variant="contained"
                    sx={buttonStyle}
                >
                    Back
                </Button>
            </Box>

            <Box sx={{ visibility: canNavigate ? 'visible' : 'hidden' }}>
                <Button
                    variant="contained"
                    sx={buttonStyle}
                    onClick={
                        pageIndex === lastPageIndex
                            ? handleCompleteLesson
                            : () => changePage(1)
                    }
                >
                    {pageIndex === lastPageIndex ? "Finish" : "Next"}
                </Button>
            </Box>
        </Box>
    );
}
