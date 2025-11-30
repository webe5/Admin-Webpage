import React from 'react';
import { Bell, Search, User, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

export default function Topbar() {
    const { theme, setTheme } = useTheme();

    return (
        <header className="h-20 bg-white dark:bg-card border-b border-neutral-100 dark:border-border sticky top-0 z-40 px-8 flex items-center justify-between transition-colors duration-300">
            <div className="flex items-center gap-4 flex-1 max-w-xl">
                <div className="relative w-full max-w-md hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-2 rounded-full bg-neutral-100 dark:bg-muted/50 border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                <button className="relative p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-muted transition-colors">
                    <Bell className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-card"></span>
                </button>

                <div className="flex items-center gap-3 pl-4 border-l border-neutral-200 dark:border-border ml-2">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-foreground">Admin User</p>
                        <p className="text-xs text-muted-foreground">Super Admin</p>
                    </div>
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                        <User className="w-5 h-5 text-primary" />
                    </div>
                </div>
            </div>
        </header>
    );
}
