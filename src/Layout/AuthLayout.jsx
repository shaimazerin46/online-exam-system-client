import { Outlet } from "react-router";
import Nav from "../Components/LayoutComponents/Nav";
import { Toaster } from "react-hot-toast";


const AuthLayout = () => {
    return (
        <div>
            <Nav></Nav>
            <Outlet></Outlet>
            <Toaster />
        </div>
    );
};

export default AuthLayout;