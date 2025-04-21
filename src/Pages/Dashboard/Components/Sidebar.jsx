import { useContext } from "react";
import useUser from "../../../hooks/useUser";
import { AuthContext } from "../../../Context/AuthProvider";
import { NavLink, useNavigate } from "react-router-dom";
import { FiHome, FiUser, FiSettings, FiLogOut, FiX } from "react-icons/fi";
import { FaHeart, FaMoneyCheck, FaUserShield } from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";
import { GrMultiple } from "react-icons/gr";
import { TfiWrite } from "react-icons/tfi";
import { FaAward } from "react-icons/fa6";
import { FaAlignCenter } from "react-icons/fa";
import { FaArrowsAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { MdOutlineSupportAgent, MdSupportAgent } from "react-icons/md";
import { MdUnsubscribe } from "react-icons/md";
import { SiTestrail } from "react-icons/si";

const Sidebar = ({ onClose }) => {
    const [users] = useUser();
    const { user, logout } = useContext(AuthContext);
    const filtereduser = users?.find(u => u.email === user?.email);
    const isAdmin = filtereduser?.role === 'admin';
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
            .then(()=>{
                 Swal.fire({
                                 title: "Good job!",
                                 text: "Successfully logged out!",
                                 icon: "success"
                               });
                 navigate('/auth')
               })
    };

    return (
        <div className="h-full flex flex-col">
            {/* Sidebar header */}
            <div className="p-4 flex items-center justify-between border-b border-gray-700">
                <h1 className="text-xl font-bold">Dashboard</h1>
                <button 
                    className="md:hidden text-white"
                    onClick={onClose}
                >
                    <FiX size={24} />
                </button>
            </div>

            {/* User profile */}
            <div className="p-4 flex items-center space-x-3 border-b border-gray-700">
                <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                    {user?.photoURL ? (
                        <img src={user.photoURL} alt="Profile" className="w-full h-full rounded-full object-cover" />
                    ) : (
                        <span className="text-lg">{user?.email?.charAt(0).toUpperCase()}</span>
                    )}
                </div>
                <div>
                    <p className="font-medium">{user?.displayName || 'User'}</p>
                    <p className="text-xs text-gray-400">{filtereduser?.role}</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 overflow-y-auto">
                <ul className="space-y-2">
                   
                    
                    {!isAdmin && (
                       
                        <>
                         <li>
                        <NavLink 
                            to="/dashboard/userProfile" 
                            className={({ isActive }) => 
                                `flex items-center p-2 rounded transition ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
                            }
                            onClick={onClose}
                        >
                            <FiUser className="mr-3" />
                            Profile
                        </NavLink>
                    </li>
                        
                        <li>
                        <NavLink 
                            to="/dashboard/userResult" 
                            className={({ isActive }) => 
                                `flex items-center p-2 rounded transition ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
                            }
                            onClick={onClose}
                        >
                            <FaAward  className="mr-3" />
                            Result
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/dashboard/payment" 
                            className={({ isActive }) => 
                                `flex items-center p-2 rounded transition ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
                            }
                            onClick={onClose}
                        >
                            <FaMoneyCheck  className="mr-3" />
                            Payment history
                        </NavLink>
                    </li>
                        </>
                    )}

                    {isAdmin && (
                        <>
                            <li>
                                <NavLink 
                                    to="/dashboard/users" 
                                    className={({ isActive }) => 
                                        `flex items-center p-2 rounded transition ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
                                    }
                                    onClick={onClose}
                                >
                                    <FaUserShield className="mr-3" />
                                    Manage Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/dashboard/exams" 
                                    className={({ isActive }) => 
                                        `flex items-center p-2 rounded transition ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
                                    }
                                    onClick={onClose}
                                >
                                    <FaNoteSticky  className="mr-3" />
                                     Exams
                                </NavLink>
                            </li>

                            <li>
                                <NavLink 
                                    to="/dashboard/cq" 
                                    className={({ isActive }) => 
                                        `flex items-center p-2 rounded transition ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
                                    }
                                    onClick={onClose}
                                >
                                    <TfiWrite className="mr-3" />
                                     CQ questions
                                </NavLink>
                            </li>

                            <li>
                                <NavLink 
                                    to="/dashboard/mcqResults" 
                                    className={({ isActive }) => 
                                        `flex items-center p-2 rounded transition ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
                                    }
                                    onClick={onClose}
                                >
                                    <GrMultiple className="mr-3" />
                                     MCQ results
                                </NavLink>
                            </li>

                            <li>
                                <NavLink 
                                    to="/dashboard/cqResults" 
                                    className={({ isActive }) => 
                                        `flex items-center p-2 rounded transition ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
                                    }
                                    onClick={onClose}
                                >
                                    <FaAward className="mr-3 text-xl" />
                                     CQ results
                                </NavLink>
                            </li>

                            <li>
                                <NavLink 
                                    to="/dashboard/support" 
                                    className={({ isActive }) => 
                                        `flex items-center p-2 rounded transition ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
                                    }
                                    onClick={onClose}
                                >
                                    <MdSupportAgent className="mr-3 text-xl" />
                                     Sessions
                                </NavLink>
                            </li>

                        
                            
                        </>
                    )}
   
 
                    {/* Home */}
                    <div className="p-4 border-t border-gray-700">
                    <li >
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => 
                                `flex items-center p-2 rounded transition ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
                            }
                            onClick={onClose}
                        >
                            <FiHome className="mr-3" />
                            Home
                        </NavLink>
                    </li>

                   {!isAdmin && <>
                    <li >
                        <NavLink 
                            to="/allExams" 
                            className={({ isActive }) => 
                                `flex items-center p-2 rounded transition ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
                            }
                            onClick={onClose}
                        >
                            <FaNoteSticky className="mr-3" />
                            Exams
                        </NavLink>
                    </li>
                    <li >
                        <NavLink 
                            to="/cqTest" 
                            className={({ isActive }) => 
                                `flex items-center p-2 rounded transition ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
                            }
                            onClick={onClose}
                        >
                            <SiTestrail className="mr-3" />
                            CQ test
                        </NavLink>
                    </li>
                    <li >
                        <NavLink 
                            to="/session" 
                            className={({ isActive }) => 
                                `flex items-center p-2 rounded transition ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
                            }
                            onClick={onClose}
                        >
                            <MdOutlineSupportAgent className="mr-3" />
                            Support
                        </NavLink>
                    </li>
                    <li >
                        <NavLink 
                            to="/wishlist" 
                            className={({ isActive }) => 
                                `flex items-center p-2 rounded transition ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
                            }
                            onClick={onClose}
                        >
                            <FaHeart className="mr-3" />
                            Wishlist
                        </NavLink>
                    </li>
                   </>}

                    {isAdmin &&  <li >
                        <NavLink 
                            to="/adminExam" 
                            className={({ isActive }) => 
                                `flex items-center p-2 rounded transition ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
                            }
                            onClick={onClose}
                        >
                            <FaAlignCenter className="mr-3" />
                            Added MCQ
                        </NavLink>
                    </li>}

                    {isAdmin &&  <li >
                        <NavLink 
                            to="/adminCq" 
                            className={({ isActive }) => 
                                `flex items-center p-2 rounded transition ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
                            }
                            onClick={onClose}
                        >
                            <FaArrowsAlt  className="mr-3" />
                            Added CQ
                        </NavLink>
                    </li>}
                    <button 
                    onClick={handleLogout}
                    className="flex items-center w-full p-2 rounded hover:bg-gray-700 transition"
                >
                    <FiLogOut className="mr-3" />
                    Logout
                </button>
                    </div>
                </ul>
            </nav>

           
        </div>
    );
};

export default Sidebar;