import React, { useState } from 'react';
import {
    Search,
    Star,
    Flag,
    CheckCircle,
    XCircle,
    Eye,
    User,
    MapPin,
    Calendar,
    ThumbsUp,
    ThumbsDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const reviews = [
    {
        id: 1,
        touristName: 'John Smith',
        touristCountry: 'USA',
        targetType: 'Guide',
        targetName: 'Rajesh Kumar',
        rating: 5,
        comment: 'Excellent guide! Very knowledgeable about history and culture. Made our trip memorable.',
        date: '2024-11-20',
        status: 'approved',
        flagged: false,
        helpful: 24,
        location: 'Taj Mahal'
    },
    {
        id: 2,
        touristName: 'Emma Wilson',
        touristCountry: 'UK',
        targetType: 'Vendor',
        targetName: 'Heritage Hotels Pvt Ltd',
        rating: 4,
        comment: 'Great hotel with amazing views. Service was good but breakfast could be better.',
        date: '2024-11-19',
        status: 'approved',
        flagged: false,
        helpful: 18,
        location: 'Jaipur'
    },
    {
        id: 3,
        touristName: 'Michael Chen',
        touristCountry: 'China',
        targetType: 'Destination',
        targetName: 'Red Fort',
        rating: 2,
        comment: 'This place is overrated and dirty. Not worth the money. Total waste of time!!!',
        date: '2024-11-18',
        status: 'flagged',
        flagged: true,
        flagReason: 'Inappropriate language and potentially fake review',
        helpful: 3,
        location: 'Delhi'
    },
    {
        id: 4,
        touristName: 'Sarah Johnson',
        touristCountry: 'Canada',
        targetType: 'Guide',
        targetName: 'Priya Sharma',
        rating: 5,
        comment: 'Priya was fantastic! She went above and beyond to ensure we had a great experience.',
        date: '2024-11-17',
        status: 'pending',
        flagged: false,
        helpful: 0,
        location: 'Agra'
    },
    {
        id: 5,
        touristName: 'David Lee',
        touristCountry: 'Australia',
        targetType: 'Vendor',
        targetName: 'Spice Route Restaurant',
        rating: 1,
        comment: 'Terrible food poisoning! Avoid at all costs. Management was rude and unhelpful.',
        date: '2024-11-16',
        status: 'flagged',
        flagged: true,
        flagReason: 'Serious complaint - requires investigation',
        helpful: 12,
        location: 'Mumbai'
    },
];

export default function Reviews() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedReview, setSelectedReview] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');

    const getRatingColor = (rating) => {
        if (rating >= 4) return 'text-green-600';
        if (rating >= 3) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'approved': return 'success';
            case 'pending': return 'warning';
            case 'flagged': return 'destructive';
            case 'rejected': return 'secondary';
            default: return 'default';
        }
    };

    const filteredReviews = filterStatus === 'all'
        ? reviews
        : reviews.filter(r => r.status === filterStatus);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Reviews & Moderation</h1>
                    <p className="text-muted-foreground mt-2">Monitor and moderate user reviews</p>
                </div>
                <div className="flex gap-3">
                    <Badge variant="warning" className="text-lg px-4 py-2">
                        {reviews.filter(r => r.status === 'pending').length} Pending
                    </Badge>
                    <Badge variant="destructive" className="text-lg px-4 py-2">
                        {reviews.filter(r => r.flagged).length} Flagged
                    </Badge>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="glass-card border-border">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Total Reviews</p>
                                <p className="text-3xl font-bold text-foreground">{reviews.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <Star className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card border-border">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Approved</p>
                                <p className="text-3xl font-bold text-green-600">
                                    {reviews.filter(r => r.status === 'approved').length}
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
                                    {reviews.filter(r => r.status === 'pending').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                <Eye className="w-4 h-4 text-orange-600" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card border-border">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Flagged</p>
                                <p className="text-3xl font-bold text-red-600">
                                    {reviews.filter(r => r.flagged).length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                                <Flag className="w-6 h-6 text-red-600" />
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
                                placeholder="Search reviews..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground placeholder:text-muted-foreground"
                            />
                        </div>
                        <div className="flex gap-2">
                            {['all', 'pending', 'flagged', 'approved'].map((status) => (
                                <Button
                                    key={status}
                                    variant={filterStatus === status ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setFilterStatus(status)}
                                    className="capitalize"
                                >
                                    {status}
                                </Button>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Reviews List */}
            <div className="space-y-4">
                {filteredReviews.map((review) => (
                    <Card key={review.id} className={`glass-card border-border hover:shadow-xl transition-all duration-300 ${review.flagged ? 'border-red-300' : ''}`}>
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-start gap-4 flex-1">
                                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <User className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="font-bold text-foreground">{review.touristName}</h3>
                                            <Badge variant="outline" className="text-xs">{review.touristCountry}</Badge>
                                            <Badge variant={getStatusBadge(review.status)}>{review.status}</Badge>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
                                                    />
                                                ))}
                                                <span className={`ml-1 font-semibold ${getRatingColor(review.rating)}`}>
                                                    {review.rating}.0
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                <span>{review.date}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                <span>{review.location}</span>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <p className="text-sm text-muted-foreground mb-1">
                                                Review for <span className="font-semibold text-foreground">{review.targetName}</span> ({review.targetType})
                                            </p>
                                            <p className="text-foreground">{review.comment}</p>
                                        </div>
                                        {review.flagged && (
                                            <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-2 mb-3">
                                                <Flag className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                                                <div>
                                                    <p className="text-sm font-semibold text-destructive">Flagged for Review</p>
                                                    <p className="text-sm text-destructive/80">{review.flagReason}</p>
                                                </div>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                            <div className="flex items-center gap-1">
                                                <ThumbsUp className="w-4 h-4" />
                                                <span>{review.helpful} found helpful</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 ml-4">
                                    {review.status === 'pending' || review.status === 'flagged' ? (
                                        <>
                                            <Button
                                                className="gap-2 bg-green-600 hover:bg-green-700 text-white"
                                                size="sm"
                                            >
                                                <CheckCircle className="w-4 h-4" />
                                                Approve
                                            </Button>
                                            <Button variant="destructive" size="sm">
                                                <XCircle className="w-4 h-4" />
                                                Reject
                                            </Button>
                                        </>
                                    ) : (
                                        <Button variant="outline" size="sm">
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
