import React from 'react';
import { Bell, Search, User, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function Topbar() {
    const { theme, setTheme } = useTheme();

    return (
        <header className="h-20 bg-card/80 backdrop-blur-xl border-b border-border sticky top-0 z-40 px-8 flex items-center justify-between transition-colors duration-300">
            <div className="flex items-center gap-4 flex-1 max-w-xl">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search anything..."
                        className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring/50 transition-all text-foreground placeholder:text-muted-foreground"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                >
                    {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                </button>

                <button className="relative p-2 rounded-full hover:bg-muted transition-colors">
                    <Bell className="w-6 h-6 text-muted-foreground hover:text-foreground" />
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-card"></span>
                </button>

                <div className="flex items-center gap-3 pl-6 border-l border-border">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-foreground">Admin User</p>
                        <p className="text-xs text-muted-foreground">Super Admin</p>
                    </div>
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                        <User className="w-6 h-6 text-primary" />
                    </div>
                </div>
            </div>
        </header>
    );
}
