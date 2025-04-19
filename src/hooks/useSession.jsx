import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useSession = () => {
    const axiosPublic = useAxiosPublic();

    const {data: sessions=[], refetch, error} = useQuery({
        queryKey: ['sessions'],
        queryFn: async ()=>{
            const res = await axiosPublic.get('/session');
            return res.data;
        }
    })
    return [sessions, refetch, error]
};

export default useSession;