import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function CheckInComplete({ setCurStage, label }:
    { setCurStage?: React.Dispatch<React.SetStateAction<number>>, label: string }) {
    useEffect(() => {
        if (!setCurStage) return;
        const timer = setTimeout(() => {
            setCurStage(prev => prev + 1);
        }, 1500);
        return () => clearTimeout(timer);
    }, [setCurStage]);
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="200px"
            gap={2}
        >
            <Typography variant="h5" fontWeight={600} sx={{ color: 'white' }}>
                {label} Complete!
            </Typography>
            <CheckCircleOutlineIcon color="success" sx={{ fontSize: 60 }} />
        </Box>
    );
}
