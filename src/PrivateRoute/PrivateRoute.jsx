import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom"; // Fixed import
import { AuthContext } from "../Context/AuthProvider";
import useUser from "../hooks/useUser";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    const [users] = useUser();
    const filteredUser = users?.find(u=>u.email===user?.email);
    const isAdmin = filteredUser?.role==='admin'

    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <span className="loading loading-bars loading-lg text-warning"></span>
            </div>
        );
    }
    if (!isAdmin) {
        return children;
      }
    return user ? children : <Navigate to="/auth" state={{ from: location }} replace />;
};

export default PrivateRoute;