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

                <div className="relative w-full h-screen overflow-hidden bg-blue-200">
  <div className="absolute bottom-0 w-full">
    <svg
      className="w-full h-40 animate-wave"
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
    >
      <path
        fill="#3b82f6"
        fillOpacity="1"
        d="M0,160L60,149.3C120,139,240,117,360,133.3C480,149,600,203,720,197.3C840,192,960,128,1080,122.7C1200,117,1320,171,1380,197.3L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
      ></path>
    </svg>
  </div>

  <div className="flex items-center justify-center h-full">
    <h1 className="text-4xl font-bold text-white">Wavy Vibes</h1>
  </div>
</div>
        </div>
    );
};

export default CqTest;