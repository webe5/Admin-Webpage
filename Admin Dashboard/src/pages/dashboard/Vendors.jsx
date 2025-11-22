import React, { useState } from 'react';
import {
    Search,
    Filter,
    Store,
    CheckCircle,
    XCircle,
    AlertTriangle,
    Phone,
    Mail,
    MapPin,
    Calendar,
    Shield,
    FileText,
    Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const vendors = [
    {
        id: 1,
        name: 'Heritage Hotels Pvt Ltd',
        type: 'Hotel',
        email: 'contact@heritagehotels.com',
        phone: '+91 98765 43210',
        location: 'Jaipur, Rajasthan',
        license: 'HTL-2024-001',
        licenseExpiry: '2025-12-31',
        status: 'active',
        rating: 4.5,
        verifiedDate: '2024-01-15',
        servicesOffered: ['Accommodation', 'Restaurant', 'Spa'],
        fraudAlerts: 0
    },
    {
        id: 2,
        name: 'Royal Transport Services',
        type: 'Transport',
        email: 'info@royaltransport.com',
        phone: '+91 98765 43211',
        location: 'Delhi',
        license: 'TRP-2024-045',
        licenseExpiry: '2025-06-30',
        status: 'pending',
        rating: 4.2,
        verifiedDate: null,
        servicesOffered: ['Car Rental', 'Bus Service'],
        fraudAlerts: 0
    },
    {
        id: 3,
        name: 'Spice Route Restaurant',
        type: 'Restaurant',
        email: 'hello@spiceroute.com',
        phone: '+91 98765 43212',
        location: 'Mumbai',
        license: 'RST-2024-089',
        licenseExpiry: '2025-03-15',
        status: 'active',
        rating: 4.8,
        verifiedDate: '2024-02-20',
        servicesOffered: ['Fine Dining', 'Catering'],
        fraudAlerts: 0
    },
    {
        id: 4,
        name: 'Adventure Tours India',
        type: 'Tour Operator',
        email: 'bookings@adventuretours.com',
        phone: '+91 98765 43213',
        location: 'Goa',
        license: 'TOR-2024-123',
        licenseExpiry: '2024-12-31',
        status: 'expiring_soon',
        rating: 4.6,
        verifiedDate: '2024-01-10',
        servicesOffered: ['Trekking', 'Water Sports', 'Camping'],
        fraudAlerts: 1
    },
];

export default function Vendors() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedVendor, setSelectedVendor] = useState(null);

    const getStatusBadge = (status) => {
        switch (status) {
            case 'active': return 'success';
            case 'pending': return 'warning';
            case 'expiring_soon': return 'warning';
            case 'blacklisted': return 'destructive';
            default: return 'secondary';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-green-500';
            case 'pending': return 'bg-orange-500';
            case 'expiring_soon': return 'bg-yellow-500';
            case 'blacklisted': return 'bg-red-500';
            default: return 'bg-gray-500';
        }
    };

    const isLicenseExpiringSoon = (expiryDate) => {
        const expiry = new Date(expiryDate);
        const today = new Date();
        const daysUntilExpiry = Math.floor((expiry - today) / (1000 * 60 * 60 * 24));
        return daysUntilExpiry <= 30 && daysUntilExpiry >= 0;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Vendor Management</h1>
                    <p className="text-muted-foreground mt-2">Manage and verify tourism service vendors</p>
                </div>
                <div className="flex gap-3">
                    <Badge variant="warning" className="text-lg px-4 py-2">
                        {vendors.filter(v => v.status === 'pending').length} Pending
                    </Badge>
                    <Badge variant="destructive" className="text-lg px-4 py-2">
                        {vendors.filter(v => isLicenseExpiringSoon(v.licenseExpiry)).length} Expiring Soon
                    </Badge>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="glass-card border-border">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Total Vendors</p>
                                <p className="text-3xl font-bold text-foreground">{vendors.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <Store className="w-6 h-6 text-blue-600" />
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
                                    {vendors.filter(v => v.status === 'active').length}
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
                                <p className="text-muted-foreground text-sm mb-1">Pending</p>
                                <p className="text-3xl font-bold text-orange-600">
                                    {vendors.filter(v => v.status === 'pending').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                <Clock className="w-6 h-6 text-orange-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card border-border">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Fraud Alerts</p>
                                <p className="text-3xl font-bold text-red-600">
                                    {vendors.reduce((sum, v) => sum + v.fraudAlerts, 0)}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                <AlertTriangle className="w-6 h-6 text-red-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Search */}
            <Card className="glass-card border-border">
                <CardContent className="p-6">
                    <div className="flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search vendors by name, type, or location..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground placeholder:text-muted-foreground"
                            />
                        </div>
                        <Button variant="outline" className="gap-2">
                            <Filter className="w-4 h-4" />
                            Filters
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Vendors Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {vendors.map((vendor) => (
                    <Card key={vendor.id} className="glass-card border-border hover:shadow-xl transition-all duration-300">
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-12 h-12 ${getStatusColor(vendor.status)} rounded-xl flex items-center justify-center`}>
                                        <Store className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg text-foreground">{vendor.name}</CardTitle>
                                        <p className="text-sm text-muted-foreground">{vendor.type}</p>
                                    </div>
                                </div>
                                <Badge variant={getStatusBadge(vendor.status)}>
                                    {vendor.status.replace('_', ' ')}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Mail className="w-4 h-4" />
                                    <span className="truncate">{vendor.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Phone className="w-4 h-4" />
                                    <span>{vendor.phone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="w-4 h-4" />
                                    <span>{vendor.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Shield className="w-4 h-4" />
                                    <span>License: {vendor.license}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-muted-foreground" />
                                    <span className={`text-sm ${isLicenseExpiringSoon(vendor.licenseExpiry) ? 'text-red-600 font-semibold' : 'text-muted-foreground'}`}>
                                        Expires: {vendor.licenseExpiry}
                                    </span>
                                    {isLicenseExpiringSoon(vendor.licenseExpiry) && (
                                        <Badge variant="destructive" className="text-xs">Expiring Soon</Badge>
                                    )}
                                </div>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground mb-2">Services:</p>
                                <div className="flex flex-wrap gap-1">
                                    {vendor.servicesOffered.map((service, idx) => (
                                        <Badge key={idx} variant="secondary" className="text-xs">
                                            {service}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {vendor.fraudAlerts > 0 && (
                                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4 text-red-600" />
                                    <span className="text-sm text-red-600 font-medium">
                                        {vendor.fraudAlerts} Fraud Alert{vendor.fraudAlerts > 1 ? 's' : ''}
                                    </span>
                                </div>
                            )}

                            <div className="pt-4 flex gap-2">
                                <Button variant="outline" className="flex-1 gap-2" size="sm">
                                    <FileText className="w-4 h-4" />
                                    View Profile
                                </Button>
                                {vendor.status === 'pending' && (
                                    <>
                                        <Button className="flex-1 gap-2 bg-green-600 hover:bg-green-700 text-white" size="sm">
                                            <CheckCircle className="w-4 h-4" />
                                            Approve
                                        </Button>
                                        <Button variant="destructive" size="sm">
                                            <XCircle className="w-4 h-4" />
                                        </Button>
                                    </>
                                )}
                                {vendor.status === 'active' && (
                                    <Button variant="outline" className="gap-2" size="sm">
                                        Edit
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
