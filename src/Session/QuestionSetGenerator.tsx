import type { Answers } from "./types";
import type { JSX } from "react";
import MultipleChoice from "../components/QuestionComponents/Custom/MultipleChoice";
import SEL_Content from "./questions/SEL_Content";
import AssignStudentByEducator from "./questions/AssignStudentByEducator";
import AssignStudentByStudent from "../components/QuestionComponents/HardCoded/AssignStudentByStudent";
import SupportRequestForm from "../components/QuestionComponents/HardCoded/supportRequestForm";
import WhatWorkingOn from "../components/QuestionComponents/HardCoded/whatWorkingOn";
import TextfieldQuestion from "../components/QuestionComponents/Custom/Textfield";
import DysregulationType from "../components/QuestionComponents/HardCoded/DysregulationType";
import MultiSelect from "../components/QuestionComponents/Custom/MultipleSelect";

export const generateQuestionSet = (
    stageMetaData: any,
    setCurQuestionIdx: React.Dispatch<React.SetStateAction<number>>,
    setAnswers: React.Dispatch<React.SetStateAction<Answers>>,
    muteAudio: boolean = false
): JSX.Element[] => {
    let components: JSX.Element[] = [];
    const isSurvey = Array.isArray(stageMetaData);
    const questions = isSurvey
        ? stageMetaData
        : stageMetaData.details.questions;

    questions.forEach((question, index) => {
        const questionType = isSurvey
            ? "custom"
            : question.type;

        switch (questionType) {
            case 'assign_student_by_educator':
                components.push(
                    <AssignStudentByEducator
                        setAnswers={setAnswers}
                        setCurQuestionIdx={setCurQuestionIdx}

                    />
                )
                break;
            case 'assign_student_by_student':
                components.push(
                    <AssignStudentByStudent
                        setAnswers={setAnswers}
                        setCurQuestionIdx={setCurQuestionIdx}
                    />
                )
                break;
            case 'dysregulation_type':
                components.push(
                    <DysregulationType
                        setAnswers={setAnswers}
                        setCurQuestionIdx={setCurQuestionIdx}
                    />
                )
                break;
            case 'SEL_content':
                if (question.content === 'none') {
                    break;
                }
                components.push(
                    <SEL_Content
                        content={question.content}
                        setAnswers={setAnswers}
                        setCurQuestionIdx={setCurQuestionIdx}
                    />
                )
                break;
            case 'supportRequest':
                components.push(
                    <SupportRequestForm
                        setAnswers={setAnswers}
                        setCurQuestionIdx={setCurQuestionIdx}
                    />
                )
                break;

            case 'whatWorkingOn':
                components.push(
                    <WhatWorkingOn
                        setAnswers={setAnswers}
                        setCurQuestionIdx={setCurQuestionIdx}
                    />
                )
                break;
            case 'custom':
                if (question.optionType === 'textfield') {
                    components.push(
                        <TextfieldQuestion
                            setAnswers={setAnswers}
                            setCurQuestionIdx={setCurQuestionIdx}
                            questionData={question}
                            muteAudio={muteAudio}
                        />
                    )
                    break;
                } else if (question.optionType === 'multipleSelect') {
                    components.push(
                        <MultiSelect
                            setAnswers={setAnswers}
                            setCurQuestionIdx={setCurQuestionIdx}
                            questionData={question}
                            muteAudio={muteAudio}
                        />
                    )
                    break;
                }
                else {
                    components.push(
                        <MultipleChoice
                            setAnswers={setAnswers}
                            setCurQuestionIdx={setCurQuestionIdx}
                            questionData={question}
                            muteAudio={muteAudio}
                        />
                    )
                    break;
                }
            default:
                components.push(
                    <></>
                )
                break;
        }

    });
    // components.push(
    //     <SupportRequestForm
    //         setAnswers={setAnswers}
    //         setCurQuestionIdx={setCurQuestionIdx}
    //     />
    // )
    // components.push(
    //     <WhatWorkingOn
    //         setAnswers={setAnswers}
    //         setCurQuestionIdx={setCurQuestionIdx}
    //     />
    // )

    return components;
}