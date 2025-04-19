import { Link } from "react-router";
import WebButton from "../WebButton/WebButton";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useWishlist from "../../hooks/useWishlist";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthProvider";



const ExamsCard = ({ exam }) => {
    const { name, description, questions, image, category, _id } = exam;
    const axiosPublic = useAxiosPublic();
    const [wishlistItems, refetch] = useWishlist();
    const [localWishlist, setLocalWishlist] = useState([]);
    const {user} = useContext(AuthContext)

    useEffect(() => {
        setLocalWishlist(wishlistItems);
    }, []);

    const isWishlisted = localWishlist?.some(item => item.id === _id)

    const handleWishlist = (id) => {

        const wishlisted = localWishlist?.find(w => w.id === id)
        if (wishlisted) {
            axiosPublic.delete(`/wishlist/${wishlisted._id}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        setLocalWishlist(prev => prev.filter(item => item.id !== id));
                        Swal.fire("Removed!", "Removed from wishlist", "info");
                        refetch();
                    }
                })
                .catch(error => {
                    Swal.fire("Error", error.message, "error");
                });
        }
        else {
            const data = {
                id: id,
                email: user?.email
            }
            axiosPublic.post('/wishlist', data)
                .then(res => {
                    if (res.data.insertedId) {
                        setLocalWishlist(prev => [...prev, { id }]);
                        Swal.fire({
                            title: "Good job!",
                            text: "Added to wishlist",
                            icon: "success"
                        });
                    }
                })
                .catch(error => {
                    Swal.fire({
                        icon: "error",

                        text: (error.message),

                    });
                })
        }
    }
    return (
    
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden p-4 hover:shadow-xl transition duration-300 flex flex-col h-full">
        <img src={image} alt={name} className="w-full h-40 object-cover rounded-t-lg" />
        
        <div className="flex-grow p-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{name}</h2>
                <span className="inline-block mt-3 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">{category}</span>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{description}</p>
            <p className="mb-3 text-gray-700 font-medium">Questions: {Array.isArray(questions) ? questions.length : "No questions"}</p>
        </div>
    
        <div className="flex justify-between items-center mt-4">
            <Link to={`/exams/details/${_id}`}>
                <WebButton text={"Details"} />
            </Link>
    
            <button onClick={() => handleWishlist(_id)} className="text-xl text-red-500">
                {isWishlisted ? <IoHeart /> : <IoMdHeartEmpty />}
            </button>
        </div>
    </div>
    

    );
};

export default ExamsCard;