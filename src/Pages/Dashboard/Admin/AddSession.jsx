import { useForm } from "react-hook-form";
import Headline from "../../../Components/Headline/Headline";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddSession = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    axiosSecure.post("/session", data)
      .then(res => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Session added successfully!",
            icon: "success",
          });
          reset();
          navigate("/dashboard/support"); 
        }
      })
      .catch(err => {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: err.message,
        });
      });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Headline text="Add Session" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="font-medium">Title</label>
          <input
            {...register("title", { required: true })}
            className="input input-bordered w-full"
            placeholder="Session Title"
          />
        </div>

        <div>
          <label className="font-medium">Description</label>
          <textarea
            {...register("description", { required: true })}
            className="textarea textarea-bordered w-full"
            placeholder="Session Description"
          ></textarea>
        </div>

        <div>
          <label className="font-medium">Speaker</label>
          <input
            {...register("speaker", { required: true })}
            className="input input-bordered w-full"
            placeholder="Speaker Name"
          />
        </div>

        <div>
          <label className="font-medium">Scheduled Time</label>
          <input
            {...register("scheduledTime", { required: true })}
            className="input input-bordered w-full"
            placeholder="e.g. 9:00 AM"
          />
        </div>

        <div>
          <label className="font-medium">Duration (minutes)</label>
          <input
            type="number"
            {...register("durationMinutes", { required: true })}
            className="input input-bordered w-full"
            placeholder="Duration in minutes"
          />
        </div>

        <div>
          <label className="font-medium">Google Meet Link</label>
          <input
            {...register("link", { required: true })}
            className="input input-bordered w-full"
            placeholder="https://meet.google.com/..."
          />
        </div>

        <button type="submit" className="btn btn-primary flex justify-center mx-auto my-4">
          Add Session
        </button>
      </form>
    </div>
  );
};

export default AddSession;
