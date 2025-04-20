import { Link } from "react-router";
import Headline from "../../../Components/Headline/Headline";
import useExam from "../../../hooks/useExam";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const Exams = () => {
    const [exams, refetch] = useExam();
    const axiosSecure = useAxiosSecure();

    const handleDelete = (id) => {
        axiosSecure.delete(`/exams/${id}`)
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
    }
    return (
        <div>
            <Headline text={"All exams"}></Headline>

            <Link to='/dashboard/exams/addExam'>
                <button className="btn btn-sm bg-green-500 text-white mb-5 ml-5">Add exam</button>
            </Link>

            <div className="overflow-x-auto mb-20">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="text-sm">
                        <tr>
                            <th className="py-3 px-4 text-left">#</th>
                            <th className="py-3 px-4 text-left">Name</th>
                            <th className="py-3 px-4 text-left">Category</th>
                            <th className="py-3 px-4 text-left">Questions</th>

                            <th className="py-3 px-4 text-left">Action</th>

                        </tr>
                    </thead>
                    <tbody className="">
                        {exams?.map((exam, index) => (
                            <tr
                                key={exam._id}
                                className="text-sm"
                            >
                                <td className="py-3 px-4">{index + 1}</td>
                                <td className="py-3 px-4">{exam?.name}</td>

                                <td className="py-3 px-4 capitalize">{exam?.category}</td>
                                <td className="py-3 px-4 capitalize">{exam?.questions?.length}</td>

                                <td className="flex gap-1 ">
                                    <Link to={`/dashboard/exams/updateExam/${exam._id}`}>
                                        <button className="btn text-white btn-sm bg-green-500">Update</button>
                                    </Link>
                                    <button onClick={() => handleDelete(exam._id)} className="btn btn-sm bg-red-500 text-white">Delete</button>
                                </td>


                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Exams;