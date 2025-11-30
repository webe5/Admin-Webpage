import React, { useState, useRef, useEffect } from 'react';
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
  Download,              // ⬅️ NEW
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// ⬇️ PDF libs
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const destinations = [
  {
    id: 1,
    name: 'Dassam Falls',
    location: 'Ranchi, Jharkhand',
    category: 'Waterfall',
    description:
      'A stunning 144-foot waterfall located on the Kanchi River, popular for its scenic beauty.',
    coordinates: { lat: 23.3435, lng: 85.5296 },
    rating: 4.6,
    totalVisits: 32000,
    status: 'active',
    entryFee: 20,
    openingHours: '6:00 AM - 6:00 PM',
    bestSeason: 'September to February',
    facilities: ['Parking', 'Viewpoint', 'Shops', 'Restrooms'],
    images: 5,
  },
  {
    id: 2,
    name: 'Hundru Falls',
    location: 'Ranchi, Jharkhand',
    category: 'Waterfall',
    description:
      'One of the highest waterfalls in Jharkhand with breathtaking views and rocky terrain.',
    coordinates: { lat: 23.35, lng: 85.5167 },
    rating: 4.7,
    totalVisits: 28000,
    status: 'active',
    entryFee: 20,
    openingHours: '6:00 AM - 6:00 PM',
    bestSeason: 'Monsoon and Winter',
    facilities: ['Parking', 'Food Stalls', 'Restrooms', 'Viewpoint'],
    images: 6,
  },
  {
    id: 3,
    name: 'Netarhat',
    location: 'Latehar, Jharkhand',
    category: 'Hill Station',
    description:
      'The “Queen of Chotanagpur”, famous for mesmerizing sunrise and sunset views.',
    coordinates: { lat: 23.471, lng: 84.2737 },
    rating: 4.8,
    totalVisits: 45000,
    status: 'active',
    entryFee: 0,
    openingHours: 'Open 24/7',
    bestSeason: 'October to April',
    facilities: ['Hotels', 'Viewpoints', 'Parking'],
    images: 7,
  },
  {
    id: 4,
    name: 'Betla National Park',
    location: 'Latehar, Jharkhand',
    category: 'Wildlife Sanctuary',
    description:
      'Part of Palamu Tiger Reserve known for elephants, tigers, and jungle safaris.',
    coordinates: { lat: 23.8354, lng: 84.2049 },
    rating: 4.5,
    totalVisits: 30000,
    status: 'active',
    entryFee: 100,
    openingHours: '6:00 AM - 5:00 PM',
    bestSeason: 'November to March',
    facilities: ['Safari Booking', 'Parking', 'Guides', 'Restrooms'],
    images: 8,
  },
  {
    id: 5,
    name: 'Parasnath Hill (Shikharji)',
    location: 'Giridih, Jharkhand',
    category: 'Pilgrimage',
    description:
      'One of the holiest Jain pilgrimage sites located at the highest peak of Jharkhand.',
    coordinates: { lat: 24.2565, lng: 86.1347 },
    rating: 4.9,
    totalVisits: 50000,
    status: 'active',
    entryFee: 0,
    openingHours: '4:00 AM - 7:00 PM',
    bestSeason: 'October to March',
    facilities: ['Parking', 'Shops', 'Rest Areas'],
    images: 10,
  },
  {
    id: 6,
    name: 'Patratu Valley',
    location: 'Ramgarh, Jharkhand',
    category: 'Scenic Spot',
    description:
      'Beautiful valley with winding roads, lake views, and a popular tourist viewpoint.',
    coordinates: { lat: 23.6435, lng: 85.3035 },
    rating: 4.7,
    totalVisits: 38000,
    status: 'active',
    entryFee: 0,
    openingHours: 'Open 24/7',
    bestSeason: 'Throughout the year',
    facilities: ['Parking', 'Viewpoint', 'Food Stalls', 'Boating (near lake)'],
    images: 6,
  },
];

