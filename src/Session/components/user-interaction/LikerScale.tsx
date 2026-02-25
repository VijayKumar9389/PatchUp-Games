import React from 'react';
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from '@mui/material';

export interface LikertScaleProps {
    question: string;
    value: string;
    onChange: (newValue: string) => void;
}

const options = [
    { label: 'Really Bad', value: '1' },
    { label: 'Bad', value: '2' },
    { label: 'OK', value: '3' },
    { label: 'Good', value: '4' },
    { label: 'Really Good', value: '5' },
];

export const LikertScaleComponent: React.FC<LikertScaleProps> = ({ question, value, onChange }) => {
    return (
        <FormControl component="fieldset" sx={{ marginBottom: 2 }}>

            <RadioGroup
                row
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {options.map((opt) => (
                    <FormControlLabel
                        key={opt.value}
                        value={opt.value}
                        control={<Radio />}
                        label={opt.label}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    );
};