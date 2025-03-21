import { Outlet } from 'react-router';
import Nav from '../Components/LayoutComponents/Nav';

const MainLayout = () => {
    return (
        <div>
            <Nav></Nav>
            <Outlet></Outlet>
        </div>
    );
};

export default MainLayout;