export default function Destinations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // all | active | maintenance | closed
  const [isGlowing, setIsGlowing] = useState(false);
  const destinationsListRef = useRef(null);

  // 🔹 Download handler
  const handleDownloadReport = () => {
    const doc = new jsPDF('p', 'pt');

    doc.setFontSize(18);
    doc.text('Destinations Report', 40, 40);

    const body = destinations.map((d) => [
      d.id,
      d.name,
      d.location,
      d.category,
      d.status,
      d.rating,
      d.totalVisits,
      d.entryFee === 0 ? 'Free' : `₹${d.entryFee}`,
      d.bestSeason,
      d.openingHours,
    ]);

    autoTable(doc, {
      startY: 60,
      head: [[
        'ID',
        'Name',
        'Location',
        'Category',
        'Status',
        'Rating',
        'Total Visits',
        'Entry Fee',
        'Best Season',
        'Opening Hours',
      ]],
      body,
      styles: { fontSize: 8, cellPadding: 4 },
      headStyles: { fillColor: [37, 99, 235] },
    });

    doc.save('destinations-report.pdf');
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedDestination(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return (
          <Badge className="bg-green-500 hover:bg-green-600 text-white">
            Active
          </Badge>
        );
      case 'maintenance':
        return (
          <Badge className="bg-orange-500 hover:bg-orange-600 text-white">
            Maintenance
          </Badge>
        );
      case 'closed':
        return (
          <Badge className="bg-red-500 hover:bg-red-600 text-white">Closed</Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Historical Monument':
        return 'bg-amber-100 text-amber-700';
      case 'Beach':
        return 'bg-blue-100 text-blue-700';
      case 'Nature':
        return 'bg-green-100 text-green-700';
      case 'Temple':
        return 'bg-purple-100 text-purple-700';
      case 'Waterfall':
        return 'bg-blue-100 text-blue-700';
      case 'Hill Station':
        return 'bg-emerald-100 text-emerald-700';
      case 'Wildlife Sanctuary':
        return 'bg-lime-100 text-lime-700';
      case 'Pilgrimage':
        return 'bg-pink-100 text-pink-700';
      case 'Scenic Spot':
        return 'bg-cyan-100 text-cyan-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const totalDestinations = destinations.length;
  const activeCount = destinations.filter((d) => d.status === 'active').length;
  const maintenanceCount = destinations.filter(
    (d) => d.status === 'maintenance'
  ).length;
  const closedCount = destinations.filter((d) => d.status === 'closed').length;
  const totalVisitsK = (
    destinations.reduce((sum, d) => sum + d.totalVisits, 0) / 1000
  ).toFixed(1);
  const avgRating = (
    destinations.reduce((sum, d) => sum + d.rating, 0) / destinations.length
  ).toFixed(1);

  const scrollToDestinations = (tab) => {
    setActiveTab(tab);
    if (destinationsListRef.current) {
      destinationsListRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setIsGlowing(true);
      setTimeout(() => setIsGlowing(false), 2000);
    }
  };

  // Apply tab filter
  const destinationsByTab =
    activeTab === 'all'
      ? destinations
      : destinations.filter((d) => d.status === activeTab);

  // Apply search filter
  const filteredDestinations = destinationsByTab.filter((destination) => {
    const term = searchTerm.toLowerCase();
    return (
      destination.name.toLowerCase().includes(term) ||
      destination.location.toLowerCase().includes(term) ||
      destination.category.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Destination Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage tourist destinations and attractions
          </p>
        </div>

        {/* Right actions: Download + Add Destination */}
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleDownloadReport}
            className="border-border"
            title="Download Destinations Report"
          >
            <Download className="w-4 h-4" />
          </Button>

          {/* Highlighted Add Destination button */}
          <Button
            className="gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md hover:shadow-lg hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 animate-pulse"
            onClick={() => {
              // later you can open a "Add Destination" modal here
              console.log('Add Destination clicked');
            }}
          >
            <Plus className="w-4 h-4" />
            <span className="font-semibold tracking-wide">Add Destination</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards - clickable like Vendors/Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <Card
          className={`glass-card border-border cursor-pointer transition-all group ${
            activeTab === 'all'
              ? 'ring-2 ring-blue-500 bg-blue-500/10'
              : 'hover:bg-muted/50'
          }`}
          onClick={() => scrollToDestinations('all')}
        >
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Destinations</p>
              <h3 className="text-2xl font-bold text-foreground">
                {totalDestinations}
              </h3>
              <p className="text-xs text-blue-500 font-medium">
                All destinations in system
              </p>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`glass-card border-border cursor-pointer transition-all group ${
            activeTab === 'active'
              ? 'ring-2 ring-green-500 bg-green-500/10'
              : 'hover:bg-muted/50'
          }`}
          onClick={() => scrollToDestinations('active')}
        >
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Eye className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active</p>
              <h3 className="text-2xl font-bold text-foreground">{activeCount}</h3>
              <p className="text-xs text-green-500 font-medium">
                Available for tourists
              </p>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`glass-card border-border cursor-pointer transition-all group ${
            activeTab === 'maintenance'
              ? 'ring-2 ring-orange-500 bg-orange-500/10'
              : 'hover:bg-muted/50'
          }`}
          onClick={() => scrollToDestinations('maintenance')}
        >
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Edit className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Under Maintenance</p>
              <h3 className="text-2xl font-bold text-foreground">
                {maintenanceCount}
              </h3>
              <p className="text-xs text-orange-500 font-medium">
                Temporarily restricted
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-border">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg. Rating</p>
              <h3 className="text-2xl font-bold text-foreground">{avgRating}</h3>
              <p className="text-xs text-yellow-500 font-medium">
                {totalVisitsK}K total visits
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search + (you can add future filters here) */}
      <Card className="glass-card border-border">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search destinations by name, location, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground placeholder:text-muted-foreground text-sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Destinations Grid */}
      <div
        ref={destinationsListRef}
        className={`grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 transition-all duration-500 ${
          isGlowing ? 'ring-4 ring-primary/50 rounded-xl p-2 bg-primary/5' : ''
        }`}
      >
        {filteredDestinations.length > 0 ? (
          filteredDestinations.map((destination) => (
            <Card
              key={destination.id}
              className="glass-card border-border hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="h-48 bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center relative">
                <ImageIcon className="w-16 h-16 text-muted-foreground/50" />
                <div className="absolute top-3 right-3">
                  {getStatusBadge(destination.status)}
                </div>
                <div className="absolute bottom-3 left-3">
                  <Badge className={getCategoryColor(destination.category)}>
                    {destination.category}
                  </Badge>
                </div>
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-foreground">
                  {destination.name}
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{destination.location}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {destination.description}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-foreground">
                      {destination.rating}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>
                      {(destination.totalVisits / 1000).toFixed(1)}K visits
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Entry Fee:</span>
                    <span className="font-semibold text-foreground">
                      {destination.entryFee === 0
                        ? 'Free'
                        : `₹${destination.entryFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Best Season:</span>
                    <span className="font-medium text-foreground">
                      {destination.bestSeason}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Facilities:
                  </p>
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
                  <Button
                    variant="outline"
                    className="flex-1 gap-2"
                    size="sm"
                    onClick={() => setSelectedDestination(destination)}
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Button>
                  <Button variant="outline" className="gap-2" size="sm">
                    <Navigation className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="gap-2" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No destinations found matching your search.
          </div>
        )}
      </div>

      {/* Destination Details Modal */}
      {selectedDestination && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-foreground">
                      {selectedDestination.name}
                    </CardTitle>
                    {getStatusBadge(selectedDestination.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {selectedDestination.location} •{' '}
                    {selectedDestination.category}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedDestination(null)}
                >
                  <span className="text-lg font-bold">×</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p className="text-muted-foreground">
                {selectedDestination.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Opening Hours
                  </p>
                  <p className="font-medium text-foreground">
                    {selectedDestination.openingHours}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Best Season
                  </p>
                  <p className="font-medium text-foreground">
                    {selectedDestination.bestSeason}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Entry Fee
                  </p>
                  <p className="font-medium text-foreground">
                    {selectedDestination.entryFee === 0
                      ? 'Free'
                      : `₹${selectedDestination.entryFee}`}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Coordinates
                  </p>
                  <p className="font-medium text-foreground">
                    {selectedDestination.coordinates.lat.toFixed(4)},{' '}
                    {selectedDestination.coordinates.lng.toFixed(4)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Total Visits
                  </p>
                  <p className="font-medium text-foreground">
                    {selectedDestination.totalVisits.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Images</p>
                  <p className="font-medium text-foreground">
                    {selectedDestination.images} photos
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-1">Facilities</p>
                <div className="flex flex-wrap gap-2">
                  {selectedDestination.facilities.map((f, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {f}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
