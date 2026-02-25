import React, { useState } from 'react';
import { Box, Button, Typography, Checkbox, FormControlLabel } from '@mui/material';

interface MultiSelectProps {
  setAnswers: React.Dispatch<React.SetStateAction<any>>;
  setCurQuestionIdx: React.Dispatch<React.SetStateAction<number>>;
  questionData: {
    id: string;
    questionText?: string;
    options?: string[];
  };
  muteAudio?: boolean;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  setAnswers,
  setCurQuestionIdx,
  questionData,
}) => {
  const [selected, setSelected] = useState<string[]>([]);

  const handleToggle = (option: string) => {
    setSelected((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const handleSubmit = () => {
    setAnswers((prev: any) => ({
      ...prev,
      [questionData.id]: selected,
    }));
    setCurQuestionIdx((prev) => prev + 1);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
      <Typography variant="h6" sx={{ color: 'white', textAlign: 'center' }}>
        {questionData.questionText || 'Select all that apply:'}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {(questionData.options || ['Option 1', 'Option 2', 'Option 3']).map((option, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={selected.includes(option)}
                onChange={() => handleToggle(option)}
                sx={{ color: 'white', '&.Mui-checked': { color: 'white' } }}
              />
            }
            label={option}
            sx={{ color: 'white' }}
          />
        ))}
      </Box>
      <Button
        variant="contained"
        onClick={handleSubmit}
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

export default MultiSelect;
