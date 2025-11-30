import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function Layout() {
    return (
        <div className="min-h-screen bg-background font-sans text-foreground flex transition-colors duration-300">
            <Sidebar />
            <main className="flex-1 md:ml-64 relative">
                <Topbar />
                <div className="p-8 max-w-7xl mx-auto space-y-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
