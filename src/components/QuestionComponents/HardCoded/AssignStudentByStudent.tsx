import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

interface AssignStudentByStudentProps {
  setAnswers: React.Dispatch<React.SetStateAction<any>>;
  setCurQuestionIdx: React.Dispatch<React.SetStateAction<number>>;
}

const AssignStudentByStudent: React.FC<AssignStudentByStudentProps> = ({
  setAnswers,
  setCurQuestionIdx,
}) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    setAnswers((prev: any) => ({
      ...prev,
      studentName: name,
    }));
    setCurQuestionIdx((prev) => prev + 1);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
      <Typography variant="h6" sx={{ color: 'white', textAlign: 'center' }}>
        What is your name?
      </Typography>
      <TextField
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        sx={{
          backgroundColor: 'white',
          borderRadius: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
          },
        }}
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!name.trim()}
        sx={{
          backgroundColor: 'white',
          color: 'primary.main',
          '&:hover': { backgroundColor: '#f0f0f0' },
          borderRadius: 2,
          py: 1.5,
        }}
      >
        Continue
      </Button>
    </Box>
  );
};

export default AssignStudentByStudent;
