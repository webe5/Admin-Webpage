import React, { useState } from 'react';
import {
    Bell,
    Plus,
    Send,
    Users,
    MapPin,
    AlertTriangle,
    Info,
    CheckCircle,
    Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const notifications = [
    {
        id: 1,
        title: 'Heavy Rain Alert - Kerala',
        message: 'Heavy rainfall expected in Kerala region. Tourists advised to avoid water activities.',
        type: 'warning',
        targetAudience: 'Tourists in Kerala',
        sentDate: '2024-11-21 10:30 AM',
        status: 'sent',
        recipients: 2500,
        readCount: 1800
    },
    {
        id: 2,
        title: 'Festival Celebration - Diwali',
        message: 'Join the grand Diwali celebrations across India. Special events and discounts available.',
        type: 'info',
        targetAudience: 'All Tourists',
        sentDate: '2024-11-20 09:00 AM',
        status: 'sent',
        recipients: 12000,
        readCount: 9500
    },
    {
        id: 3,
        title: 'Road Closure - Agra Highway',
        message: 'NH-2 highway to Agra temporarily closed for maintenance. Use alternative routes.',
        type: 'alert',
        targetAudience: 'Tourists traveling to Agra',
        sentDate: '2024-11-19 02:15 PM',
        status: 'sent',
        recipients: 1200,
        readCount: 1100
    },
    {
        id: 4,
        title: 'New Destination Added - Hampi',
        message: 'Explore the newly added UNESCO World Heritage Site - Hampi. Book your tours now!',
        type: 'success',
        targetAudience: 'All Tourists',
        sentDate: '2024-11-18 11:00 AM',
        status: 'sent',
        recipients: 15000,
        readCount: 8200
    },
    {
        id: 5,
        title: 'Safety Advisory - Delhi',
        message: 'Air quality index in Delhi is poor. Tourists with respiratory issues should take precautions.',
        type: 'warning',
        targetAudience: 'Tourists in Delhi',
        sentDate: '2024-11-17 08:00 AM',
        status: 'sent',
        recipients: 3500,
        readCount: 3200
    },
];

const templates = [
    { id: 1, name: 'Weather Alert', category: 'Safety' },
    { id: 2, name: 'Event Announcement', category: 'Events' },
    { id: 3, name: 'Travel Advisory', category: 'Safety' },
    { id: 4, name: 'Promotional Offer', category: 'Marketing' },
];

export default function Notifications() {
    const [showCreateForm, setShowCreateForm] = useState(false);

    const getTypeIcon = (type) => {
        switch (type) {
            case 'warning': return <AlertTriangle className="w-5 h-5 text-orange-600" />;
            case 'alert': return <AlertTriangle className="w-5 h-5 text-red-600" />;
            case 'info': return <Info className="w-5 h-5 text-blue-600" />;
            case 'success': return <CheckCircle className="w-5 h-5 text-green-600" />;
            default: return <Bell className="w-5 h-5 text-gray-600" />;
        }
    };

    const getTypeBadge = (type) => {
        switch (type) {
            case 'warning': return 'warning';
            case 'alert': return 'destructive';
            case 'info': return 'default';
            case 'success': return 'success';
            default: return 'secondary';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Notifications & Advisories</h1>
                    <p className="text-muted-foreground mt-2">Send alerts and updates to tourists</p>
                </div>
                <Button className="gap-2" onClick={() => setShowCreateForm(!showCreateForm)}>
                    <Plus className="w-4 h-4" />
                    Create Notification
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="glass-card border-border">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Total Sent</p>
                                <p className="text-3xl font-bold text-foreground">{notifications.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <Send className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card border-border">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Total Recipients</p>
                                <p className="text-3xl font-bold text-purple-600">
                                    {(notifications.reduce((sum, n) => sum + n.recipients, 0) / 1000).toFixed(1)}K
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <Users className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card border-border">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Read Rate</p>
                                <p className="text-3xl font-bold text-green-600">
                                    {((notifications.reduce((sum, n) => sum + n.readCount, 0) /
                                        notifications.reduce((sum, n) => sum + n.recipients, 0)) * 100).toFixed(0)}%
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card border-border">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Active Alerts</p>
                                <p className="text-3xl font-bold text-orange-600">
                                    {notifications.filter(n => n.type === 'warning' || n.type === 'alert').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                <AlertTriangle className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Create Form */}
            {showCreateForm && (
                <Card className="glass-card border-border">
                    <CardHeader>
                        <CardTitle className="text-foreground">Create New Notification</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground mb-2 block">Title</label>
                                <input
                                    type="text"
                                    placeholder="Notification title"
                                    className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground mb-2 block">Type</label>
                                <select className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground">
                                    <option>Info</option>
                                    <option>Warning</option>
                                    <option>Alert</option>
                                    <option>Success</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-muted-foreground mb-2 block">Message</label>
                            <textarea
                                rows={4}
                                placeholder="Notification message"
                                className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder:text-muted-foreground"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground mb-2 block">Target Audience</label>
                                <select className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground">
                                    <option>All Tourists</option>
                                    <option>Tourists in specific location</option>
                                    <option>Active tour participants</option>
                                    <option>Registered users</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground mb-2 block">Template (Optional)</label>
                                <select className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground">
                                    <option>None</option>
                                    {templates.map(t => (
                                        <option key={t.id}>{t.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-3 pt-4">
                            <Button className="gap-2">
                                <Send className="w-4 h-4" />
                                Send Now
                            </Button>
                            <Button variant="outline">Schedule for Later</Button>
                            <Button variant="ghost" onClick={() => setShowCreateForm(false)}>Cancel</Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Notifications List */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">Recent Notifications</h2>
                {notifications.map((notification) => (
                    <Card key={notification.id} className="glass-card border-border hover:shadow-xl transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                                    {getTypeIcon(notification.type)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <h3 className="font-bold text-foreground mb-1">{notification.title}</h3>
                                            <Badge variant={getTypeBadge(notification.type)} className="text-xs">
                                                {notification.type}
                                            </Badge>
                                        </div>
                                        <div className="text-right">
                                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                <Clock className="w-4 h-4" />
                                                <span>{notification.sentDate}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-muted-foreground mb-3">{notification.message}</p>
                                    <div className="flex items-center gap-6 text-sm">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <Users className="w-4 h-4" />
                                            <span>{notification.recipients.toLocaleString()} recipients</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <CheckCircle className="w-4 h-4" />
                                            <span>{notification.readCount.toLocaleString()} read</span>
                                        </div>
                                        <div className="text-muted-foreground">
                                            <span>Target: {notification.targetAudience}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
