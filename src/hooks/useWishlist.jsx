import React, { useContext } from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Context/AuthProvider';

const useWishlist = () => {
    const axiosPublic = useAxiosPublic();
    const {user} = useContext(AuthContext)
    const {data: wishlistItems=[], refetch, error} = useQuery({
        queryKey: ['wishlistItems'],
        queryFn: async ()=>{
            const res = await axiosPublic.get(`/wishlist?email=${user?.email}`)
            return res.data
        },
        enabled: !!user?.email
    })
    return [wishlistItems,refetch, error]
};

export default useWishlist;