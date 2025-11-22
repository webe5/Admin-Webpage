import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Users,
    UserCheck,
    Store,
    AlertCircle,
    Siren,
    MapPin,
    Calendar,
    Activity,
    TrendingUp,
    TrendingDown,
    ArrowRight,
    CheckCircle,
    Eye,
    Plus,
    Send
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';

// Sample data for charts
const touristGrowthData = [
    { month: 'Jan', tourists: 4000 },
    { month: 'Feb', tourists: 3000 },
    { month: 'Mar', tourists: 5000 },
    { month: 'Apr', tourists: 7800 },
    { month: 'May', tourists: 8900 },
    { month: 'Jun', tourists: 12000 },
];

const destinationData = [
    { name: 'Taj Mahal', visits: 4500 },
    { name: 'Gateway of India', visits: 3200 },
    { name: 'Red Fort', visits: 2800 },
    { name: 'Qutub Minar', visits: 2100 },
    { name: 'India Gate', visits: 1900 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

export default function Home() {
    const navigate = useNavigate();

    const stats = [
        {
            title: 'Total Tourists Registered',
            value: '12,345',
            change: '+12%',
            trend: 'up',
            icon: Users,
            color: 'bg-blue-500',
            path: '/dashboard/tourists'
        },
        {
            title: 'Active Guides',
            value: '543',
            change: '+5 new',
            trend: 'up',
            icon: UserCheck,
            color: 'bg-green-500',
            path: '/dashboard/guides'
        },
        {
            title: 'Active Vendors',
            value: '892',
            change: '+8 today',
            trend: 'up',
            icon: Store,
            color: 'bg-purple-500',
            path: '/dashboard/vendors'
        },
        {
            title: 'Pending Verifications',
            value: '28',
            change: 'Action needed',
            trend: 'neutral',
            icon: AlertCircle,
            color: 'bg-orange-500',
            path: '/dashboard/guides'
        },
        {
            title: "Today's SOS Alerts",
            value: '3',
            change: 'Live updates',
            trend: 'down',
            icon: Siren,
            color: 'bg-red-500',
            path: '/dashboard/sos'
        },
    ];

    const upcomingEvents = [
        { name: 'Diwali Festival', date: 'Nov 12, 2025', location: 'Delhi' },
        { name: 'Goa Carnival', date: 'Feb 15, 2026', location: 'Goa' },
        { name: 'Holi Celebration', date: 'Mar 8, 2026', location: 'Mathura' },
    ];

    const quickActions = [
        { label: 'Approve Vendors', icon: CheckCircle, path: '/vendors' },
        { label: 'Approve Guides', icon: UserCheck, path: '/guides' },
        { label: 'View SOS Live Map', icon: Siren, path: '/sos' },
        { label: 'Add Event', icon: Plus, path: '/events' },
        { label: 'Push Travel Advisory', icon: Send, path: '/notifications' },
        { label: 'Add Destination', icon: MapPin, path: '/destinations' },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-foreground">Dashboard Overview</h1>
                <p className="text-muted-foreground mt-2">Welcome back, Admin! Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {stats.map((stat, index) => (
                    <Card
                        key={index}
                        className="glass-card hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
                        onClick={() => navigate(stat.path)}
                    >
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <p className="text-muted-foreground text-sm font-medium mb-2">{stat.title}</p>
                                    <h3 className="text-3xl font-bold text-foreground mb-2">{stat.value}</h3>
                                    <div className="flex items-center gap-1">
                                        {stat.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                                        {stat.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500" />}
                                        <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-500' :
                                            stat.trend === 'down' ? 'text-red-500' :
                                                'text-orange-500'
                                            }`}>
                                            {stat.change}
                                        </span>
                                    </div>
                                </div>
                                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Tourist Growth Chart */}
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-foreground">Tourist Growth (Last 6 Months)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={touristGrowthData}>
                                <defs>
                                    <linearGradient id="colorTourists" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                                <YAxis stroke="hsl(var(--muted-foreground))" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--card))',
                                        borderRadius: 'var(--radius)',
                                        border: '1px solid hsl(var(--border))',
                                        color: 'hsl(var(--card-foreground))'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="tourists"
                                    stroke="hsl(var(--primary))"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorTourists)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Most Visited Destinations */}
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-foreground">Most Visited Destinations (This Week)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={destinationData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                                <YAxis stroke="hsl(var(--muted-foreground))" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'hsl(var(--card))',
                                        borderRadius: 'var(--radius)',
                                        border: '1px solid hsl(var(--border))',
                                        color: 'hsl(var(--card-foreground))'
                                    }}
                                />
                                <Bar dataKey="visits" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions & Upcoming Events */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Quick Actions */}
                <Card className="glass-card lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-foreground">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {quickActions.map((action, index) => (
                                <Button
                                    key={index}
                                    variant="outline"
                                    className="h-auto py-6 flex flex-col items-center gap-3 hover:bg-primary/10 hover:border-primary/50 border-border text-foreground hover:text-primary transition-all duration-200"
                                >
                                    <action.icon className="w-6 h-6 text-primary" />
                                    <span className="text-sm font-medium text-center">{action.label}</span>
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Upcoming Events */}
                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-foreground">Upcoming Festivals & Events</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {upcomingEvents.map((event, index) => (
                                <div key={index} className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Calendar className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-semibold text-foreground text-sm">{event.name}</h4>
                                        <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <MapPin className="w-3 h-3 text-muted-foreground" />
                                            <span className="text-xs text-muted-foreground">{event.location}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* System Health Panel */}
            <Card className="glass-card">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold text-foreground">System Health</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center">
                                <Activity className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Uptime</p>
                                <p className="text-xl font-bold text-foreground">99.9%</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center">
                                <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Server Load</p>
                                <p className="text-xl font-bold text-foreground">45%</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center">
                                <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">API Response</p>
                                <p className="text-xl font-bold text-foreground">120ms</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center">
                                <Activity className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Active Users</p>
                                <p className="text-xl font-bold text-foreground">1,234</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
