import { Outlet } from "react-router";
import Nav from "../Components/LayoutComponents/Nav";


const AuthLayout = () => {
    return (
        <div>
            <Nav></Nav>
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayout;