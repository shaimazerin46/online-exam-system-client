import { useParams, useNavigate } from "react-router-dom";
import Headline from "../../../Components/Headline/Headline";
import useSession from "../../../hooks/useSession";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UpdateSession = () => {
  const { id } = useParams();
  const [sessions] = useSession();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const filteredSession = sessions?.find((session) => session._id === id);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (filteredSession) {
      reset(filteredSession);
    }
  }, [filteredSession, reset]);

  const onSubmit = (data) => {
    axiosSecure.patch(`/session/${id}`,data)
     .then(res => {
                    console.log(res.data)
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            title: "Good job!",
                            text: "Successfully Updated",
                            icon: "success"
                        });
                        navigate('/dashboard/support')
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
    <div className="p-4 max-w-2xl mx-auto">
      <Headline text={"Update Session"} />

      {filteredSession ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-6">

          <div>
            <label className="label">Title</label>
            <input
              {...register("title", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Description</label>
            <textarea
              {...register("description", { required: true })}
              className="textarea textarea-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Speaker</label>
            <input
              {...register("speaker", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Scheduled Time</label>
            <input
              {...register("scheduledTime", { required: true })}
              className="input input-bordered w-full"
              placeholder="e.g., 9:00 AM"
            />
          </div>

          <div>
            <label className="label">Duration (minutes)</label>
            <input
              type="number"
              {...register("durationMinutes", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="label">Meeting Link</label>
            <input
              type="url"
              {...register("link", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          <button type="submit" className="btn btn-primary mt-4 flex justify-center mx-auto">
            Update Session
          </button>
        </form>
      ) : (
        <p className="text-center mt-6 text-gray-500">Loading session data...</p>
      )}
    </div>
  );
};

export default UpdateSession;
