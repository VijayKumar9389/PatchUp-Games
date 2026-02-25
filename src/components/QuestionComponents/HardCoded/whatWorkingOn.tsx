import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

interface WhatWorkingOnProps {
  setAnswers: React.Dispatch<React.SetStateAction<any>>;
  setCurQuestionIdx: React.Dispatch<React.SetStateAction<number>>;
}

const WhatWorkingOn: React.FC<WhatWorkingOnProps> = ({
  setAnswers,
  setCurQuestionIdx,
}) => {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    setAnswers((prev: any) => ({
      ...prev,
      whatWorkingOn: value,
    }));
    setCurQuestionIdx((prev) => prev + 1);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
      <Typography variant="h6" sx={{ color: 'white', textAlign: 'center' }}>
        What are you working on today?
      </Typography>
      <TextField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        multiline
        rows={2}
        placeholder="Describe what you're doing..."
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
        disabled={!value.trim()}
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

export default WhatWorkingOn;
