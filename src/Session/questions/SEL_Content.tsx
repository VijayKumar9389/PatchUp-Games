import React, { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";
import { SessionContext } from "../index";

// Maps backend content value to available options
const CONTENT_OPTION_MAP = {
    activities_only: ["activity"],
    lessons_only: ["lesson"],
    both: ["activity", "lesson"],
};

const SEL_OPTIONS = [
    {
        key: "activity",
        label: "Activity",
    },
    {
        key: "lesson",
        label: "Lesson",
    },
];

interface SELContentProps {
    setAnswers: React.Dispatch<React.SetStateAction<any>>;
    setCurQuestionIdx: React.Dispatch<React.SetStateAction<number>>;
    content: 'activities_only' | 'lessons_only' | 'both';
}

const SEL_Content: React.FC<SELContentProps> = ({ setAnswers, setCurQuestionIdx, content }) => {
    const { setSELChoice } = useContext(SessionContext);

    // Decide which SEL options to show
    const allowedKeys = CONTENT_OPTION_MAP[content] || [];
    const allowedOptions = SEL_OPTIONS.filter(opt => allowedKeys.includes(opt.key));

    // Handlers
    const handleSelect = (key: string) => {
        setCurQuestionIdx((prev) => prev + 1);
        setAnswers((prev: any) => ({
            ...prev,
            SEL_content: key,
        }));
        setSELChoice(key);
    };

    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                mb={3}
            >
                <Typography variant="h5" sx={{ color: 'white' }}>
                    Activity or Lesson
                </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={2}>
                {allowedOptions.map(opt => (
                    <Box
                        key={opt.key}
                        onClick={() => handleSelect(opt.key)}
                        sx={{
                            flex: 1,
                            mx: 1,
                            cursor: 'pointer',
                            textAlign: 'center',
                            alignContent: 'center',
                            borderRadius: 5,
                            border: '2px solid white',
                            backgroundColor: '#00A2E8',
                            padding: 2,
                            '&:hover': {
                                backgroundColor: '#007CB0',
                            },
                            '&:active': {
                                backgroundColor: 'rgba(0, 0, 0, 0.08)',
                            },
                        }}
                    >
                        <Typography variant="h6" fontWeight="bold" sx={{ color: 'white' }}>
                            {opt.label}
                        </Typography>
                    </Box>
                ))}
                {/* Always show "Check-in Only" button */}
                <Box
                    onClick={() => handleSelect('check-in')}
                    sx={{
                        flex: 1,
                        mx: 1,
                        cursor: 'pointer',
                        textAlign: 'center',
                        borderRadius: 5,
                        border: '2px solid white',
                        backgroundColor: '#00A2E8',
                        padding: 2,
                        '&:hover': {
                            backgroundColor: '#007CB0',
                        },
                        '&:active': {
                            backgroundColor: 'rgba(0, 0, 0, 0.08)',
                        },
                    }}
                >
                    <Typography
                        sx={{ color: 'white' }}
                        variant="h6"
                    >
                        Check-in Only
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    justifyContent: "center",
                    display: "flex",
                }}
            >
                <Button
                    variant="contained"
                    sx={{
                        borderRadius: 5,
                        border: '2px solid white',
                        fontSize: "1rem",
                        backgroundColor: 'primary.main',
                        '&:hover': { backgroundColor: 'primary.dark' },
                    }}
                    onClick={() => setCurQuestionIdx((prev: number) => prev + 1)}
                >
                    Skip
                </Button>
            </Box>

        </>
    );
};

export default SEL_Content;
