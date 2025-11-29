import React, { useState } from 'react';
import {
    Siren,
    MapPin,
    Phone,
    Clock,
    User,
    AlertTriangle,
    CheckCircle,
    Navigation,
    Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Sample SOS alerts
const sosAlerts = [
    {
        id: 1,
        touristName: 'John Doe',
        location: 'Taj Mahal, Agra',
        coordinates: { lat: 27.1751, lng: 78.0421 },
        threatLevel: 'high',
        type: 'Medical Emergency',
        description: 'Tourist fell and injured leg',
        time: '10 mins ago',
        status: 'active',
        assignedTo: null
    },
    {
        id: 2,
        touristName: 'Sarah Smith',
        location: 'Red Fort, Delhi',
        coordinates: { lat: 28.6562, lng: 77.2410 },
        threatLevel: 'medium',
        type: 'Lost',
        description: 'Tourist separated from group',
        time: '25 mins ago',
        status: 'active',
        assignedTo: null
    },
    {
        id: 3,
        touristName: 'Michael Chen',
        location: 'Gateway of India, Mumbai',
        coordinates: { lat: 18.9220, lng: 72.8347 },
        threatLevel: 'low',
        type: 'General Assistance',
        description: 'Need directions to hotel',
        time: '45 mins ago',
        status: 'active',
        assignedTo: null
    },
];

const responders = [
    { id: 1, name: 'Police Unit 1', type: 'police', available: true },
    { id: 2, name: 'Medical Team A', type: 'medical', available: true },
    { id: 3, name: 'Volunteer Group 1', type: 'volunteer', available: true },
];

export default function SOS() {
    const [selectedAlert, setSelectedAlert] = useState(null);

    const getThreatColor = (level) => {
        switch (level) {
            case 'high': return 'bg-red-500';
            case 'medium': return 'bg-orange-500';
            case 'low': return 'bg-yellow-500';
            default: return 'bg-gray-500';
        }
    };

    const getThreatBadge = (level) => {
        switch (level) {
            case 'high': return 'destructive';
            case 'medium': return 'warning';
            case 'low': return 'secondary';
            default: return 'default';
        }
    };

    const handleAssignResponder = (alertId, responderId) => {
        console.log(`Assigning responder ${responderId} to alert ${alertId}`);
        // Implement assignment logic
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">SOS Console</h1>
                    <p className="text-muted-foreground mt-2">Real-time emergency alerts and response management</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-foreground">Live</span>
                    </div>
                    <Badge variant="destructive" className="text-lg px-4 py-2">
                        {sosAlerts.length} Active Alerts
                    </Badge>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="glass-card border-border">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Total Alerts Today</p>
                                <p className="text-3xl font-bold text-foreground">12</p>
                            </div>
                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                <Siren className="w-6 h-6 text-red-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card border-border">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Resolved</p>
                                <p className="text-3xl font-bold text-green-600">9</p>
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
                                <p className="text-muted-foreground text-sm mb-1">Active</p>
                                <p className="text-3xl font-bold text-orange-600">{sosAlerts.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                <Activity className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card border-border">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Avg Response Time</p>
                                <p className="text-3xl font-bold text-foreground">8m</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <Clock className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Live Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-foreground">Live SOS Feed</h2>
                    {sosAlerts.map((alert) => (
                        <Card
                            key={alert.id}
                            className={`glass-card border-border hover:shadow-xl transition-all duration-300 cursor-pointer ${selectedAlert?.id === alert.id ? 'ring-2 ring-primary' : ''
                                }`}
                            onClick={() => setSelectedAlert(alert)}
                        >
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-start gap-3">
                                        <div className={`w-10 h-10 ${getThreatColor(alert.threatLevel)} rounded-full flex items-center justify-center flex-shrink-0`}>
                                            <Siren className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-foreground">{alert.type}</h3>
                                            <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                                        </div>
                                    </div>
                                    <Badge variant={getThreatBadge(alert.threatLevel)}>
                                        {alert.threatLevel}
                                    </Badge>
                                </div>

                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <User className="w-4 h-4" />
                                        <span>{alert.touristName}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <MapPin className="w-4 h-4" />
                                        <span>{alert.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Clock className="w-4 h-4" />
                                        <span>{alert.time}</span>
                                    </div>
                                </div>

                                <div className="mt-4 flex gap-2">
                                    <Button variant="outline" className="flex-1 gap-2" size="sm">
                                        <Navigation className="w-4 h-4" />
                                        View on Map
                                    </Button>
                                    <Button className="flex-1 gap-2 bg-green-600 hover:bg-green-700 text-white" size="sm">
                                        <Phone className="w-4 h-4" />
                                        Contact
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Assignment Panel */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-foreground">Assign Responders</h2>
                    <Card className="glass-card border-border">
                        <CardHeader>
                            <CardTitle className="text-lg text-foreground">
                                {selectedAlert ? `Alert #${selectedAlert.id} - ${selectedAlert.type}` : 'Select an alert to assign responders'}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {selectedAlert ? (
                                <div className="space-y-4">
                                    <div className="p-4 bg-muted rounded-xl">
                                        <p className="text-sm text-muted-foreground mb-2">Location</p>
                                        <p className="font-semibold text-foreground">{selectedAlert.location}</p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {selectedAlert.coordinates.lat}, {selectedAlert.coordinates.lng}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-foreground mb-3">Available Responders</p>
                                        <div className="space-y-2">
                                            {responders.map((responder) => (
                                                <div
                                                    key={responder.id}
                                                    className="flex items-center justify-between p-3 bg-card rounded-lg border border-border hover:border-primary transition-colors"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-2 h-2 rounded-full ${responder.available ? 'bg-green-500' : 'bg-muted'}`}></div>
                                                        <div>
                                                            <p className="font-medium text-sm text-foreground">{responder.name}</p>
                                                            <p className="text-xs text-muted-foreground capitalize">{responder.type}</p>
                                                        </div>
                                                    </div>
                                                    <Button
                                                        size="sm"
                                                        disabled={!responder.available}
                                                        onClick={() => handleAssignResponder(selectedAlert.id, responder.id)}
                                                    >
                                                        Assign
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-border">
                                        <p className="text-sm font-medium text-foreground mb-2">Status Timeline</p>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <span className="text-sm text-muted-foreground">Received - {selectedAlert.time}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-muted rounded-full"></div>
                                                <span className="text-sm text-muted-foreground/60">En Route - Pending</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-muted rounded-full"></div>
                                                <span className="text-sm text-muted-foreground/60">Resolved - Pending</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-12 text-muted-foreground">
                                    <AlertTriangle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                    <p>Select an alert from the feed to assign responders</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
