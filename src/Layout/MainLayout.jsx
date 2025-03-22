import { Outlet } from 'react-router';
import Nav from '../Components/LayoutComponents/Nav';
import Footer from '../Components/LayoutComponents/Footer';


const MainLayout = () => {
    return (
        <div>
            <Nav></Nav>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;