import { useParams } from "react-router";
import Headline from "../Components/Headline/Headline";
import { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import WebButton from "../Components/WebButton/WebButton";
import Swal from "sweetalert2";


const CqDetails = () => {
    const { id } = useParams();
    const [cqs, setCqs] = useState();
    const axiosPublic = useAxiosPublic();
    const [answers,setAnswers] = useState()

    useEffect(() => {
        axiosPublic.get('/cq')
            .then(res => setCqs(res.data))
    }, [])
    const filterExam = cqs?.find(cq => cq._id === id)
    if (!filterExam) {
        return (
            <div className="mt-40 text-center text-gray-500">
                Loading exam details...
            </div>
        );
    }

    const { image, name, category, description, questions, _id } = filterExam;

    const handleFileSubmit = (questionIdx, e) => {
        const file = e.target.files[0];
        if (file) {
            setAnswers((prev) => ({
                ...prev,
                [questionIdx]: {
                    file
                },
            }));
        }
    };


    const handleSubmit = () => {
        const formData = new FormData();
    
        formData.append('examId', _id);
        formData.append('examName', name);
    
        Object.entries(answers).forEach(([index, answerData]) => {
            formData.append(`answers[${index}][file]`, answerData.file);
        });
    
        axiosPublic.post('/pdf', formData)
            .then(() => {
               
                Swal.fire({
                    title: "Good job!",
                    text: "Submitted answer",
                    icon: "success"
                  });
               
            })
            .catch(err => console.error(err.message));
    }; 
    return (
        <div className="py-20 max-w-7xl mx-auto space-y-7">
            <img src={image} alt="" className="w-full h-[350px] object-cover" />
            <h3 className="font-bold text-xl text-center">{description}</h3>
            <div className="font-bold flex justify-between">
                <h3>Title: {name}</h3>
                <h3>Category: {category}</h3>
                <h3>Questions: {questions.length}</h3>
                <h3>Marks: {questions?.reduce((total, question) => total + question.marks, 0)}</h3>
            </div>

            {/* question */}
            <div>
                {
                    questions?.map((question, idx) => (
                        <div key={idx} className="p-5 shadow-2xl w-[600px] mx-auto mb-10">
                            <div className="flex text-sm   justify-between ">
                                <h3>{question.question}</h3>
                                <p>{question.marks}</p>

                            </div>
                            <div className="mt-5 w-full">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Upload Answer (PDF only):
                                </label>
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    className="file-input file-input-bordered w-full max-w-md"
                                    required
                                    onChange={(e)=>handleFileSubmit(idx, e)}
                                />
                            </div>
                            
                        </div>
                    ))
                }
            </div>
            <div className="flex justify-center" onClick={handleSubmit}>
                                <WebButton text={"submit"}></WebButton>
                            </div>
        </div>
    );
};

export default CqDetails;