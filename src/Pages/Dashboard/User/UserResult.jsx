import { useContext, useEffect, useState } from "react";
import Headline from "../../../Components/Headline/Headline";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../Context/AuthProvider";

const UserResult = () => {
    const [activeTab, setActiveTab] = useState("mcq");
    const [mcqResult, setMcqResult] = useState([]);
    const [cqResult, setCqResult] = useState([]);
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user?.email) {
            axiosPublic.get("/results")
                .then(res => {
                    const filteredMcq = res.data.filter(result => result.email === user.email);
                    setMcqResult(filteredMcq);
                });

            axiosPublic.get("/pdf")
                .then(res => {
                    const filteredCq = res.data.filter(result => result.email === user.email);
                    setCqResult(filteredCq);
                });
        }
    }, [user, axiosPublic]);

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <Headline text="Your Results" className="mb-8 text-center" />

                {/* Tabs */}
                <div className="flex flex-wrap gap-2 mb-8">
                    <button
                        onClick={() => setActiveTab("mcq")}
                        className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === "mcq"
                            ? "bg-indigo-600 text-white shadow-md"
                            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                            }`}
                    >
                        MCQ Results
                    </button>
                    <button
                        onClick={() => setActiveTab("cq")}
                        className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === "cq"
                            ? "bg-indigo-600 text-white shadow-md"
                            : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                            }`}
                    >
                        CQ Results
                    </button>
                </div>

                {/* Content */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    {activeTab === "mcq" ? (
                        <div>
                            <div className="px-6 py-4 bg-indigo-50 border-b border-indigo-100">
                                <h2 className="text-xl font-semibold text-indigo-800">MCQ Results</h2>
                                <p className="text-sm text-indigo-600">{mcqResult.length} records found</p>
                            </div>

                            {mcqResult.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correct</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wrong</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">{mcqResult.map((item, index) => (
                                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.subject}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">{item.correct}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">{item.wrong}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium"><span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">
                                                    {item.correct}/{item.correct + item.wrong}
                                                </span> </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td></tr>))}
                                        </tbody>
                                    </table>
                                </div>) : (<div className="p-8 text-center text-gray-500">
                                    No MCQ results found
                                </div>
                            )}
                        </div>) : (<div>
                            <div className="px-6 py-4 bg-indigo-50 border-b border-indigo-100">
                                <h2 className="text-xl font-semibold text-indigo-800">CQ Results</h2>
                                <p className="text-sm text-indigo-600">{cqResult.length} records found</p>
                            </div>

                            {cqResult.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam Name</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Given Marks</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Answers</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {cqResult.map((item, index) => (
                                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.examName}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        {item.givenMarks !== undefined ? (
                                                            <span className={`px-2 py-1 rounded-full text-xs ${item.givenMarks >= 70 ? 'bg-green-100 text-green-800' :
                                                                item.givenMarks >= 50 ? 'bg-yellow-100 text-yellow-800' :
                                                                    'bg-red-100 text-red-800'}`}>
                                                                {item.givenMarks}
                                                            </span>) : (<span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                                                                Pending </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.answers?.length || 0} submitted
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>) : (<div className="p-8 text-center text-gray-500">No CQ results found</div>)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserResult;