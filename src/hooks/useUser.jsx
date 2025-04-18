import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useUser = () => {
    const axiosPublic = useAxiosPublic();
   const {data: users=[], refetch, error} = useQuery({
    queryKey: ['users'],
    queryFn: async()=>{
       const res = await axiosPublic.get('/users')
       return res.data;

    }
   });
   return [users,refetch,error]
};

export default useUser;