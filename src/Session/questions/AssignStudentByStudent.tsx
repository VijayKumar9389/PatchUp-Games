import React from 'react';
import { Box, TextField, MenuItem, InputLabel, Select, Button, Typography } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { StorageUtils } from '../../utils/storageUtils';

interface AssignStudentByStudentProps {
    setAnswers: React.Dispatch<React.SetStateAction<any>>;
    setCurQuestionIdx: React.Dispatch<React.SetStateAction<number>>;
}

const AssignStudentByStudent: React.FC<AssignStudentByStudentProps> = ({ setAnswers, setCurQuestionIdx }) => {
    const [name, setName] = React.useState('');
    const [grade, setGrade] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const grades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    React.useEffect(() => {
        const storedName = StorageUtils.getStudentName();
        const storedGrade = StorageUtils.getStudentGrade();
        if (storedName) setName(storedName);
        if (storedGrade) setGrade(storedGrade);
    }, []);
    return (
        <Box display="flex" flexDirection="column" gap={1}>
            <Typography variant='h4' sx={{ color: 'white' }} gutterBottom>
                Enter your name and grade
            </Typography>
            <Box display="flex" flexDirection="column" gap={1} mb={2}>
                <InputLabel>
                    Name
                </InputLabel>
                <TextField
                    value={name}
                    onChange={e => setName(e.target.value)}
                    fullWidth
                />
                <Box sx={{ mt: 3 }}>
                    <InputLabel >
                        Grade
                    </InputLabel>
                    <Select
                        fullWidth
                        value={grade}
                        onChange={(e: SelectChangeEvent) => setGrade(e.target.value)}
                    >
                        {grades.map(g => (
                            <MenuItem key={g} value={g}>{g}</MenuItem>
                        ))}
                    </Select>
                </Box>
            </Box>

            <Box sx={{ ml: "auto" }}>
                <Button
                    variant="contained"
                    color="primary"
                    disabled={!name || !grade || loading}
                    sx={{
                        borderRadius: 5,
                        border: '2px solid white',
                        backgroundColor: 'primary.main',
                        '&:hover': { backgroundColor: 'primary.dark' },
                    }}
                    onClick={() => {
                        setAnswers((prev: any) => ({
                            ...prev,
                            ['name']: name,
                            ['grade']: grade,
                        }));
                        setCurQuestionIdx((prev: number) => prev + 1);
                    }}
                >
                    Next
                </Button>
            </Box>
        </Box>
    );
};

export default AssignStudentByStudent;
