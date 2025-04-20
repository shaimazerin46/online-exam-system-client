import { useEffect, useState } from "react";
import Headline from "../../../Components/Headline/Headline";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link } from "react-router";
import Swal from "sweetalert2";


const AllCq = () => {
    const [cqs,setCqs] = useState();
    const axiosPublic = useAxiosPublic()

    useEffect(()=>{
        axiosPublic.get('/cq')
        .then(res=>{
            setCqs(res.data)
        })
    },[])

    const handleDelete = (id)=>{
        axiosPublic.delete(`/cq/${id}`)
         .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Good job!",
                                text: "Successfully deleted",
                                icon: "success"
                            });
                        
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
            <Headline text={"All CQ"}></Headline>

            <Link to='/dashboard/exams/addCq'>
                <button className="btn btn-sm bg-green-500 text-white mb-5 ml-5">Add CQ</button>
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
                        {cqs?.map((cq, index) => (
                            <tr
                                key={cq._id}
                                className="text-sm"
                            >
                                <td className="py-3 px-4">{index + 1}</td>
                                <td className="py-3 px-4">{cq?.name}</td>
                               
                                <td className="py-3 px-4 capitalize">{cq?.category}</td>
                                <td className="py-3 px-4 capitalize">{cq?.questions?.length}</td>

                                <td className="flex gap-1 ">
                                   <Link to={`/dashboard/cq/updateCq/${cq._id}`}>
                                   <button className="btn text-white btn-sm bg-green-500">Update</button>
                                   </Link>
                                    <button onClick={()=>handleDelete(cq._id)} className="btn btn-sm bg-red-500 text-white">Delete</button>
                                </td>
                                
                        
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllCq;