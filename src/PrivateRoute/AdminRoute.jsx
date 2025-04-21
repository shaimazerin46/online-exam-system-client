import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { Navigate, useLocation } from "react-router";
import useUser from "../hooks/useUser";


const AdminRoute = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    const [users] = useUser();
    const filteredUser = users?.find(u=>u.email===user?.email);
    const isAdmin = filteredUser?.role==='admin'
    if (loading || !users || users.length === 0) {
        return (
            <div className="h-screen flex justify-center items-center">
                <span className="loading loading-bars loading-lg text-warning"></span>
            </div>
        );
    }
    if (isAdmin) {
        return children;
      }
      return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;