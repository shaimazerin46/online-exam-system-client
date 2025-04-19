import { useContext } from "react";
import useUser from "../hooks/useUser";
import { AuthContext } from "../Context/AuthProvider";
import { useLocation, Navigate } from "react-router";
import Swal from "sweetalert2";


const SessionRoute = ({children}) => {
    const [users] = useUser();
    const {user,loading} = useContext(AuthContext);
    const location = useLocation();
    
 
    
    if (loading || !users || users.length === 0) {
        return (
            <div className="h-screen flex justify-center items-center">
                <span className="loading loading-bars loading-lg text-warning"></span>
            </div>
        );
    }
    const filteredUser = users?.find(u=>u.email===user?.email)
    if(!filteredUser?.badge || filteredUser?.badge === 'none'){
        Swal.fire({
            icon: "error",
            text: "Subscribe a package first",
          });
          return <Navigate to="/" state={{ from: location }} replace />; 
    }
    return children;
       
};

export default SessionRoute;