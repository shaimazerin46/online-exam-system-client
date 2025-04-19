import Headline from "../Components/Headline/Headline";
import ExamsCard from "../Components/SharedComponents/ExamsCard";
import useExam from "../hooks/useExam";
import useWishlist from "../hooks/useWishlist";


const WishlistPage = () => {
    const [wishlistItems] = useWishlist();
    const [exams] = useExam();

    const wishlisteIds = wishlistItems?.map(item=>item.id)
    const wishlistedExams = exams?.filter(exam=>wishlisteIds?.includes(exam._id));
   
    return (
        <div className="max-w-7xl mx-auto py-20">
            <Headline text={"Wishlisted exam"}></Headline>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {wishlistedExams?.map(exam => <ExamsCard exam={exam}></ExamsCard>)}
            </div>
        </div>
    );
};

export default WishlistPage;