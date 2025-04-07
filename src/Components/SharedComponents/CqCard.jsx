import { Link } from "react-router";
import WebButton from "../WebButton/WebButton";


const CqCard = ({exam}) => {
    const {name,description,questions,image,category,_id} = exam
    return (
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden p-4 hover:shadow-xl transition duration-300">
        <img src={image} alt={name} className="w-full h-40 object-cover rounded-t-lg" />
        <div className="p-4">
           <div className="flex justify-between items-center">
           <h2 className="text-xl font-semibold text-gray-800 mb-2">{name}</h2>
           <span className="inline-block mt-3 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">{category}</span>
           </div>
            <p className="text-gray-600 text-sm mb-4">{description}</p>
            <p className="mb-3 text-gray-700 font-medium">Questions: {Array.isArray(questions) ? questions.length : "No questions"}</p>
            <p className="mb-3 text-gray-700 font-medium">
  Marks: {questions?.reduce((total, question) => total + question.marks, 0)}
</p>
            

            <Link to={`/cqDetails/${_id}`}>
            <WebButton text={"Details"}></WebButton>
            </Link>
        </div>
    </div>
    );
};

export default CqCard;