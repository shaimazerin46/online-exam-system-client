import { Outlet } from "react-router";
import Nav from "../Components/LayoutComponents/Nav";
import { Toaster } from "react-hot-toast";
import Footer from "../Components/LayoutComponents/Footer";


const AuthLayout = () => {
    return (
        <div>
            <Nav></Nav>
            <Outlet></Outlet>
            <Footer></Footer>
            <Toaster />
        </div>
    );
};

export default AuthLayout;