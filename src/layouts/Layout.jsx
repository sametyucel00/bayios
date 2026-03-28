import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import BottomNav from '../components/BottomNav';

const Layout = ({ currentView, setCurrentView, children, onLogout, user }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-slate-100/50 font-sans">
            <Sidebar
                currentView={currentView}
                setCurrentView={setCurrentView}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                onLogout={onLogout}
                user={user}
            />

            <main className="flex-1 md:pl-80 transition-all duration-300 w-full mb-24 md:mb-0 print:pl-0 print:m-0 print:p-0 overflow-x-hidden">
                {children}
            </main>

            <BottomNav
                currentView={currentView}
                setCurrentView={setCurrentView}
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                user={user}
                isSidebarOpen={isSidebarOpen}
            />
        </div>
    );
};

export default Layout;
