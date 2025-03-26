
import Headline from "../Components/Headline/Headline";
import ExamsCard from "../Components/SharedComponents/ExamsCard";
import useExam from "../hooks/useExam";

const AllExams = () => {
    
    const [exams] = useExam();

    return (
        <div className="py-20">
            <div>
                <Headline text={"All exams"} />
            </div>
            
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {exams?.map((exam) => (
                        <ExamsCard key={exam._id} exam={exam} />
                    ))}
                </div>
        </div>
    );
};

export default AllExams;