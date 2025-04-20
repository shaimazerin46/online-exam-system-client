import { useContext } from "react";
import Headline from "../../Components/Headline/Headline";
import useExam from "../../hooks/useExam";
import { AuthContext } from "../../Context/AuthProvider";
import ExamsCard from "../../Components/SharedComponents/ExamsCard";


const AddedExams = () => {
    const [exams] = useExam();
    const {user} = useContext(AuthContext);

    const filterExam = exams?.filter(exam=>exam.email===user?.email);
   
    return (
        <div className="max-w-7xl mx-auto py-20">
            <Headline text={"Exams added by you"}></Headline>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {filterExam?.map((exam) => (
                        <ExamsCard key={exam._id} exam={exam} />
                    ))}
                </div>
        </div>
    );
};

export default AddedExams;