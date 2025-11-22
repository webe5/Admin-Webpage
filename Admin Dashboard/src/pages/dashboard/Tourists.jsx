import React, { useState } from 'react';
import {
    Search,
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Flag,
    AlertTriangle,
    Ban,
    Eye,
    Shield
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const tourists = [
    {
        id: 1,
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+1 555-0123',
        country: 'United States',
        registeredDate: '2024-11-15',
        status: 'active',
        tripsCompleted: 3,
        currentTrip: 'Taj Mahal Tour',
        warnings: 0,
        isBlacklisted: false,
        lastActive: '2 hours ago'
    },
    {
        id: 2,
        name: 'Emma Wilson',
        email: 'emma.wilson@email.com',
        phone: '+44 20 7123 4567',
        country: 'United Kingdom',
        registeredDate: '2024-10-20',
        status: 'active',
        tripsCompleted: 5,
        currentTrip: 'Kerala Backwaters',
        warnings: 0,
        isBlacklisted: false,
        lastActive: '1 day ago'
    },
    {
        id: 3,
        name: 'Michael Chen',
        email: 'michael.chen@email.com',
        phone: '+86 138 0000 0000',
        country: 'China',
        registeredDate: '2024-09-10',
        status: 'reported',
        tripsCompleted: 2,
        currentTrip: null,
        warnings: 2,
        isBlacklisted: false,
        lastActive: '3 days ago',
        reportReason: 'Inappropriate behavior reported by guide'
    },
    {
        id: 4,
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '+1 555-0456',
        country: 'Canada',
        registeredDate: '2024-08-05',
        status: 'active',
        tripsCompleted: 8,
        currentTrip: 'Rajasthan Heritage Tour',
        warnings: 0,
        isBlacklisted: false,
        lastActive: '5 hours ago'
    },
];

const tripHistory = [
    { destination: 'Taj Mahal', date: '2024-11-01', guide: 'Rajesh Kumar', rating: 5 },
    { destination: 'Jaipur City Tour', date: '2024-10-15', guide: 'Priya Sharma', rating: 4 },
    { destination: 'Goa Beaches', date: '2024-09-20', guide: 'Amit Patel', rating: 5 },
];

export default function Tourists() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTourist, setSelectedTourist] = useState(null);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'active': return 'success';
            case 'reported': return 'warning';
            case 'blacklisted': return 'destructive';
            default: return 'secondary';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Tourist Management</h1>
                    <p className="text-muted-foreground mt-2">Monitor and manage registered tourists</p>
                </div>
                <div className="flex gap-3">
                    <Badge variant="warning" className="text-lg px-4 py-2">
                        {tourists.filter(t => t.status === 'reported').length} Reported
                    </Badge>
                    <Badge variant="destructive" className="text-lg px-4 py-2">
                        {tourists.filter(t => t.isBlacklisted).length} Blacklisted
                    </Badge>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="glass-card border-border">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Total Tourists</p>
                                <p className="text-3xl font-bold text-foreground">{tourists.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <User className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card border-border">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Active Tours</p>
                                <p className="text-3xl font-bold text-green-600">
                                    {tourists.filter(t => t.currentTrip).length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <MapPin className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card border-border">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Reported Users</p>
                                <p className="text-3xl font-bold text-orange-600">
                                    {tourists.filter(t => t.status === 'reported').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                <AlertTriangle className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card border-border">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Total Trips</p>
                                <p className="text-3xl font-bold text-purple-600">
                                    {tourists.reduce((sum, t) => sum + t.tripsCompleted, 0)}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <Flag className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search */}
            <Card className="glass-card border-border">
                <CardContent className="p-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search tourists by name, email, or country..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground placeholder:text-muted-foreground"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Tourists Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {tourists.map((tourist) => (
                    <Card key={tourist.id} className="glass-card border-border hover:shadow-xl transition-all duration-300">
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                        <User className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg text-foreground">{tourist.name}</CardTitle>
                                        <p className="text-sm text-muted-foreground">{tourist.country}</p>
                                    </div>
                                </div>
                                <Badge variant={getStatusBadge(tourist.status)}>
                                    {tourist.status}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Mail className="w-4 h-4" />
                                    <span className="truncate">{tourist.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Phone className="w-4 h-4" />
                                    <span>{tourist.phone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Calendar className="w-4 h-4" />
                                    <span>Registered: {tourist.registeredDate}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Flag className="w-4 h-4" />
                                    <span>{tourist.tripsCompleted} trips completed</span>
                                </div>
                            </div>

                            {tourist.currentTrip && (
                                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                                    <p className="text-xs text-muted-foreground mb-1">Current Trip</p>
                                    <p className="text-sm font-semibold text-blue-600">{tourist.currentTrip}</p>
                                </div>
                            )}

                            {tourist.warnings > 0 && (
                                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4 text-orange-600" />
                                    <span className="text-sm text-orange-600 font-medium">
                                        {tourist.warnings} Warning{tourist.warnings > 1 ? 's' : ''}
                                    </span>
                                </div>
                            )}

                            {tourist.reportReason && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-xs text-red-500 mb-1">Report Reason</p>
                                    <p className="text-sm text-red-900">{tourist.reportReason}</p>
                                </div>
                            )}

                            <div className="pt-4 flex gap-2">
                                <Button
                                    variant="outline"
                                    className="flex-1 gap-2"
                                    size="sm"
                                    onClick={() => setSelectedTourist(tourist)}
                                >
                                    <Eye className="w-4 h-4" />
                                    View Details
                                </Button>
                                {tourist.status === 'reported' && (
                                    <>
                                        <Button className="gap-2 bg-green-500 hover:bg-green-600" size="sm">
                                            <Shield className="w-4 h-4" />
                                            Clear
                                        </Button>
                                        <Button variant="destructive" size="sm">
                                            <Ban className="w-4 h-4" />
                                        </Button>
                                    </>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Detail Modal */}
            {selectedTourist && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle>Tourist Details - {selectedTourist.name}</CardTitle>
                                <Button variant="ghost" size="icon" onClick={() => setSelectedTourist(null)}>
                                    ×
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-slate-500">Email</p>
                                    <p className="font-medium">{selectedTourist.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Phone</p>
                                    <p className="font-medium">{selectedTourist.phone}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Country</p>
                                    <p className="font-medium">{selectedTourist.country}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-500">Last Active</p>
                                    <p className="font-medium">{selectedTourist.lastActive}</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="font-semibold mb-3">Trip History</h3>
                                <div className="space-y-2">
                                    {tripHistory.map((trip, idx) => (
                                        <div key={idx} className="p-3 bg-slate-50 rounded-lg flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">{trip.destination}</p>
                                                <p className="text-sm text-slate-500">Guide: {trip.guide} • {trip.date}</p>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span className="text-yellow-500">★</span>
                                                <span className="font-semibold">{trip.rating}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button variant="outline" className="flex-1">View Full History</Button>
                                <Button variant="destructive" className="flex-1">Blacklist User</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
