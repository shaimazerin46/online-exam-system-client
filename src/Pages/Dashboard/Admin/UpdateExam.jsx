import { useNavigate, useParams } from "react-router";
import Headline from "../../../Components/Headline/Headline";
import useExam from "../../../hooks/useExam";
import { useForm, useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateExam = () => {
  const { id } = useParams();
  const [exams] = useExam();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()

  const filteredExam = exams.find((e) => e._id === id);

  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: filteredExam || {}, // temporary fallback
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  // Reset form once data is available
  useEffect(() => {
    if (filteredExam) {
      reset(filteredExam);
    }
  }, [filteredExam, reset]);

  const onSubmit = (data) => {
    const updatedData = {
      ...filteredExam,
      ...data,
      questions: data.questions.map((q, i) => ({
        ...filteredExam.questions[i],
        ...q,
        options: q.options.length ? q.options : filteredExam.questions[i].options,
      })),
    };

    console.log("Updated Exam Data:", updatedData);

    // TODO: send updatedData to backend
    axiosSecure.patch(`/exams/${id}`,updatedData)
    .then(res=>{
        if(res.data.modifiedCount>0){
            Swal.fire({
                            title: "Good job!",
                            text: "Successfully Updated",
                            icon: "success"
                          });
                        navigate('/dashboard/exams')
        }
    })
    .catch(err=>{
         Swal.fire({
                    icon: "error",
                    text: (err.message),
                  });
    })

  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Headline text={"Update Exam"} />

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
              <div
                key={question.id}
                className="p-4 my-4 space-y-2 bg-gray-50"
              >
                <label>Question Text</label>
                <input
                  {...register(`questions.${index}.text`)}
                  defaultValue={question.text}
                  className="input input-bordered w-full"
                />

                <label>Options</label>
                {Array(4)
                  .fill()
                  .map((_, optIdx) => (
                    <input
                      key={optIdx}
                      {...register(`questions.${index}.options.${optIdx}`)}
                      defaultValue={question.options?.[optIdx] || ""}
                      placeholder={`Option ${optIdx + 1}`}
                      className="input input-bordered w-full mb-2"
                    />
                  ))}

                <label>Correct Answer</label>
                <input
                  {...register(`questions.${index}.correctAnswer`)}
                  defaultValue={question.correctAnswer}
                  className="input input-bordered w-full"
                />

                <button
                  type="button"
                  className="btn btn-sm bg-red-500 text-white mt-2"
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
                  text: "",
                  options: ["", "", "", ""],
                  correctAnswer: "",
                })
              }
            >
              Add Question
            </button>
          </div>

          <button type="submit" className="btn  flex justify-center mx-auto btn-primary mt-4">
            Update Exam
          </button>
        </form>
      ) : (
        <p className="text-center mt-8">Loading exam data...</p>
      )}
    </div>
  );
};

export default UpdateExam;
