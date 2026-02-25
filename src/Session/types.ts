export type QuestionForm = {
    id: string;
    type: string; // e.g., 'likert', 'multipleChoice', 'text', 'yesNo'
    questionText?: string;
    questionType?: 'likert' | 'multipleChoice' | 'textfield' | 'yesNo';
    options?: (string | number | boolean)[]; // For multiple choice questions
    required: boolean;
}

export type Answers = {
    [key: string]: string | number | boolean | null;
};