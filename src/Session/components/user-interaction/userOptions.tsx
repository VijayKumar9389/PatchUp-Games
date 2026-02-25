import React from "react";
import { Box, Button, Paper, Typography, IconButton } from "@mui/material";
import { snakeCaseToTitleCase } from "../../../utils/helpers";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

type UserOptionsProps = {
    curUserOptions: string[];
    onSelectedOption: (option: string) => void;
    isLoading: boolean;
    disabled: boolean;
    handleSpeak: (text: string) => void;
    muteAudio: boolean;
};

const UserOptions: React.FC<UserOptionsProps> = ({
    curUserOptions,
    onSelectedOption,
    isLoading,
    disabled,
    handleSpeak,
    muteAudio,
}) => {
    function handleUserOptionClick(option: string) {
        onSelectedOption(option);
    }
    const options = curUserOptions.map(option => snakeCaseToTitleCase(option));


    return (

        <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", gap: "16px" }}>
            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                }}
            >
                {options.map((option, index) => (
                    <>
                        <Box key={index} sx={{
                            position: "relative",
                            flex: { xs: "0 1 100%", sm: "0 1 calc(50% - 8px)" }
                        }}>

                            <Button
                                onClick={() => handleUserOptionClick(curUserOptions[index])}
                                variant="contained"
                                disabled={isLoading || disabled}

                                sx={{
                                    padding: "12px 16px",
                                    borderRadius: "24px",
                                    border: "2px solid white",
                                    textTransform: "none",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "flex-start",
                                    gap: 1,
                                    width: !muteAudio ? "85%" : "100%",
                                }}
                            >
                                <Box
                                    component="span"
                                    sx={{
                                        flex: "1 1 auto",
                                        minWidth: 0,
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}
                                    title={option}
                                >
                                    {option}
                                </Box>
                            </Button>
                            {!muteAudio && (
                                <IconButton
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleSpeak(option || "");
                                    }}
                                    sx={{
                                        position: "absolute",
                                        right: 8,
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        color: "white",
                                        width: 36,
                                        height: 36,
                                        borderRadius: "50%",
                                        border: "1px solid white",
                                        backgroundColor: "rgba(255,255,255,0.1)",
                                        "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
                                    }}
                                >
                                    <VolumeUpIcon fontSize="small" />
                                </IconButton>
                            )}
                        </Box>

                    </>
                ))}
            </Box>

        </Box>
    );
};

export default UserOptions;