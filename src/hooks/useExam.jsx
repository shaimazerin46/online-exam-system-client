import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useExam = () => {
   const axiosPublic = useAxiosPublic();
   const {data: exams=[], refetch, error} = useQuery({
    queryKey: ['exams'],
    queryFn: async ()=>{
        const res = await axiosPublic.get('/exams')
        return res.data
    }
   });
   return [exams,refetch,error]
};

export default useExam;