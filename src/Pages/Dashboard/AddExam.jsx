import { useForm, useFieldArray } from "react-hook-form";
import Headline from "../../Components/Headline/Headline";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddExam = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()

  const { register, control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      category: "",
      image: "",
      description: "",
      questions: [
        {
          text: "",
          options: ["", "", "", ""],
          correctAnswer: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const onSubmit = (data) => {
    const examData = {
      ...data,
      email: user?.email || "unknown@example.com", 
    };
   
    axiosSecure.post('/exams',examData)
    .then((res)=>{
        if(res.data.insertedId){
            Swal.fire({
                title: "Good job!",
                text: "Successfully added exam",
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
    
    
    reset();
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <Headline text={"Add Exam"} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        <div>
          <label>Exam Name</label>
          <input {...register("name")} className="input input-bordered w-full" required />
        </div>

        <div>
          <label>Category</label>
          <select {...register("category")} className="select select-bordered w-full" required>
            <option value="">Select Category</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div>
          <label>Image URL</label>
          <input {...register("image")} className="input input-bordered w-full" required />
        </div>

        <div>
          <label>Description</label>
          <textarea {...register("description")} className="textarea textarea-bordered w-full" required />
        </div>

        {/* Questions Section */}
        <div>
          <h3 className="text-lg font-bold">Questions</h3>

          {fields.map((question, index) => (
            <div key={question.id} className="p-4 my-4 space-y-2 bg-gray-50">
              <label>Question Text</label>
              <input
                {...register(`questions.${index}.text`)}
                className="input input-bordered w-full"
                required
              />

              <label>Options</label>
              {Array(4)
                .fill()
                .map((_, optIdx) => (
                  <input
                    key={optIdx}
                    {...register(`questions.${index}.options.${optIdx}`)}
                    placeholder={`Option ${optIdx + 1}`}
                    className="input input-bordered w-full mb-2"
                    required
                  />
                ))}

              <label>Correct Answer</label>
              <input
                {...register(`questions.${index}.correctAnswer`)}
                className="input input-bordered w-full"
                required
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

        <button type="submit" className="btn btn-primary mt-4 text-center mx-auto flex justify-center">
          Submit Exam
        </button>
      </form>
    </div>
  );
};

export default AddExam;
