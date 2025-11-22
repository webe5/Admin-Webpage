import React, { useState } from 'react';
import {
    Search,
    Filter,
    Eye,
    CheckCircle,
    XCircle,
    Download,
    Phone,
    Mail,
    MapPin,
    Star,
    Users,
    Calendar,
    FileText
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Sample data
const pendingGuides = [
    {
        id: 1,
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@email.com',
        phone: '+91 98765 43210',
        location: 'Delhi',
        experience: '5 years',
        languages: ['Hindi', 'English', 'French'],
        certifications: ['Tourism Guide License', 'First Aid'],
        rating: 4.5,
        touristsServed: 234,
        status: 'pending',
        appliedDate: '2025-01-15',
        documents: ['ID Proof', 'Certification', 'Experience Letter']
    },
    {
        id: 2,
        name: 'Priya Sharma',
        email: 'priya.sharma@email.com',
        phone: '+91 98765 43211',
        location: 'Agra',
        experience: '3 years',
        languages: ['Hindi', 'English', 'Spanish'],
        certifications: ['Tourism Guide License'],
        rating: 4.8,
        touristsServed: 156,
        status: 'pending',
        appliedDate: '2025-01-16',
        documents: ['ID Proof', 'Certification']
    },
    {
        id: 3,
        name: 'Amit Patel',
        email: 'amit.patel@email.com',
        phone: '+91 98765 43212',
        location: 'Jaipur',
        experience: '7 years',
        languages: ['Hindi', 'English', 'German'],
        certifications: ['Tourism Guide License', 'Heritage Expert'],
        rating: 4.9,
        touristsServed: 489,
        status: 'pending',
        appliedDate: '2025-01-14',
        documents: ['ID Proof', 'Certification', 'Experience Letter', 'Intro Video']
    },
];

export default function Guides() {
    const [selectedGuide, setSelectedGuide] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleApprove = (guideId) => {
        console.log('Approving guide:', guideId);
        // Implement approval logic with blockchain hash
    };

    const handleReject = (guideId) => {
        console.log('Rejecting guide:', guideId);
        // Implement rejection logic with reason modal
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Guide Verification</h1>
                    <p className="text-muted-foreground mt-2">Review and approve guide applications</p>
                </div>
                <Badge variant="warning" className="text-lg px-4 py-2">
                    {pendingGuides.length} Pending
                </Badge>
            </div>

            {/* Search and Filter */}
            <Card className="glass-card border-border">
                <CardContent className="p-6">
                    <div className="flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search by name, location, or email..."
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

            {/* Guides Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {pendingGuides.map((guide) => (
                    <Card key={guide.id} className="glass-card border-border hover:shadow-xl transition-all duration-300">
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                        <span className="text-lg font-bold text-primary">
                                            {guide.name.split(' ').map(n => n[0]).join('')}
                                        </span>
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg text-foreground">{guide.name}</CardTitle>
                                        <div className="flex items-center gap-1 mt-1">
                                            <MapPin className="w-3 h-3 text-muted-foreground" />
                                            <span className="text-xs text-muted-foreground">{guide.location}</span>
                                        </div>
                                    </div>
                                </div>
                                <Badge variant="warning">Pending</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Mail className="w-4 h-4" />
                                    <span className="truncate">{guide.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Phone className="w-4 h-4" />
                                    <span>{guide.phone}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Calendar className="w-4 h-4" />
                                    <span>{guide.experience} experience</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Users className="w-4 h-4" />
                                    <span>{guide.touristsServed} tourists served</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    <span className="font-semibold text-foreground">{guide.rating}</span>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground mb-2">Languages:</p>
                                <div className="flex flex-wrap gap-1">
                                    {guide.languages.map((lang, idx) => (
                                        <Badge key={idx} variant="secondary" className="text-xs">
                                            {lang}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p className="text-xs text-muted-foreground mb-2">Documents:</p>
                                <div className="flex flex-wrap gap-1">
                                    {guide.documents.map((doc, idx) => (
                                        <Badge key={idx} variant="outline" className="text-xs gap-1">
                                            <FileText className="w-3 h-3" />
                                            {doc}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 flex gap-2">
                                <Button
                                    variant="outline"
                                    className="flex-1 gap-2"
                                    onClick={() => setSelectedGuide(guide)}
                                >
                                    <Eye className="w-4 h-4" />
                                    Review
                                </Button>
                                <Button
                                    variant="default"
                                    className="flex-1 gap-2 bg-green-600 hover:bg-green-700 text-white"
                                    onClick={() => handleApprove(guide.id)}
                                >
                                    <CheckCircle className="w-4 h-4" />
                                    Approve
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    onClick={() => handleReject(guide.id)}
                                >
                                    <XCircle className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Detail Modal (simplified - would be a proper modal in production) */}
            {selectedGuide && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-foreground">Guide Details - {selectedGuide.name}</CardTitle>
                                <Button variant="ghost" size="icon" onClick={() => setSelectedGuide(null)}>
                                    <XCircle className="w-5 h-5" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Email</p>
                                    <p className="font-medium text-foreground">{selectedGuide.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Phone</p>
                                    <p className="font-medium text-foreground">{selectedGuide.phone}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Location</p>
                                    <p className="font-medium text-foreground">{selectedGuide.location}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Experience</p>
                                    <p className="font-medium text-foreground">{selectedGuide.experience}</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground mb-2">Certifications</p>
                                <div className="flex flex-wrap gap-2">
                                    {selectedGuide.certifications.map((cert, idx) => (
                                        <Badge key={idx} variant="success">{cert}</Badge>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white" onClick={() => handleApprove(selectedGuide.id)}>
                                    Approve & Generate Blockchain Hash
                                </Button>
                                <Button variant="destructive" className="flex-1" onClick={() => handleReject(selectedGuide.id)}>
                                    Reject with Reason
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
