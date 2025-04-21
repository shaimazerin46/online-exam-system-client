import { useContext, useState, useEffect } from "react";
import Headline from "../../../Components/Headline/Headline";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { AuthContext } from "../../../Context/AuthProvider";

const Payment = () => {
    const [payments, setPayments] = useState([]);
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        axiosPublic.get('/payment')
            .then(res => {
                const userPayments = res.data.filter(payment => payment.email === user?.email);
                setPayments(userPayments);
            })
            .catch(err => console.error("Error fetching payments:", err));
    }, [axiosPublic, user?.email]);

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-md mx-auto">
                <Headline text={"Payment History"} className="mb-6 text-center" />
                
                <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold text-white">{user?.displayName || "Shaima Zerin"}</h2>
                                <p className="text-indigo-100 text-sm">{user?.email || "shaimazerin46@gmail.com"}</p>
                            </div>
                            <div className="bg-white/20 rounded-full px-3 py-1">
                                <span className="text-white font-medium">
                                    ${payments.reduce((total, p) => total + (p.price || 0), 0).toFixed(2)}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {payments.length === 0 ? (
                            <p className="text-gray-500 text-center py-4">No payments found</p>
                        ) : (
                            <ul className="space-y-4">
                                {payments.map((payment, index) => (
                                    <li key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{payment.Package_name || "Premium"}</h3>
                                                <p className="text-sm text-gray-500">
                                                    {new Date(payment.date || "2025-04-18").toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-indigo-600">${payment.price?.toFixed(2) || "29.99"}</p>
                                                <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-indigo-50 text-indigo-600">
                                                    Completed
                                                </span>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                 
                </div>
            </div>
        </div>
    );
};

export default Payment;