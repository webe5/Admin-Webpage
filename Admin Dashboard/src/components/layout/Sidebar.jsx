import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Store,
    UserCheck,
    MessageSquare,
    Map,
    Calendar,
    Box,
    ShoppingBag,
    BookOpen,
    Siren,
    Bell,
    BarChart3,
    LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: UserCheck, label: 'Guide Verification', path: '/dashboard/guides' },
    { icon: Store, label: 'Vendor Management', path: '/dashboard/vendors' },
    { icon: Users, label: 'Tourists', path: '/dashboard/tourists' },
    { icon: MessageSquare, label: 'Reviews', path: '/dashboard/reviews' },
    { icon: Map, label: 'Destinations', path: '/dashboard/destinations' },
    { icon: Calendar, label: 'Events', path: '/dashboard/events' },
    { icon: Box, label: 'AR/VR Assets', path: '/dashboard/assets' },
    { icon: ShoppingBag, label: 'Marketplace', path: '/dashboard/marketplace' },
    { icon: BookOpen, label: 'Knowledge Base', path: '/dashboard/knowledge-base' },
    { icon: Siren, label: 'SOS Console', path: '/dashboard/sos' },
    { icon: Bell, label: 'Notifications', path: '/dashboard/notifications' },
    { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
];

export default function Sidebar() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <aside className="w-64 bg-card/95 backdrop-blur-xl border-r border-border h-screen fixed left-0 top-0 overflow-y-auto z-50 hidden md:flex flex-col transition-colors duration-300">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
                    <Map className="w-8 h-8" />
                    TourismAdmin
                </h1>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                isActive
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )
                        }
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 mt-auto">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-destructive hover:bg-destructive/10 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
}
