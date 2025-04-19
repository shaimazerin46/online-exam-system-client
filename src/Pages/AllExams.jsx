
import { useEffect, useState } from "react";
import Headline from "../Components/Headline/Headline";
import ExamsCard from "../Components/SharedComponents/ExamsCard";
import useAxiosPublic from "../hooks/useAxiosPublic";

const AllExams = () => {
    
    const [exams,setExams] = useState();
    const axiosPublic = useAxiosPublic();
    const [search,setSearch] = useState('');
    const [category,setCategory] = useState('all');

    useEffect(()=>{
        axiosPublic.get(`/exams?search=${search}&category=${category}`)
        .then(res=>setExams(res.data))
    },[search,category])


    return (
        <div className="py-20 max-w-7xl mx-auto ">
            <div>
                <Headline text={"All exams"} />
            </div>

            {/* search and filter part */}
            <div className="text-center flex gap-5 justify-center mb-10">

            <input type="text"
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
             placeholder="Search" className="input border-0 border-b-[1px] outline-0 focus:outline-none " />

             <select
              className="select focus:outline-0 border border-gray-300 px-4 py-2 rounded"
             value={category}
             onChange={(e)=>setCategory(e.target.value)}
              name="" id="">
                <option value="all">All categories</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
             </select>
            </div>
            
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {exams?.map((exam) => (
                        <ExamsCard key={exam._id} exam={exam} />
                    ))}
                </div>
        </div>
    );
};

export default AllExams;