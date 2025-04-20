
import Headline from "../../../Components/Headline/Headline";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useSession from "../../../hooks/useSession";



const AdminSession = () => {
    
    const [sessions, refetch] = useSession()
    const axiosSecure = useAxiosSecure();

  

    const handleDelete = (id) => {
        axiosSecure.delete(`/session/${id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Good job!",
                        text: "Successfully deleted",
                        icon: "success"
                    });
                    refetch()
                }
            })
            .catch(err => {
                Swal.fire({
                    icon: "error",
                    text: (err.message),
                });
            })
    };



    return (
        <div className="p-4">
            <Headline text={"Manage Support Session"} />

            <Link to='/dashboard/support/addSession'>
                <button className="btn btn-sm bg-green-500 text-white mb-5 ml-5">Add session</button>
            </Link>

            <div className="overflow-x-auto mt-6">
                <table className="table  w-full">
                    <thead className="text-black">
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Speaker</th>
                            <th>Time</th>
                            <th>Duration</th>
                            <th>Link</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sessions.map((session, index) => (
                            <tr key={session._id}>
                                <td>{index + 1}</td>
                                <td>{session.title}</td>
                                <td>{session.description}</td>
                                <td>{session.speaker}</td>
                                <td>{session.scheduledTime}</td>
                                <td>{session.durationMinutes} min</td>
                                <td>
                                    <a
                                        href={session.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        Join
                                    </a>
                                </td>
                                <td className="space-x-2">
                                    <Link to={`/dashboard/support/${session._id}`}>
                                        <button
                                            className="btn btn-xs bg-green-500 text-white mb-1"
                                        >
                                            Update
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(session._id)}
                                        className="btn btn-xs bg-red-500 text-white"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {sessions.length === 0 && (
                            <tr>
                                <td colSpan="8" className="text-center py-4">
                                    No sessions available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminSession;
