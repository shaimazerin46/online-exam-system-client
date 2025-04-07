import { useEffect, useState } from "react";
import Headline from "../Components/Headline/Headline";
import useAxiosPublic from "../hooks/useAxiosPublic";
import CqCard from "../Components/SharedComponents/CqCard";


const CqTest = () => {
    const [exams,setExams] = useState();
    const axiosPublic = useAxiosPublic();

    useEffect(()=>{
        axiosPublic.get('/cq')
        .then(res=>setExams(res.data))
    },[])
    return (
        <div className="py-20 max-w-7xl mx-auto ">
            <Headline text={"CQ paper"}></Headline>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {
                    exams?.map(exam=><CqCard key={exam._id} exam={exam}></CqCard>)
                }
                </div>

                

        </div>
    );
};

export default CqTest;