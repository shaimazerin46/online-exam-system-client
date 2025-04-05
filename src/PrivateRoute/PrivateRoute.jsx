import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom"; // Fixed import
import { AuthContext } from "../Context/AuthProvider";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center">
                <span className="loading loading-bars loading-lg text-warning"></span>
            </div>
        );
    }

    return user ? children : <Navigate to="/auth" state={{ from: location }} replace />;
};

export default PrivateRoute;