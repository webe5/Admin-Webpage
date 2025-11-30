import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Calendar,
  Plus,
  Edit,
  Trash2,
  MapPin,
  Users,
  Clock,
  Tag,
  Eye,
  XCircle,
  Download,          // ⬅️ NEW
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// ⬇️ PDF libs
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// 🔸 Reusable helper you can call from anywhere (Topbar, etc.)
export const generateEventsPdfReport = (eventsArray) => {
  const doc = new jsPDF('p', 'pt');

  doc.setFontSize(18);
  doc.text('Events & Festivals Report', 40, 40);

  const body = eventsArray.map((e) => [
    e.id,
    e.name,
    e.type,
    e.location,
    `${e.date}${e.endDate && e.endDate !== e.date ? ' - ' + e.endDate : ''}`,
    e.status,
    e.organizer,
    e.entryFee === 0 ? 'Free' : `₹${e.entryFee}`,
    e.registrationRequired ? 'Required' : 'Not Required',
    e.expectedAttendees || 0,
  ]);

  autoTable(doc, {
    startY: 60,
    head: [
      [
        'ID',
        'Name',
        'Type',
        'Location',
        'Dates',
        'Status',
        'Organizer',
        'Entry Fee',
        'Registration',
        'Expected Visitors',
      ],
    ],
    body,
    styles: { fontSize: 8, cellPadding: 4 },
    headStyles: { fillColor: [37, 99, 235] }, // blue header
  });

  doc.save('events-report.pdf');
};

// Base data
const initialEvents = [
  {
    id: 1,
    name: 'Tusu Parab Festival',
    type: 'Cultural Festival',
    location: 'Ranchi, Jharkhand',
    date: '2024-12-14',
    endDate: '2024-12-16',
    status: 'upcoming',
    expectedAttendees: 20000,
    description:
      'A popular harvest festival celebrated with traditional songs, rituals and community gatherings across Jharkhand.',
    organizer: 'Jharkhand Tourism Department',
    registrationRequired: false,
    entryFee: 0,
  },
  {
    id: 2,
    name: 'Sarhul Festival',
    type: 'Tribal Festival',
    location: 'Ranchi, Gumla, Khunti',
    date: '2025-04-10',
    endDate: '2025-04-12',
    status: 'upcoming',
    expectedAttendees: 50000,
    description:
      'Traditional festival of the tribal communities celebrating the worship of nature and Sal tree.',
    organizer: 'Department of Arts, Culture & Youth Affairs, Jharkhand',
    registrationRequired: false,
    entryFee: 0,
  },
  {
    id: 3,
    name: 'Science City Winter Carnival',
    type: 'Cultural Event',
    location: 'Ranchi, Jharkhand',
    date: '2024-12-20',
    endDate: '2024-12-25',
    status: 'upcoming',
    expectedAttendees: 30000,
    description:
      'A vibrant carnival featuring cultural performances, food stalls, exhibitions and science shows.',
    organizer: 'Ranchi Science City & Jharkhand Tourism',
    registrationRequired: true,
    entryFee: 150,
  },
  {
    id: 4,
    name: 'Jharkhand International Film Festival',
    type: 'Film Festival',
    location: 'Ranchi, Jharkhand',
    date: '2025-01-05',
    endDate: '2025-01-07',
    status: 'upcoming',
    expectedAttendees: 15000,
    description:
      'Annual film festival promoting regional cinema, filmmakers, workshops, and celebrity interactions.',
    organizer: 'JIFFA Foundation & Jharkhand Government',
    registrationRequired: true,
    entryFee: 500,
  },
  {
    id: 5,
    name: 'Karma Festival',
    type: 'Tribal Dance Festival',
    location: 'Dumka, Deoghar, Bokaro',
    date: '2025-09-05',
    endDate: '2025-09-05',
    status: 'upcoming',
    expectedAttendees: 60000,
    description:
      'Traditional Karma dance festival celebrated with music, worship of Karma tree, and cultural rituals.',
    organizer: 'Jharkhand Tribal Welfare Department',
    registrationRequired: false,
    entryFee: 0,
  },
  {
    id: 6,
    name: 'Jamshedpur Winter Fest',
    type: 'Cultural Event',
    location: 'Jamshedpur, Jharkhand',
    date: '2024-12-24',
    endDate: '2024-12-31',
    status: 'active',
    expectedAttendees: 40000,
    description:
      'A winter celebration with concerts, cultural nights, food festivals, adventure activities and exhibitions.',
    organizer: 'Tata Steel & Jharkhand Tourism',
    registrationRequired: true,
    entryFee: 200,
  },
];

