import { useState, useCallback, memo } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Fade,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import { mindfulColors } from '../../games/core/theme'
import type { Question, Answer } from '../types'

type QuestionRendererProps = {
  question: Question
  answer?: Answer
  onAnswer: (answer: Answer) => void
  onNext: () => void
  allowSkip?: boolean
}

export const QuestionRenderer = memo(function QuestionRenderer({
  question,
  answer,
  onAnswer,
  onNext,
  allowSkip = false,
}: QuestionRendererProps) {
  const [localValue, setLocalValue] = useState<string | string[]>(
    answer?.value ?? (question.type === 'multiple_choice' ? [] : '')
  )

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLocalValue(value)
    onAnswer({ questionId: question.id, value })
  }, [question.id, onAnswer])

  const handleChoiceChange = useCallback((value: string) => {
    setLocalValue(value)
    onAnswer({ questionId: question.id, value })
  }, [question.id, onAnswer])

  const handleNext = useCallback(() => {
    onNext()
  }, [onNext])

  const isAnswered = localValue !== '' && localValue.length > 0
  const canProceed = isAnswered || allowSkip

  const renderQuestionInput = () => {
    switch (question.type) {
      case 'text':
        return (
          <TextField
            fullWidth
            multiline
            rows={3}
            value={localValue}
            onChange={handleTextChange}
            placeholder="Type your answer here..."
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                backgroundColor: alpha('#fff', 0.8),
                fontSize: { xs: '0.9rem', sm: '1rem' },
                '& fieldset': {
                  borderColor: alpha(mindfulColors.primary.main, 0.3),
                },
                '&:hover fieldset': {
                  borderColor: mindfulColors.primary.main,
                },
                '&.Mui-focused fieldset': {
                  borderColor: mindfulColors.primary.main,
                },
              },
              '& .MuiOutlinedInput-input': {
                padding: { xs: '12px 14px', sm: '14px 16px' },
              },
            }}
          />
        )

      case 'yes_no':
        return (
          <Box sx={{ display: 'flex', gap: { xs: 1.5, sm: 2 }, justifyContent: 'center' }}>
            {['Yes', 'No'].map((option) => (
              <Button
                key={option}
                variant={localValue === option ? 'contained' : 'outlined'}
                onClick={() => handleChoiceChange(option)}
                sx={{
                  minWidth: { xs: 80, sm: 100 },
                  py: { xs: 1, sm: 1.5 },
                  px: { xs: 2, sm: 3 },
                  borderRadius: 3,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  backgroundColor: localValue === option
                    ? mindfulColors.primary.main
                    : 'transparent',
                  borderColor: mindfulColors.primary.main,
                  color: localValue === option
                    ? mindfulColors.primary.contrastText
                    : mindfulColors.primary.main,
                  '&:hover': {
                    backgroundColor: localValue === option
                      ? mindfulColors.primary.dark
                      : alpha(mindfulColors.primary.main, 0.1),
                  },
                }}
              >
                {option}
              </Button>
            ))}
          </Box>
        )

      case 'multiple_choice':
        return (
          <FormControl component="fieldset" sx={{ width: '100%' }}>
            <RadioGroup
              value={localValue}
              onChange={(e) => handleChoiceChange(e.target.value)}
            >
              {question.options?.map((option) => (
                <FormControlLabel
                  key={option}
                  value={option}
                  control={
                    <Radio
                      size="small"
                      sx={{
                        color: mindfulColors.primary.main,
                        '&.Mui-checked': {
                          color: mindfulColors.primary.main,
                        },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: { xs: '0.85rem', sm: '0.95rem' } }}>
                      {option}
                    </Typography>
                  }
                  sx={{
                    mb: { xs: 0.5, sm: 1 },
                    mx: 0,
                    p: { xs: 1, sm: 1.5 },
                    borderRadius: 2,
                    backgroundColor: localValue === option
                      ? alpha(mindfulColors.primary.main, 0.1)
                      : alpha('#fff', 0.5),
                    border: `1px solid ${
                      localValue === option
                        ? mindfulColors.primary.main
                        : alpha(mindfulColors.primary.main, 0.2)
                    }`,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      backgroundColor: alpha(mindfulColors.primary.main, 0.08),
                    },
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        )

      default:
        return null
    }
  }

  return (
    <Fade in timeout={400}>
      <Box
        sx={{
          width: '100%',
          maxWidth: 500,
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 2, sm: 3 },
          px: { xs: 1, sm: 0 },
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          sx={{
            color: mindfulColors.text.primary,
            fontWeight: 600,
            textAlign: 'center',
            lineHeight: 1.4,
            fontSize: { xs: '1rem', sm: '1.25rem' },
          }}
        >
          {question.text}
        </Typography>

        <Box sx={{ mt: { xs: 1, sm: 2 } }}>
          {renderQuestionInput()}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: { xs: 1, sm: 2 } }}>
          {allowSkip && !isAnswered && (
            <Button
              variant="text"
              size="small"
              onClick={handleNext}
              sx={{
                color: mindfulColors.text.secondary,
                fontSize: { xs: '0.8rem', sm: '0.9rem' },
                '&:hover': {
                  backgroundColor: alpha(mindfulColors.primary.main, 0.05),
                },
              }}
            >
              Skip
            </Button>
          )}
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={!canProceed}
            sx={{
              px: { xs: 3, sm: 4 },
              py: { xs: 1, sm: 1.5 },
              borderRadius: 3,
              fontSize: { xs: '0.9rem', sm: '1rem' },
              backgroundColor: mindfulColors.primary.main,
              '&:hover': {
                backgroundColor: mindfulColors.primary.dark,
              },
              '&:disabled': {
                backgroundColor: alpha(mindfulColors.primary.main, 0.3),
              },
            }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Fade>
  )
})
