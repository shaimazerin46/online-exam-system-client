import { Outlet } from "react-router";
import Nav from "../Components/LayoutComponents/Nav";
import Footer from "../Components/LayoutComponents/Footer";


const AuthLayout = () => {
    return (
        <div>
            <Nav></Nav>
            <Outlet></Outlet>
            <Footer></Footer>
          
        </div>
    );
};

export default AuthLayout;