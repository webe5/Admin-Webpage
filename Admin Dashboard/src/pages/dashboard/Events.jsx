import React, { useState } from 'react';
import {
    Search,
    Calendar,
    Plus,
    Edit,
    Trash2,
    MapPin,
    Users,
    Clock,
    Tag
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const events = [
    {
        id: 1,
        name: 'Diwali Festival Celebration',
        type: 'Festival',
        location: 'All India',
        date: '2024-11-12',
        endDate: '2024-11-15',
        status: 'upcoming',
        expectedAttendees: 50000,
        description: 'Festival of Lights celebrated across India with fireworks and traditional rituals',
        organizer: 'Tourism Department',
        registrationRequired: false,
        entryFee: 0
    },
    {
        id: 2,
        name: 'Goa Carnival',
        type: 'Cultural Event',
        location: 'Goa',
        date: '2025-02-15',
        endDate: '2025-02-18',
        status: 'upcoming',
        expectedAttendees: 30000,
        description: 'Annual carnival with parades, music, and dance performances',
        organizer: 'Goa Tourism',
        registrationRequired: true,
        entryFee: 500
    },
    {
        id: 3,
        name: 'Holi Color Festival',
        type: 'Festival',
        location: 'Mathura, Uttar Pradesh',
        date: '2025-03-14',
        endDate: '2025-03-14',
        status: 'upcoming',
        expectedAttendees: 75000,
        description: 'Traditional festival of colors celebrating the arrival of spring',
        organizer: 'UP Tourism',
        registrationRequired: false,
        entryFee: 0
    },
    {
        id: 4,
        name: 'Pushkar Camel Fair',
        type: 'Fair',
        location: 'Pushkar, Rajasthan',
        date: '2024-11-20',
        endDate: '2024-11-28',
        status: 'active',
        expectedAttendees: 40000,
        description: 'Annual livestock fair and cultural festival',
        organizer: 'Rajasthan Tourism',
        registrationRequired: true,
        entryFee: 200
    },
    {
        id: 5,
        name: 'Taj Mahotsav',
        type: 'Cultural Event',
        location: 'Agra, Uttar Pradesh',
        date: '2025-02-18',
        endDate: '2025-02-27',
        status: 'upcoming',
        expectedAttendees: 25000,
        description: 'Annual cultural festival showcasing arts, crafts, and cuisine',
        organizer: 'UP Tourism',
        registrationRequired: false,
        entryFee: 100
    },
    {
        id: 6,
        name: 'Kumbh Mela',
        type: 'Religious Event',
        location: 'Prayagraj, Uttar Pradesh',
        date: '2025-01-13',
        endDate: '2025-02-26',
        status: 'upcoming',
        expectedAttendees: 1000000,
        description: 'Largest religious gathering in the world',
        organizer: 'UP Government',
        registrationRequired: false,
        entryFee: 0
    },
];

export default function Events() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');

    const getStatusBadge = (status) => {
        switch (status) {
            case 'active': return 'success';
            case 'upcoming': return 'default';
            case 'completed': return 'secondary';
            case 'cancelled': return 'destructive';
            default: return 'secondary';
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'Festival': return 'bg-purple-100 text-purple-700';
            case 'Cultural Event': return 'bg-blue-100 text-blue-700';
            case 'Fair': return 'bg-orange-100 text-orange-700';
            case 'Religious Event': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const filteredEvents = filterType === 'all'
        ? events
        : events.filter(e => e.type === filterType);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Events & Community</h1>
                    <p className="text-muted-foreground mt-2">Manage tourism events and festivals</p>
                </div>
                <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Event
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="glass-card border-border">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Total Events</p>
                                <p className="text-3xl font-bold text-foreground">{events.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card border-border">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Active Now</p>
                                <p className="text-3xl font-bold text-green-600">
                                    {events.filter(e => e.status === 'active').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <Clock className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card border-border">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Upcoming</p>
                                <p className="text-3xl font-bold text-purple-600">
                                    {events.filter(e => e.status === 'upcoming').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <Calendar className="w-6 h-6 text-purple-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card border-border">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Expected Visitors</p>
                                <p className="text-3xl font-bold text-orange-600">
                                    {(events.reduce((sum, e) => sum + e.expectedAttendees, 0) / 1000).toFixed(0)}K
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                <Users className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search and Filter */}
            <Card className="glass-card border-border">
                <CardContent className="p-6">
                    <div className="flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search events..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground placeholder:text-muted-foreground"
                            />
                        </div>
                        <div className="flex gap-2">
                            {['all', 'Festival', 'Cultural Event', 'Fair', 'Religious Event'].map((type) => (
                                <Button
                                    key={type}
                                    variant={filterType === type ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setFilterType(type)}
                                    className="capitalize"
                                >
                                    {type}
                                </Button>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Events Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredEvents.map((event) => (
                    <Card key={event.id} className="glass-card border-border hover:shadow-xl transition-all duration-300">
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Badge className={getTypeColor(event.type)}>
                                            {event.type}
                                        </Badge>
                                        <Badge variant={getStatusBadge(event.status)}>
                                            {event.status}
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-lg text-foreground">{event.name}</CardTitle>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground">{event.description}</p>

                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Calendar className="w-4 h-4" />
                                    <span>
                                        {event.date}
                                        {event.endDate !== event.date && ` - ${event.endDate}`}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="w-4 h-4" />
                                    <span>{event.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Users className="w-4 h-4" />
                                    <span>{event.expectedAttendees.toLocaleString()} expected attendees</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Tag className="w-4 h-4" />
                                    <span>Organizer: {event.organizer}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-border">
                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground">Entry Fee</p>
                                    <p className="font-semibold text-foreground">
                                        {event.entryFee === 0 ? 'Free' : `₹${event.entryFee}`}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground">Registration</p>
                                    <p className="font-semibold text-foreground">
                                        {event.registrationRequired ? 'Required' : 'Not Required'}
                                    </p>
                                </div>
                            </div>

                            <div className="pt-4 flex gap-2">
                                <Button variant="outline" className="flex-1 gap-2" size="sm">
                                    <Edit className="w-4 h-4" />
                                    Edit
                                </Button>
                                <Button variant="outline" className="gap-2" size="sm">
                                    View Details
                                </Button>
                                <Button variant="destructive" size="sm">
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
