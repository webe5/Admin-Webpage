import React, { useState } from 'react';
import {
    Search,
    MapPin,
    Plus,
    Edit,
    Trash2,
    Eye,
    Star,
    Users,
    Image as ImageIcon,
    Navigation,
    Filter
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const destinations = [
    {
        id: 1,
        name: 'Taj Mahal',
        location: 'Agra, Uttar Pradesh',
        category: 'Historical Monument',
        description: 'One of the Seven Wonders of the World, a UNESCO World Heritage Site',
        coordinates: { lat: 27.1751, lng: 78.0421 },
        rating: 4.8,
        totalVisits: 45000,
        status: 'active',
        entryFee: 250,
        openingHours: '6:00 AM - 7:00 PM',
        bestSeason: 'October to March',
        facilities: ['Parking', 'Guided Tours', 'Wheelchair Access', 'Restaurant'],
        images: 3
    },
    {
        id: 2,
        name: 'Red Fort',
        location: 'Delhi',
        category: 'Historical Monument',
        description: 'Historic fortified palace of the Mughal emperors',
        coordinates: { lat: 28.6562, lng: 77.2410 },
        rating: 4.5,
        totalVisits: 38000,
        status: 'active',
        entryFee: 150,
        openingHours: '9:30 AM - 4:30 PM',
        bestSeason: 'October to March',
        facilities: ['Parking', 'Guided Tours', 'Museum'],
        images: 5
    },
    {
        id: 3,
        name: 'Goa Beaches',
        location: 'Goa',
        category: 'Beach',
        description: 'Famous beaches with water sports and nightlife',
        coordinates: { lat: 15.2993, lng: 74.1240 },
        rating: 4.7,
        totalVisits: 52000,
        status: 'active',
        entryFee: 0,
        openingHours: 'Open 24/7',
        bestSeason: 'November to February',
        facilities: ['Water Sports', 'Restaurants', 'Hotels', 'Beach Shacks'],
        images: 8
    },
    {
        id: 4,
        name: 'Kerala Backwaters',
        location: 'Kerala',
        category: 'Nature',
        description: 'Network of lagoons and lakes with houseboat cruises',
        coordinates: { lat: 9.4981, lng: 76.3388 },
        rating: 4.9,
        totalVisits: 35000,
        status: 'active',
        entryFee: 500,
        openingHours: 'Varies by operator',
        bestSeason: 'September to March',
        facilities: ['Houseboat Rentals', 'Ayurvedic Spas', 'Local Cuisine'],
        images: 6
    },
    {
        id: 5,
        name: 'Jaipur City Palace',
        location: 'Jaipur, Rajasthan',
        category: 'Historical Monument',
        description: 'Royal residence with museums and courtyards',
        coordinates: { lat: 26.9258, lng: 75.8237 },
        rating: 4.6,
        totalVisits: 42000,
        status: 'maintenance',
        entryFee: 200,
        openingHours: '9:00 AM - 5:00 PM',
        bestSeason: 'October to March',
        facilities: ['Museum', 'Guided Tours', 'Photography'],
        images: 4
    },
];

export default function Destinations() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDestination, setSelectedDestination] = useState(null);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'active': return 'success';
            case 'maintenance': return 'warning';
            case 'closed': return 'destructive';
            default: return 'secondary';
        }
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case 'Historical Monument': return 'bg-amber-100 text-amber-700';
            case 'Beach': return 'bg-blue-100 text-blue-700';
            case 'Nature': return 'bg-green-100 text-green-700';
            case 'Temple': return 'bg-purple-100 text-purple-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Destination Management</h1>
                    <p className="text-muted-foreground mt-2">Manage tourist destinations and attractions</p>
                </div>
                <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Destination
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="glass-card border-border">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Total Destinations</p>
                                <p className="text-3xl font-bold text-foreground">{destinations.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <MapPin className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card border-border">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Active</p>
                                <p className="text-3xl font-bold text-green-600">
                                    {destinations.filter(d => d.status === 'active').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <Eye className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card border-border">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Total Visits</p>
                                <p className="text-3xl font-bold text-purple-600">
                                    {(destinations.reduce((sum, d) => sum + d.totalVisits, 0) / 1000).toFixed(1)}K
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
                                <p className="text-muted-foreground text-sm mb-1">Avg. Rating</p>
                                <p className="text-3xl font-bold text-yellow-600">
                                    {(destinations.reduce((sum, d) => sum + d.rating, 0) / destinations.length).toFixed(1)}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                                <Star className="w-6 h-6 text-yellow-600" />
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
                            placeholder="Search destinations by name or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground placeholder:text-muted-foreground"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Destinations Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {destinations.map((destination) => (
                    <Card key={destination.id} className="glass-card border-border hover:shadow-xl transition-all duration-300 overflow-hidden">
                        <div className="h-48 bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center relative">
                            <ImageIcon className="w-16 h-16 text-muted-foreground/50" />
                            <div className="absolute top-3 right-3">
                                <Badge variant={getStatusBadge(destination.status)}>
                                    {destination.status}
                                </Badge>
                            </div>
                            <div className="absolute bottom-3 left-3">
                                <Badge className={getCategoryColor(destination.category)}>
                                    {destination.category}
                                </Badge>
                            </div>
                        </div>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg text-foreground">{destination.name}</CardTitle>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4" />
                                <span>{destination.location}</span>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-sm text-muted-foreground line-clamp-2">{destination.description}</p>

                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-semibold text-foreground">{destination.rating}</span>
                                </div>
                                <div className="flex items-center gap-1 text-muted-foreground">
                                    <Users className="w-4 h-4" />
                                    <span>{(destination.totalVisits / 1000).toFixed(1)}K visits</span>
                                </div>
                            </div>

                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Entry Fee:</span>
                                    <span className="font-semibold text-foreground">
                                        {destination.entryFee === 0 ? 'Free' : `₹${destination.entryFee}`}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Best Season:</span>
                                    <span className="font-medium text-foreground">{destination.bestSeason}</span>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground mb-2">Facilities:</p>
                                <div className="flex flex-wrap gap-1">
                                    {destination.facilities.slice(0, 3).map((facility, idx) => (
                                        <Badge key={idx} variant="outline" className="text-xs">
                                            {facility}
                                        </Badge>
                                    ))}
                                    {destination.facilities.length > 3 && (
                                        <Badge variant="outline" className="text-xs">
                                            +{destination.facilities.length - 3}
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            <div className="pt-4 flex gap-2">
                                <Button variant="outline" className="flex-1 gap-2" size="sm">
                                    <Eye className="w-4 h-4" />
                                    View
                                </Button>
                                <Button variant="outline" className="gap-2" size="sm">
                                    <Navigation className="w-4 h-4" />
                                </Button>
                                <Button variant="outline" className="gap-2" size="sm">
                                    <Edit className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
