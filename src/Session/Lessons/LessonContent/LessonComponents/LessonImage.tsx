import { Box } from "@mui/material";

export function LessonImage({
    src,
    alt,
}: {
    src: string;
    alt: string;
}) {
    return (
        <Box
            component="img"
            src={src}
            alt={alt}
            sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                borderRadius: '12px',
            }}
        />
    );
}