// src/pages/ColorPicker.tsx
import { Button, Box, useTheme, useMediaQuery } from '@mui/material';
import { COLORS, type RGBA, toRGBA, colorMatch } from '../Coloring/utils.ts';

interface ColorPickerProps {
    selectedColor: RGBA;
    setSelectedColor: (color: RGBA) => void;
    colors?: { name: string; color: RGBA }[];
}

const ColorPicker = ({ selectedColor, setSelectedColor, colors }: ColorPickerProps) => {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.only('xs'));

    const palette = colors ?? COLORS;
    const colorsToShow = isXs ? palette.slice(0, 8) : palette;

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2,
                p: 1,
            }}
        >
            {colorsToShow.map(({ name, color }) => (
                <Box key={name}>
                    <Button
                        onClick={() => setSelectedColor(color)}
                        disableRipple
                        sx={{
                            width: 24,
                            height: 24,
                            minWidth: 0,
                            padding: 0,
                            borderRadius: '50%',
                            backgroundColor: toRGBA(color),
                            opacity: 0.65,
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            transition: 'all 0.2s ease-in-out',
                            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                            '&:hover': {
                                opacity: 1,
                                transform: 'scale(1.15)',
                                boxShadow: `0 0 10px 3px ${toRGBA(color)}, 0 0 1px 1px rgba(255,255,255,0.1)`,
                            },

                            ...(colorMatch(color, selectedColor)
                                ? {
                                    boxShadow: `0 0 0 3px ${toRGBA(color)}, 0 0 10px 2px ${toRGBA(color)}`,
                                    transform: 'scale(1.2)',
                                    border: '2px solid #fff',
                                    opacity: 1,
                                }
                                : {}),
                        }}
                    />
                </Box>
            ))}
        </Box>
    );
};
export default ColorPicker;
