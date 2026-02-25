import { Typography, alpha } from "@mui/material";
import { useDensity } from "../../../../hooks/useDensity";

export function LessonTitle({ title }: { title: string }) {
    const density = useDensity();
    return (
        <Typography
            gutterBottom
            sx={{
                textAlign: { xs: "left", md: "center" },
                fontWeight: 700,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '1.25rem', sm: `${1.5 * density}rem` },
                mb: 1,
            }}
        >
            {title}
        </Typography>
    );
}
