import { useEffect, useState } from "react";
import Headline from "../../../Components/Headline/Headline";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useNavigate, useParams } from "react-router";
import { useForm, useFieldArray } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateCq = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [cqs, setCqs] = useState([]);
    const filteredExam = cqs.find((e) => e._id === id);

    const { register, control, handleSubmit, reset } = useForm({
        defaultValues: filteredExam || {},
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "questions",
    });

    // Load data and populate form
    useEffect(() => {
        axiosPublic.get("/cq").then((res) => setCqs(res.data));
    }, []);

    useEffect(() => {
        if (filteredExam) {
            reset(filteredExam);
        }
    }, [filteredExam, reset]);

    const onSubmit = (data) => {
        const updatedData = {
            name: data.name,
            category: data.category,
            image: data.image,
            description: data.description,
            questions: data.questions.map(question => ({
                question: question.question,
                marks: Number(question.marks) 
            }))
        };
    
        axiosSecure.patch(`/cq/${id}`, updatedData)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: "Good job!",
                        text: "Successfully Updated",
                        icon: "success"
                    });
                    navigate('/dashboard/cq')
                }
            })
            .catch(err => {
                Swal.fire({
                    icon: "error",
                    title: "Update failed",
                    text: err.message,
                });
            });
    };
    

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <Headline text={"Update CQ"} />

            {filteredExam ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label>Exam Name</label>
                        <input
                            {...register("name")}
                            defaultValue={filteredExam.name}
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label>Category</label>
                        <select
                            {...register("category")}
                            defaultValue={filteredExam.category}
                            className="select select-bordered w-full"
                        >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>

                    <div>
                        <label>Image URL</label>
                        <input
                            {...register("image")}
                            defaultValue={filteredExam.image}
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div>
                        <label>Description</label>
                        <textarea
                            {...register("description")}
                            defaultValue={filteredExam.description}
                            className="textarea textarea-bordered w-full"
                        />
                    </div>

                    {/* Questions Section */}
                    <div>
                        <h3 className="text-lg font-bold">Questions</h3>
                        {fields.map((question, index) => (
                            <div key={question.id} className="bg-gray-50 p-4 rounded-md mb-4 space-y-2">
                                <label>Question</label>
                                <input
                                    {...register(`questions.${index}.question`)}
                                    defaultValue={question.question}
                                    className="input input-bordered w-full"
                                />

                                <label>Marks</label>
                                <input
                                    type="number"
                                    {...register(`questions.${index}.marks`)}
                                    defaultValue={question.marks}
                                    className="input input-bordered w-full"
                                />

                                <button
                                    type="button"
                                    className="btn bg-red-500 text-white btn-sm mt-2"
                                    onClick={() => remove(index)}
                                >
                                    Remove Question
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            className="btn bg-green-500 text-white"
                            onClick={() =>
                                append({
                                    question: "",
                                    marks: 0,
                                })
                            }
                        >
                            Add Question
                        </button>
                    </div>

                    <button type="submit" className="btn flex justify-center mx-auto btn-primary mt-6">
                        Update CQ
                    </button>
                </form>
            ) : (
                <p className="text-center mt-6">Loading CQ data...</p>
            )}
        </div>
    );
};

export default UpdateCq;
