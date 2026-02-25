import React from 'react';
import { Box, Button, Typography } from '@mui/material';

interface MultipleChoiceProps {
  setAnswers: React.Dispatch<React.SetStateAction<any>>;
  setCurQuestionIdx: React.Dispatch<React.SetStateAction<number>>;
  questionData: {
    id: string;
    questionText?: string;
    options?: string[];
  };
  muteAudio?: boolean;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  setAnswers,
  setCurQuestionIdx,
  questionData,
}) => {
  const handleSelect = (option: string) => {
    setAnswers((prev: any) => ({
      ...prev,
      [questionData.id]: option,
    }));
    setCurQuestionIdx((prev) => prev + 1);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
      <Typography variant="h6" sx={{ color: 'white', textAlign: 'center' }}>
        {questionData.questionText || 'Please select an option:'}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {(questionData.options || ['Option 1', 'Option 2', 'Option 3']).map((option, index) => (
          <Button
            key={index}
            variant="contained"
            onClick={() => handleSelect(option)}
            sx={{
              backgroundColor: 'white',
              color: 'primary.main',
              '&:hover': { backgroundColor: '#f0f0f0' },
              borderRadius: 2,
              py: 1.5,
            }}
          >
            {option}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default MultipleChoice;
