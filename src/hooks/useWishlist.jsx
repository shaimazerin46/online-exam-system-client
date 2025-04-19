import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useWishlist = () => {
    const axiosPublic = useAxiosPublic();
    const {data: wishlistItems=[], refetch, error} = useQuery({
        queryKey: ['wishlistItems'],
        queryFn: async ()=>{
            const res = await axiosPublic.get('/wishlist')
            return res.data
        }
    })
    return [wishlistItems,refetch, error]
};

export default useWishlist;