import React from 'react';
import { Box, Button, Typography } from '@mui/material';

interface DysregulationTypeProps {
  setAnswers: React.Dispatch<React.SetStateAction<any>>;
  setCurQuestionIdx: React.Dispatch<React.SetStateAction<number>>;
}

const dysregulationTypes = [
  { id: 'anxious', label: 'Anxious or Worried', emoji: '😰' },
  { id: 'angry', label: 'Angry or Frustrated', emoji: '😠' },
  { id: 'sad', label: 'Sad or Down', emoji: '😢' },
  { id: 'overwhelmed', label: 'Overwhelmed', emoji: '😵' },
  { id: 'fine', label: "I'm doing okay", emoji: '😊' },
];

const DysregulationType: React.FC<DysregulationTypeProps> = ({
  setAnswers,
  setCurQuestionIdx,
}) => {
  const handleSelect = (typeId: string) => {
    setAnswers((prev: any) => ({
      ...prev,
      dysregulationType: typeId,
    }));
    setCurQuestionIdx((prev) => prev + 1);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
      <Typography variant="h6" sx={{ color: 'white', textAlign: 'center' }}>
        How are you feeling right now?
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {dysregulationTypes.map((type) => (
          <Button
            key={type.id}
            variant="contained"
            onClick={() => handleSelect(type.id)}
            sx={{
              backgroundColor: 'white',
              color: 'primary.main',
              '&:hover': { backgroundColor: '#f0f0f0' },
              borderRadius: 2,
              py: 1.5,
              fontSize: '1rem',
            }}
          >
            {type.emoji} {type.label}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default DysregulationType;
