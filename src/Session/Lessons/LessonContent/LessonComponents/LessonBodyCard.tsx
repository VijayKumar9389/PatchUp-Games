import { Box, IconButton, Typography, alpha } from "@mui/material";
import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import { useDensity } from "../../../../hooks/useDensity";

type Props = {
    title?: string;
    body: string;
    muteAudio: boolean;
    handleSpeak: (text: string) => void;
    centerOnDesktop?: boolean;
};

export function LessonBodyCard({
    title,
    body,
    muteAudio,
    handleSpeak,
    centerOnDesktop = true,
}: Props) {
    const speakText =
        title && body ? `${title}. ${body}` : title || body || "";
    const density = useDensity();

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                p: { xs: 2, sm: 2.5 },
                backgroundColor: "white",
                borderRadius: "16px",
                boxShadow: "none",
                border: "1px solid",
                borderColor: alpha("#667eea", 0.08),
            }}
        >
            {/* Text Content */}
            <Typography
                sx={{
                    flex: 1,
                    whiteSpace: "pre-line",
                    maxWidth: centerOnDesktop ? "65ch" : "none",
                    mx: centerOnDesktop ? { xs: 0, md: "auto" } : 0,
                    lineHeight: 1.7,
                    overflowWrap: "anywhere",
                    hyphens: "auto",
                    fontSize: `${1.15 * density}rem`,
                    color: "#374151",
                    letterSpacing: "-0.01em",
                }}
            >
                {body}
            </Typography>

            {/* Sound Button */}
            {!muteAudio && (
                <IconButton
                    onClick={() => handleSpeak(speakText)}
                    sx={{
                        flexShrink: 0,
                        width: 40,
                        height: 40,
                        borderRadius: "12px",
                        backgroundColor: alpha("#667eea", 0.08),
                        color: "#667eea",
                        border: "1px solid",
                        borderColor: alpha("#667eea", 0.15),
                        transition: "all 0.2s ease",
                        "&:hover": {
                            backgroundColor: alpha("#667eea", 0.15),
                            borderColor: alpha("#667eea", 0.25),
                            transform: "scale(1.05)",
                        },
                        "&:active": {
                            transform: "scale(0.98)",
                        },
                    }}
                >
                    <VolumeUpRoundedIcon sx={{ fontSize: 20 }} />
                </IconButton>
            )}
        </Box>
    );
}