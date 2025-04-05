import { useParams } from "react-router";
import useExam from "../hooks/useExam";
import { Radio, RadioGroup, FormControlLabel, FormControl, Button, Typography, Box } from "@mui/material";
import { useState, useEffect } from "react";

const ExamDetails = () => {
    const { id } = useParams();
    const [exams] = useExam();
    const filteredExam = exams?.find(exam => exam?._id === id);

    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [isAnswered, setIsAnswered] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState({ correct: 0, wrong: 0 });

    useEffect(() => {
        if (filteredExam) {
            const { questions } = filteredExam;
            setIsAnswered(new Array(questions.length).fill(false));
            setSelectedAnswers({});
            setScore({ correct: 0, wrong: 0 });
        }
    }, [filteredExam]);

    if (!filteredExam) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500 text-lg">Loading exam details...</p>
            </div>
        );
    }

    const { name, category, image, description, questions } = filteredExam;

    const handleAnswerChange = (event, questionIndex) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionIndex]: event.target.value,
        });
    };

    const calculateScore = () => {
        let correct = 0;
        let wrong = 0;

        questions.forEach((question, index) => {
            if (selectedAnswers[index] === question.correctAnswer) {
                correct++;
            } else if (selectedAnswers[index] !== undefined) {
                wrong++;
            }
        });

        return { correct, wrong };
    };

    const handleSubmit = () => {
        setIsAnswered(new Array(questions.length).fill(true));
        setIsSubmitted(true);
        setScore(calculateScore());
    };

    const getRadioColor = (option, questionIndex) => {
        if (!isSubmitted) return 'default';
        
        const correctAnswer = questions[questionIndex].correctAnswer;
        const userAnswer = selectedAnswers[questionIndex];
        
        if (option === correctAnswer) return 'green';
        if (option === userAnswer && userAnswer !== correctAnswer) return 'red';
        return 'default';
    };

    return (
        <div className="mt-40 max-w-7xl mx-auto space-y-7">
            <img src={image} alt="exam" className="w-full h-[400px] object-cover" />
            <h3 className="text-center font-bold text-xl">{description}</h3>
            <div className="flex justify-between font-bold">
                <h3>Title: {name}</h3>
                <h3>Category: {category}</h3>
                <h3>Questions: {questions.length}</h3>
                <h3>Marks: {questions.length}</h3>
            </div>

            {isSubmitted && (
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    gap: 4,
                    p: 2,
                    
                    borderRadius: 2,
                    
                }}>
                    <Typography variant="h6" sx={{ color: 'green' }}>
                        Correct: {score.correct}
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'red' }}>
                        Wrong: {score.wrong}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Score: {score.correct}/{questions.length}
                    </Typography>
                </Box>
            )}

            <div className="w-[600px] mx-auto">
                {questions.map((question, questionIndex) => (
                    <div key={questionIndex} className="mb-6 p-4 border border-gray-300 rounded-md">
                        <h4 className="font-semibold text-lg">{question.text}</h4>
                        <FormControl component="fieldset" className="mt-4 space-y-3">
                            <RadioGroup
                                value={selectedAnswers[questionIndex] || ""}
                                onChange={(e) => handleAnswerChange(e, questionIndex)}
                                disabled={isAnswered[questionIndex]}
                            >
                                {question.options.map((option, idx) => (
                                    <FormControlLabel
                                        key={idx}
                                        value={option}
                                        control={<Radio 
                                            sx={{
                                                color: getRadioColor(option, questionIndex),
                                                '&.Mui-checked': {
                                                    color: getRadioColor(option, questionIndex),
                                                }
                                            }} 
                                        />}
                                        label={option}
                                        className={getRadioColor(option, questionIndex) === 'red' ? 'text-red-600' : 
                                                 getRadioColor(option, questionIndex) === 'green' ? 'text-green-600' : ''}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </div>
                ))}

{!isSubmitted && (
    <div className="flex justify-center mt-4 gap-5 mb-20">
        <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={questions.some((_, index) => !selectedAnswers[index])}
            sx={{
                width: '96px',
                backgroundColor: '#4F959D',
                color: 'white',
                borderRadius: '12px', 
                border: 'none',
                '&:hover': {
                    backgroundColor: '#3d777e', 
                },
                '&:disabled': {
                    backgroundColor: '#cccccc',
                    color: '#666666'
                }
            }}
        >
            Submit
        </Button>
    </div>
)}
            </div>
        </div>
    );
};

export default ExamDetails;