import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://online-examination-system-server.vercel.app/'
})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;