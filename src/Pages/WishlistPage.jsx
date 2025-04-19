import { useEffect, useState } from "react";
import Headline from "../Components/Headline/Headline";
import ExamsCard from "../Components/SharedComponents/ExamsCard";
import useExam from "../hooks/useExam";
import useWishlist from "../hooks/useWishlist";
import useAxiosPublic from "../hooks/useAxiosPublic";

const WishlistPage = () => {
    const [wishlistItems] = useWishlist();
    const [exams] = useExam();
    const [cqExams, setCqExams] = useState([]);
    const [activeTab, setActiveTab] = useState('exams');
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axiosPublic.get('/cq')
            .then(res => {
                setCqExams(res.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching CQ exams:", error);
                setLoading(false);
            });
    }, []);

    const wishlistedIds = wishlistItems?.map(item => item.id);
    const wishlistedExams = exams?.filter(exam => wishlistedIds?.includes(exam._id));
    const wishlistedCq = cqExams?.filter(exam => wishlistedIds?.includes(exam._id));
    const displayExams = activeTab === 'exams' ? wishlistedExams : wishlistedCq;

    return (
        <div className="max-w-7xl mx-auto py-20">
            <Headline text="My Wishlist" />
            
         
            <div className="flex  mb-8">
                <button
                    className={`py-2 px-4 font-medium ${activeTab === 'exams' ? 'secendary-color border-b-2 border-blue-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('exams')}
                >
                    Regular Exams
                </button>
                <button
                    className={`py-2 px-4 font-medium ${activeTab === 'cq' ? 'secendary-color border-b-2 border-blue-600' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('cq')}
                >
                    CQ Exams
                </button>
            </div>
            {loading ? (
                <div className="h-screen flex justify-center items-center">
                <span className="loading loading-bars loading-lg text-warning"></span>
            </div>
            ) : (
                <>
                    {displayExams?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {displayExams.map(exam => (
                                <ExamsCard key={exam._id} exam={exam} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                                No {activeTab === 'exams' ? 'regular exams' : 'CQ exams'} saved
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                {activeTab === 'exams' 
                                    ? 'Save regular exams to view them here' 
                                    : 'Save CQ exams to view them here'}
                            </p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default WishlistPage;