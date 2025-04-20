import { Outlet } from "react-router";
import Footer from "../Components/LayoutComponents/Footer";
import Sidebar from "../Pages/Dashboard/Components/Sidebar";
import { useState } from "react";

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Mobile sidebar toggle button */}
            <button 
                className="md:hidden fixed top-4 left-4 z-50 bg-transparent secendary-color p-2 rounded"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                ☰
            </button>

            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'block' : 'hidden'} md:block md:relative fixed inset-0 z-40 w-64 bg-gray-800 text-white transition-all duration-300`}>
                <Sidebar onClose={() => setSidebarOpen(false)} />
            </div>
            
            {/* Content */}
            <div className="w-full">
                <Outlet />
                <Footer />
            </div>
            
        </div>
    );
};

export default DashboardLayout;