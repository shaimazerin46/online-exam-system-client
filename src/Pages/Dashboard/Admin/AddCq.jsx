import { useContext } from "react";
import Headline from "../../../Components/Headline/Headline";
import { AuthContext } from "../../../Context/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import { useForm, useFieldArray } from "react-hook-form";
import Swal from "sweetalert2";

const AddCq = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      name: "",
      category: "",
      image: "",
      description: "",
      questions: [{ question: "", marks: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "questions",
  });

  const onSubmit = async (data) => {
    const cqData = {
      ...data,
      email: user?.email,
    };
    console.log(cqData)
   
      axiosSecure.post("/cq", cqData)
      .then(res=>{
        if (res.data.insertedId) {
             Swal.fire({
                            title: "Good job!",
                            text: "Successfully added exam",
                            icon: "success"
                          });
            reset();
            navigate("/dashboard/cq")
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
    <div className="p-6 max-w-4xl mx-auto">
      <Headline text={"Add CQ"} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label>Exam Name</label>
          <input
            {...register("name", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label>Category</label>
          <select
            {...register("category", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select Category</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div>
          <label>Image URL</label>
          <input
            {...register("image", { required: true })}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label>Description</label>
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered w-full"
          />
        </div>

        <div>
          <h3 className="text-lg font-bold">Questions</h3>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="p-4 my-2 rounded-md space-y-2"
            >
              <label>Question</label>
              <input
                {...register(`questions.${index}.question`, { required: true })}
                className="input input-bordered w-full"
                placeholder="Enter question"
              />

              <label>Marks</label>
              <input
                type="number"
                {...register(`questions.${index}.marks`, { required: true })}
                className="input input-bordered w-full"
                placeholder="Enter marks"
              />

              <button
                type="button"
                onClick={() => remove(index)}
                className="btn btn-sm bg-red-500 text-white mt-2"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => append({ question: "", marks: "" })}
            className="btn bg-green-500 text-white"
          >
            Add Question
          </button>
        </div>

        <button type="submit" className="btn btn-primary ">
          Submit CQ
        </button>
      </form>
    </div>
  );
};

export default AddCq;
