import { useContext, useEffect, useState } from "react";
import Headline from "../../Components/Headline/Headline";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../Context/AuthProvider";
import ExamsCard from "../../Components/SharedComponents/ExamsCard";
import CqCard from "../../Components/SharedComponents/CqCard";


const AddedCq = () => {
    const [cqs,setCqs] = useState();
    const axiospublic = useAxiosPublic()
    const {user} = useContext(AuthContext)
    useEffect(()=>{
        axiospublic.get('/cq')
        .then(res=>{
            setCqs(res.data)
        })
    },[])

    const filterExam = cqs?.filter(exam=>exam.email===user?.email);
    return (
        <div className="max-w-7xl py-20 mx-auto">
            <Headline text={"Added CQ by you"}></Headline>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {filterExam?.map((exam) => (
                      
                        <CqCard key={exam._id} exam={exam} ></CqCard>
                    ))}
                </div>
        </div>
    );
};

export default AddedCq;