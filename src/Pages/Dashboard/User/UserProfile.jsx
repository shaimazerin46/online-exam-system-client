import { useContext } from "react";
import Headline from "../../../Components/Headline/Headline";
import useUser from "../../../hooks/useUser";
import { AuthContext } from "../../../Context/AuthProvider";

const UserProfile = () => {
    const [users] = useUser();
    const { user } = useContext(AuthContext);

    // Find the current user in the users array
    const currentUser = users?.find(u => u?.email === user?.email);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    {/* Profile Header */}
                    <div className="bg-indigo-700 px-6 py-8 text-center">
                        <div className="mx-auto h-24 w-24 rounded-full bg-white flex items-center justify-center text-indigo-700 text-4xl font-bold mb-4">
                        <img src={user.photoURL} className="h-full w-full rounded-full object-cover"></img>
                        </div>
                        <h2 className="text-2xl font-bold text-white">{currentUser?.name}</h2>
                        <p className="text-indigo-200">{currentUser?.email}</p>
                    </div>
                    
                    {/* Profile Details */}
                    <div className="px-6 py-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-sm font-medium text-gray-500">Name</h3>
                                <p className="mt-1 text-lg font-semibold text-gray-900">{currentUser?.name}</p>
                            </div>
                            
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                                <p className="mt-1 text-lg font-semibold text-gray-900">{currentUser?.email}</p>
                            </div>
                            
                            <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-medium text-gray-500">Badge</h3>
                            <div className="inline-flex mt-2 items-center px-4 py-2 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                                {currentUser?.badge }
                            </div>
                        </div>
                            
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="text-sm font-medium text-gray-500">Joining date</h3>
                                <p className="mt-1 text-lg font-semibold text-gray-900">
                                    {new Date(currentUser?.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                        
                       
                       
                    </div>
                    
                  
                </div>
            </div>
        </div>
    );
};

export default UserProfile;