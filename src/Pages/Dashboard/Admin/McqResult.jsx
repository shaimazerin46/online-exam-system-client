import { useEffect, useState } from "react";
import Headline from "../../../Components/Headline/Headline";
import useAxiosPublic from "../../../hooks/useAxiosPublic";


const McqResult = () => {

    const [results, setResults] = useState()
    const axiosPublic = useAxiosPublic()

    useEffect(()=>{
        axiosPublic.get('/results')
        .then(res=>{
            setResults(res.data)
        })
    },[])
    return (
        <div>
            <Headline text={"MCQ results"}></Headline>

            
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="text-sm">
                        <tr>
                            <th className="py-3 px-4 text-left">#</th>
                            <th className="py-3 px-4 text-left">Student email</th>
                            <th className="py-3 px-4 text-left">Subject</th>
                            <th className="py-3 px-4 text-left">Category</th>
                            <th className="py-3 px-4 text-left">Correct</th>
                            <th className="py-3 px-4 text-left">Wrong</th>
                            <th className="py-3 px-4 text-left">Marks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results?.map((result, index) => (
                            <tr key={result._id} className="text-sm ">
                                <td className="py-3 px-4">{index + 1}</td>
                                <td className="py-3 px-4">{result?.email}</td>
                                <td className="py-3 px-4">{result?.subject}</td>
                                <td className="py-3 px-4">{result?.category}</td>
                                
                                <td className="py-3 px-4">{result?.correct}</td>
                                <td className="py-3 px-4">{result?.wrong}</td>
                                <td className="py-3 px-4">{result?.correct}/{result?.correct + result?.wrong}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default McqResult;