export default function Events() {
  const [eventsData, setEventsData] = useState(initialEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // all | active | upcoming | completed | cancelled
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);
  const eventsListRef = useRef(null);

  const [newEvent, setNewEvent] = useState({
    name: '',
    description: '',
    date: '',
    endDate: '',
    location: '',
    organizer: '',
    entryFee: '',
    registrationRequired: 'required',
    type: 'Cultural Event',
    expectedAttendees: '',
  });

  // 🔹 This is what the download icon will call
  const handleDownloadReport = () => {
    generateEventsPdfReport(eventsData);
  };

  // Close modals on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedEvent(null);
        setShowAddModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Stats
  const totalEvents = eventsData.length;
  const activeCount = eventsData.filter((e) => e.status === 'active').length;
  const upcomingCount = eventsData.filter((e) => e.status === 'upcoming').length;
  const completedCount = eventsData.filter((e) => e.status === 'completed').length;
  const cancelledCount = eventsData.filter((e) => e.status === 'cancelled').length;

  const scrollToEvents = (tab) => {
    setActiveTab(tab);
    if (eventsListRef.current) {
      eventsListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsGlowing(true);
      setTimeout(() => setIsGlowing(false), 2000);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500 hover:bg-green-600">Active</Badge>;
      case 'upcoming':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Upcoming</Badge>;
      case 'completed':
        return <Badge className="bg-gray-500 hover:bg-gray-600">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-red-500 hover:bg-red-600">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeBadgeClasses = (type) => {
    switch (type) {
      case 'Cultural Event':
      case 'Cultural Festival':
        return 'bg-blue-100 text-blue-700';
      case 'Religious Event':
        return 'bg-green-100 text-green-700';
      case 'Film Festival':
        return 'bg-purple-100 text-purple-700';
      case 'Tribal Festival':
      case 'Tribal Dance Festival':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Filter by tab (status)
  const eventsByStatus =
    activeTab === 'all'
      ? eventsData
      : eventsData.filter((e) => e.status === activeTab);

  // Search filter
  const filteredEvents = eventsByStatus.filter((event) => {
    const term = searchTerm.toLowerCase();
    return (
      event.name.toLowerCase().includes(term) ||
      event.location.toLowerCase().includes(term) ||
      event.type.toLowerCase().includes(term) ||
      event.organizer.toLowerCase().includes(term)
    );
  });

  const handleNewEventChange = (field, value) => {
    setNewEvent((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddEventSubmit = (e) => {
    e.preventDefault();

    if (!newEvent.name || !newEvent.date || !newEvent.location || !newEvent.organizer) {
      return;
    }

    const eventToAdd = {
      id: eventsData.length + 1,
      name: newEvent.name,
      type: newEvent.type,
      location: newEvent.location,
      date: newEvent.date,
      endDate: newEvent.endDate || newEvent.date,
      status: 'upcoming',
      expectedAttendees: newEvent.expectedAttendees
        ? Number(newEvent.expectedAttendees)
        : 0,
      description: newEvent.description,
      organizer: newEvent.organizer,
      registrationRequired: newEvent.registrationRequired === 'required',
      entryFee: newEvent.entryFee ? Number(newEvent.entryFee) : 0,
    };

    setEventsData((prev) => [...prev, eventToAdd]);
    setShowAddModal(false);
    setNewEvent({
      name: '',
      description: '',
      date: '',
      endDate: '',
      location: '',
      organizer: '',
      entryFee: '',
      registrationRequired: 'required',
      type: 'Cultural Event',
      expectedAttendees: '',
    });
  };

  const handleDelete = (id) => {
    setEventsData((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Events & Community</h1>
          <p className="text-muted-foreground mt-2">
            Manage tourism events, festivals, and community activities
          </p>
        </div>

        {/* Right-side actions: Download + Add Event */}
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleDownloadReport}
            className="border-border"
            title="Download Events Report"
          >
            <Download className="w-4 h-4" />
          </Button>

          <Button
            className="gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md hover:shadow-lg hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 animate-pulse"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="w-4 h-4" />
            <span className="font-semibold tracking-wide">Add Event</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards - ONLY 3 now, centered */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        <Card
          className={`glass-card border-border cursor-pointer transition-all group ${
            activeTab === 'all'
              ? 'ring-2 ring-blue-500 bg-blue-500/10'
              : 'hover:bg-muted/50'
          }`}
          onClick={() => scrollToEvents('all')}
        >
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Events</p>
              <h3 className="text-2xl font-bold text-foreground">{totalEvents}</h3>
              <p className="text-xs text-blue-500 font-medium">
                All events in system
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
          onClick={() => scrollToEvents('active')}
        >
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Clock className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Now</p>
              <h3 className="text-2xl font-bold text-foreground">{activeCount}</h3>
              <p className="text-xs text-green-500 font-medium">
                Events currently running
              </p>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`glass-card border-border cursor-pointer transition-all group ${
            activeTab === 'upcoming'
              ? 'ring-2 ring-purple-500 bg-purple-500/10'
              : 'hover:bg-muted/50'
          }`}
          onClick={() => scrollToEvents('upcoming')}
        >
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Upcoming Events</p>
              <h3 className="text-2xl font-bold text-foreground">{upcomingCount}</h3>
              <p className="text-xs text-purple-500 font-medium">Planned events</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search + Status Tabs */}
      <Card className="glass-card border-border">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Tabs */}
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
              <Button
                variant={activeTab === 'all' ? 'default' : 'outline'}
                onClick={() => setActiveTab('all')}
                className={`whitespace-nowrap ${
                  activeTab === 'all'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : ''
                }`}
              >
                All
              </Button>
              <Button
                variant={activeTab === 'active' ? 'default' : 'outline'}
                onClick={() => setActiveTab('active')}
                className={`whitespace-nowrap ${
                  activeTab === 'active'
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : ''
                }`}
              >
                Active
              </Button>
              <Button
                variant={activeTab === 'upcoming' ? 'default' : 'outline'}
                onClick={() => setActiveTab('upcoming')}
                className={`whitespace-nowrap ${
                  activeTab === 'upcoming'
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : ''
                }`}
              >
                Upcoming
              </Button>
              <Button
                variant={activeTab === 'completed' ? 'default' : 'outline'}
                onClick={() => setActiveTab('completed')}
                className={`whitespace-nowrap ${
                  activeTab === 'completed'
                    ? 'bg-gray-600 hover:bg-gray-700 text-white'
                    : ''
                }`}
              >
                Completed
              </Button>
              <Button
                variant={activeTab === 'cancelled' ? 'default' : 'outline'}
                onClick={() => setActiveTab('cancelled')}
                className={`whitespace-nowrap ${
                  activeTab === 'cancelled'
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : ''
                }`}
              >
                Cancelled
              </Button>
            </div>

            {/* Search box */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events Grid */}
      <div
        ref={eventsListRef}
        className={`grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-500 ${
          isGlowing ? 'ring-4 ring-primary/50 rounded-xl p-2 bg-primary/5' : ''
        }`}
      >
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <Card
              key={event.id}
              className="glass-card border-border hover:shadow-xl transition-all duration-300"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getTypeBadgeClasses(event.type)}>
                        {event.type}
                      </Badge>
                      {getStatusBadge(event.status)}
                    </div>
                    <CardTitle
                      className="text-lg text-foreground cursor-pointer hover:text-primary hover:underline transition-colors"
                      onClick={() => setSelectedEvent(event)}
                    >
                      {event.name}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {event.description}
                </p>

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
                    <span>
                      {event.expectedAttendees?.toLocaleString() || 0} expected
                      attendees
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Tag className="w-4 h-4" />
                    <span>Organizer: {event.organizer}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-border text-sm">
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
                  <Button
                    variant="outline"
                    className="flex-1 gap-2"
                    size="sm"
                    onClick={() => setSelectedEvent(event)}
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </Button>
                  <Button variant="outline" className="gap-2" size="sm">
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(event.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No events found matching your search.
          </div>
        )}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-foreground">
                      Event Details – {selectedEvent.name}
                    </CardTitle>
                    {getStatusBadge(selectedEvent.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {selectedEvent.type} • {selectedEvent.location}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedEvent(null)}
                >
                  <XCircle className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {selectedEvent.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Dates</p>
                  <p className="font-medium text-foreground">
                    {selectedEvent.date}
                    {selectedEvent.endDate !== selectedEvent.date &&
                      ` – ${selectedEvent.endDate}`}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Location</p>
                  <p className="font-medium text-foreground">
                    {selectedEvent.location}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Organizer</p>
                  <p className="font-medium text-foreground">
                    {selectedEvent.organizer}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Entry Fee</p>
                  <p className="font-medium text-foreground">
                    {selectedEvent.entryFee === 0
                      ? 'Free'
                      : `₹${selectedEvent.entryFee}`}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Registration
                  </p>
                  <p className="font-medium text-foreground">
                    {selectedEvent.registrationRequired
                      ? 'Required'
                      : 'Not Required'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Expected Visitors
                  </p>
                  <p className="font-medium text-foreground">
                    {selectedEvent.expectedAttendees?.toLocaleString() || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-foreground">
                  Add New Festival / Event
                </CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowAddModal(false)}
                >
                  <XCircle className="w-5 h-5" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Fill in the festival details including dates, location, organizers and
                entry information.
              </p>
            </CardHeader>
            <CardContent>
              <form className="space-y-5" onSubmit={handleAddEventSubmit}>
                {/* Festival Name & Type */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">
                      Festival Name
                    </label>
                    <input
                      type="text"
                      value={newEvent.name}
                      onChange={(e) =>
                        handleNewEventChange('name', e.target.value)
                      }
                      className="mt-1 w-full px-3 py-2 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                      placeholder="Enter festival or event name"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">
                      Type of Festival / Event
                    </label>
                    <select
                      value={newEvent.type}
                      onChange={(e) =>
                        handleNewEventChange('type', e.target.value)
                      }
                      className="mt-1 w-full px-3 py-2 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                    >
                      <option>Cultural Event</option>
                      <option>Cultural Festival</option>
                      <option>Religious Event</option>
                      <option>Film Festival</option>
                      <option>Tribal Festival</option>
                      <option>Tribal Dance Festival</option>
                      <option>Fair</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground">
                    Description
                  </label>
                  <textarea
                    value={newEvent.description}
                    onChange={(e) =>
                      handleNewEventChange('description', e.target.value)
                    }
                    className="mt-1 w-full px-3 py-2 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm min-h-[80px]"
                    placeholder="Short description about the festival / event"
                  />
                </div>

                {/* Location & Organizer */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">
                      Location / Destination
                    </label>
                    <input
                      type="text"
                      value={newEvent.location}
                      onChange={(e) =>
                        handleNewEventChange('location', e.target.value)
                      }
                      className="mt-1 w-full px-3 py-2 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                      placeholder="City, District, State"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">
                      Organizers
                    </label>
                    <input
                      type="text"
                      value={newEvent.organizer}
                      onChange={(e) =>
                        handleNewEventChange('organizer', e.target.value)
                      }
                      className="mt-1 w-full px-3 py-2 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                      placeholder="Organizer / Department / Organization"
                      required
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={newEvent.date}
                      onChange={(e) =>
                        handleNewEventChange('date', e.target.value)
                      }
                      className="mt-1 w-full px-3 py-2 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      End Date
                    </label>
                    <input
                      type="date"
                      value={newEvent.endDate}
                      onChange={(e) =>
                        handleNewEventChange('endDate', e.target.value)
                      }
                      className="mt-1 w-full px-3 py-2 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                      placeholder="Can be same as start date"
                    />
                  </div>
                </div>

                {/* Entry, Registration, Visitors */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">
                      Entry Fee (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={newEvent.entryFee}
                      onChange={(e) =>
                        handleNewEventChange('entryFee', e.target.value)
                      }
                      className="mt-1 w-full px-3 py-2 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                      placeholder="0 for free"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">
                      Registration
                    </label>
                    <select
                      value={newEvent.registrationRequired}
                      onChange={(e) =>
                        handleNewEventChange(
                          'registrationRequired',
                          e.target.value
                        )
                      }
                      className="mt-1 w-full px-3 py-2 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                    >
                      <option value="required">Required</option>
                      <option value="not_required">Not Required</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground">
                      Expected Visitors
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={newEvent.expectedAttendees}
                      onChange={(e) =>
                        handleNewEventChange(
                          'expectedAttendees',
                          e.target.value
                        )
                      }
                      className="mt-1 w-full px-3 py-2 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
                      placeholder="e.g., 20000"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save Event</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
