import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

interface SupportRequestFormProps {
  setAnswers: React.Dispatch<React.SetStateAction<any>>;
  setCurQuestionIdx: React.Dispatch<React.SetStateAction<number>>;
}

const SupportRequestForm: React.FC<SupportRequestFormProps> = ({
  setAnswers,
  setCurQuestionIdx,
}) => {
  const [request, setRequest] = useState('');

  const handleSubmit = () => {
    setAnswers((prev: any) => ({
      ...prev,
      supportRequest: request,
    }));
    setCurQuestionIdx((prev) => prev + 1);
  };

  const handleSkip = () => {
    setCurQuestionIdx((prev) => prev + 1);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
      <Typography variant="h6" sx={{ color: 'white', textAlign: 'center' }}>
        Is there anything you need help with today?
      </Typography>
      <TextField
        value={request}
        onChange={(e) => setRequest(e.target.value)}
        multiline
        rows={3}
        placeholder="Type here... (optional)"
        sx={{
          backgroundColor: 'white',
          borderRadius: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
          },
        }}
      />
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          variant="outlined"
          onClick={handleSkip}
          sx={{
            flex: 1,
            borderColor: 'white',
            color: 'white',
            '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' },
            borderRadius: 2,
            py: 1.5,
          }}
        >
          Skip
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            flex: 1,
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
    </Box>
  );
};

export default SupportRequestForm;
