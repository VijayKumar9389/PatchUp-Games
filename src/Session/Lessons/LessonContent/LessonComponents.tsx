import * as React from "react";
import {
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    Typography,
} from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

export function useResizeObserver<T extends HTMLElement>() {
    const ref = React.useRef<T | null>(null);
    const [rect, setRect] = React.useState({ width: 0, height: 0 });

    React.useEffect(() => {
        if (!ref.current) return;

        const el = ref.current;
        const ro = new ResizeObserver((entries) => {
            const cr = entries[0]?.contentRect;
            if (!cr) return;
            setRect({ width: cr.width, height: cr.height });
        });

        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    return { ref, rect };
}

export const SpeakButton = ({
    muted,
    onSpeak,
    text,
}: {
    muted: boolean;
    onSpeak: (t: string) => void;
    text: string;
}) => {
    if (muted) return null;
    return (
        <IconButton
            onClick={() => onSpeak(text)}
            sx={{
                color: "black",
                flexShrink: 0,
                width: 36,
                height: 36,
                borderRadius: "50%",
                transition: "background-color 0.2s ease",
                "&:hover": { backgroundColor: "rgba(0,0,0,0.08)" },
            }}
        >
            <VolumeUpIcon />
        </IconButton>
    );
};

export const BodyCard = ({
    body,
    muted,
    onSpeak,
    speakText,
    sx,
}: {
    body: string;
    muted: boolean;
    onSpeak: (t: string) => void;
    speakText: string;
    sx?: any;
}) => (
    <Box
        sx={{
            p: 2,
            backgroundColor: "white",
            borderRadius: "16px",
            ...sx,
        }}
    >
        <Typography
            sx={{
                whiteSpace: "pre-line",
                maxWidth: "65ch",
                mx: { xs: 0, md: "auto" },
                lineHeight: 1.6,
                overflowWrap: "anywhere",
                hyphens: "auto",
                fontSize: {
                    xs: "0.9rem",
                    sm: "1rem",
                    md: "1.1rem",
                    lg: "1.25rem",
                },
            }}
        >
            {body}{" "}
            <SpeakButton muted={muted} onSpeak={onSpeak} text={speakText} />
        </Typography>
    </Box>
);

export const ContentImage = ({
    src,
    alt,
    maxH,
    width,
    mt = 2,
}: {
    src: string;
    alt: string;
    maxH: number;
    width: any;
    mt?: number;
}) => (
    <Box sx={{ textAlign: "center" }}>
        <Box
            component="img"
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            sx={{
                display: "block",
                mx: "auto",
                maxWidth: "100%",
                width,
                aspectRatio: "1 / 1",
                objectFit: "contain",
                maxHeight: `${maxH}px`,
                mt,
            }}
        />
    </Box>
);
