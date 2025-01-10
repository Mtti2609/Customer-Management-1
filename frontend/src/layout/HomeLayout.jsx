import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import Slidebar from "../Components/Slidebar/Slidebar";

const HomeLayout = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed((prev) => !prev);
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            {/* Header */}
            <Header toggleSidebar={toggleSidebar} />

            <div className="d-flex flex-grow-1">
                {/* Sidebar */}
                <div
                    className={`sidebar-wrapper bg-dark text-white p-0 ${
                        isSidebarCollapsed ? "d-none d-md-block" : "d-block"
                    }`}
                    style={{
                        width: isSidebarCollapsed ? "80px" : "250px",
                        transition: "width 0.3s ease",
                        overflow: "hidden",
                    }}
                >
                    <Slidebar isCollapsed={isSidebarCollapsed} />
                </div>

                {/* Main content area */}
                <div className="main-content-wrapper flex-grow-1 d-flex flex-column">
                    {/* Scrollable content */}
                    <main className="content flex-grow-1 p-4 bg-light overflow-auto">
                        <Outlet />
                    </main>

                    {/* Footer */}
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default HomeLayout;
