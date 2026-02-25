import { Autocomplete, Box, Button, InputLabel, MenuItem, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { SessionContext } from "..";
import type { Student } from "../../types";
import { StorageUtils } from "../../utils/storageUtils";
import { APIUtils } from '../../utils/apiUtils';

interface AssignStudentByEducatorProps {
    setAnswers: React.Dispatch<React.SetStateAction<any>>;
    setCurQuestionIdx: React.Dispatch<React.SetStateAction<number>>;
}

const AssignStudentByEducator: React.FC<AssignStudentByEducatorProps> = ({
    setAnswers,
    setCurQuestionIdx,
}) => {
    // local grade just for locating student, not to be confused with student selected grade
    const deviceGrade = StorageUtils.getUserDataField("grade") ?? StorageUtils.getUserDataField("grades")?.[0] ?? "1";
    const [students, setStudents] = useState<Student[]>([]);

    const [selectedStudent, setSelectedStudent] = useState<Student | string | null>(null);
    const { grade, uuid, setSessionID, sessionStages, setSessionStages, setAssignedStudent } = useContext(SessionContext);
    const [selectedGrade, setSelectedGrade] = React.useState<string>(deviceGrade);
    async function fetchStudentsByGrade(grade: string) {
        try {
            const response = await APIUtils.POST(
                APIUtils.getAPI_URL() + `api/dashboard/get_students_by_grade/`,
                {
                    'grade': grade,
                    'classroom_uuid': uuid
                }
            );
            if (response.status === 200) {
                setStudents(response.data.students);
            }
        } catch (error) {
            console.error(error);
        }
    }

    async function assignStudent(student: Student | string | null) {
        let newStudentQuestions = false;
        try {
            const response = await APIUtils.POST(
                APIUtils.getAPI_URL() + `api/session/assign_student/`,
                {
                    'classroom_uuid': uuid,
                    'student': student,
                }
            );

            if (response.status === 200) {
                setSessionID(response.data.session_id);
                const student_check_in_details = response.data.student_check_in_details;
                newStudentQuestions = student_check_in_details.questions.length > 0 && !sessionStages.some(stage => stage.stage === "student_check_in");
                if (newStudentQuestions) {
                    setSessionStages(prev => [
                        ...prev,
                        { stage: "student_check_in", details: student_check_in_details }
                    ]);
                }
                setAssignedStudent(student);
                setCurQuestionIdx((prev) => prev + 1);
            } else {
                console.error("Failed to assign student");
            }
        } catch (error) {
            console.error(error);
        }
    }

    const [inputValue, setInputValue] = useState<string>("");
    function UserTyped(newInputValue: string) {
        setInputValue(newInputValue);
        const matchedStudent = students.find(
            (s) => s.name.toLowerCase() === newInputValue.toLowerCase()
        );
        if (matchedStudent) {
            setSelectedStudent(matchedStudent);
        } else {
            setSelectedStudent({
                uuid: '0',
                name: newInputValue,
                grade: grade
            });
        }
    }
    useEffect(() => {
        console.log(grade, deviceGrade);
        if (grade !== deviceGrade) {
            fetchStudentsByGrade(grade);
        }
    }, [grade]);

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            paddingX={2}
        // mb={3}
        >
            <Typography
                variant="h5"
                fontWeight={700}
                color="white"
                textAlign="center"
                sx={{ textShadow: "2px 2px 4px rgba(0,0,0,0.3)", }}
            >
                Assign Student
            </Typography>

            <Stack spacing={2} sx={{ width: '100%', mt: 2 }}>
                <Box>
                    <InputLabel sx={{ color: 'white' }}>Student Grade</InputLabel>
                    <TextField
                        fullWidth
                        select
                        value={selectedGrade}
                        sx={{ textcolor: "black" }}
                        onChange={(e) => setSelectedGrade(e.target.value)}
                    >
                        {Array.from({ length: 8 }, (_, i) => (i + 1).toString()).map((g) => (
                            <MenuItem key={g} value={g}>
                                Grade {g}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>

                <Box>
                    <InputLabel sx={{ color: 'white' }}>Student Initials</InputLabel>
                    <Autocomplete<Student | string, false, false, true>
                        freeSolo
                        options={students}
                        getOptionLabel={(option) =>
                            typeof option === "string" ? option : option.name
                        }
                        value={selectedStudent}
                        inputValue={inputValue}
                        onInputChange={(_, newInputValue) => UserTyped(newInputValue)}
                        onChange={(_, newValue) => setSelectedStudent(newValue)}
                        renderInput={(params) => (
                            <TextField {...params} fullWidth />
                        )}
                    />
                </Box>
            </Stack>

            <Box
                sx={{
                    position: "relative",
                    mt: 2,
                    width: "100%",
                }}
            >
                {/* Centered Skip */}
                <Box
                    sx={{
                        position: "absolute",
                        left: "50%",
                        transform: "translateX(-50%)",
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            borderRadius: 5,
                            border: '2px solid white',
                            fontSize: "1rem",
                            backgroundColor: 'primary.main',
                            '&:hover': { backgroundColor: 'primary.dark' },
                        }}
                        onClick={() => {
                            setSelectedStudent(null);
                            assignStudent(null);
                        }}
                    >
                        Skip
                    </Button>
                </Box>

                {/* Right-aligned Assign */}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                        variant="contained"
                        disabled={
                            !(selectedStudent &&
                                typeof selectedStudent === "object" &&
                                "name" in selectedStudent)
                        }
                        sx={{
                            borderRadius: 5,
                            border: '2px solid white',
                            fontSize: "1rem",
                            backgroundColor: 'primary.main',
                            '&:hover': { backgroundColor: 'primary.dark' },
                        }}
                        onClick={() => {
                            setSelectedStudent(selectedStudent);
                            assignStudent(selectedStudent);
                        }}
                    >
                        Assign
                    </Button>
                </Box>
            </Box>
        </Box>

    );
};

export default AssignStudentByEducator;