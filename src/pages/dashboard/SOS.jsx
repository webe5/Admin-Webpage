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
  Activity,
  Search,
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
    assignedTo: null,
  },
  {
    id: 2,
    touristName: 'Sarah Smith',
    location: 'Red Fort, Delhi',
    coordinates: { lat: 28.6562, lng: 77.241 },
    threatLevel: 'medium',
    type: 'Lost',
    description: 'Tourist separated from group',
    time: '25 mins ago',
    status: 'active',
    assignedTo: null,
  },
  {
    id: 3,
    touristName: 'Michael Chen',
    location: 'Gateway of India, Mumbai',
    coordinates: { lat: 18.922, lng: 72.8347 },
    threatLevel: 'low',
    type: 'General Assistance',
    description: 'Need directions to hotel',
    time: '45 mins ago',
    status: 'active',
    assignedTo: null,
  },
];

const responders = [
  { id: 1, name: 'Police Unit 1', type: 'police', available: true },
  { id: 2, name: 'Medical Team A', type: 'medical', available: true },
  { id: 3, name: 'Volunteer Group 1', type: 'volunteer', available: true },
];

export default function SOS() {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // all | high | medium | low
  const [searchTerm, setSearchTerm] = useState('');

  const getThreatColor = (level) => {
    switch (level) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-orange-500';
      case 'low':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getThreatBadgeVariant = (level) => {
    switch (level) {
      case 'high':
        return 'destructive';
      case 'medium':
        return 'warning';
      case 'low':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const handleAssignResponder = (alertId, responderId) => {
    console.log(`Assigning responder ${responderId} to alert ${alertId}`);
    // Later you can update state here
  };

  // ----- Stats -----
  const totalAlerts = sosAlerts.length;
  const highCount = sosAlerts.filter((a) => a.threatLevel === 'high').length;
  const mediumCount = sosAlerts.filter((a) => a.threatLevel === 'medium').length;
  const lowCount = sosAlerts.filter((a) => a.threatLevel === 'low').length;

  // ----- Filters (like Vendors UI) -----
  const alertsByTab =
    activeTab === 'all'
      ? sosAlerts
      : sosAlerts.filter((a) => a.threatLevel === activeTab);

  const filteredAlerts = alertsByTab.filter((alert) => {
    const term = searchTerm.toLowerCase();
    return (
      alert.touristName.toLowerCase().includes(term) ||
      alert.location.toLowerCase().includes(term) ||
      alert.type.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header (similar style to Vendors/Events) */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">SOS Console</h1>
          <p className="text-muted-foreground mt-2">
            Real-time emergency alerts and response management
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-foreground">Live</span>
          </div>
          <Badge variant="destructive" className="text-sm px-4 py-2">
            {totalAlerts} Active Alerts
          </Badge>
        </div>
      </div>

      {/* Stats Row – like Vendors quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">
                  Total Alerts Today
                </p>
                <p className="text-3xl font-bold text-foreground">{totalAlerts}</p>
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
                <p className="text-muted-foreground text-sm mb-1">
                  High Threat
                </p>
                <p className="text-3xl font-bold text-red-600">{highCount}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm mb-1">
                  Medium Threat
                </p>
                <p className="text-3xl font-bold text-orange-600">
                  {mediumCount}
                </p>
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
                <p className="text-muted-foreground text-sm mb-1">Low Threat</p>
                <p className="text-3xl font-bold text-yellow-600">{lowCount}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter + Search Card – same pattern as Vendors/Events */}
      <Card className="glass-card border-border">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            {/* Threat Tabs */}
            <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
              <Button
                variant={activeTab === 'all' ? 'default' : 'outline'}
                onClick={() => setActiveTab('all')}
                className={`whitespace-nowrap ${
                  activeTab === 'all'
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : ''
                }`}
              >
                All
              </Button>
              <Button
                variant={activeTab === 'high' ? 'default' : 'outline'}
                onClick={() => setActiveTab('high')}
                className={`whitespace-nowrap ${
                  activeTab === 'high'
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : ''
                }`}
              >
                High
              </Button>
              <Button
                variant={activeTab === 'medium' ? 'default' : 'outline'}
                onClick={() => setActiveTab('medium')}
                className={`whitespace-nowrap ${
                  activeTab === 'medium'
                    ? 'bg-orange-600 hover:bg-orange-700 text-white'
                    : ''
                }`}
              >
                Medium
              </Button>
              <Button
                variant={activeTab === 'low' ? 'default' : 'outline'}
                onClick={() => setActiveTab('low')}
                className={`whitespace-nowrap ${
                  activeTab === 'low'
                    ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                    : ''
                }`}
              >
                Low
              </Button>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by tourist, location, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Layout – Live Feed + Assignment Panel (2 cols like dashboard modules) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live OS Feed – cards styled like vendor/events cards */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">Live SOS Feed</h2>
          {filteredAlerts.length > 0 ? (
            filteredAlerts.map((alert) => (
              <Card
                key={alert.id}
                className={`glass-card border-border hover:shadow-xl transition-all duration-300 cursor-pointer ${
                  selectedAlert?.id === alert.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedAlert(alert)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 ${getThreatColor(
                          alert.threatLevel
                        )} rounded-full flex items-center justify-center flex-shrink-0`}
                      >
                        <Siren className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground">
                          {alert.type}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {alert.description}
                        </p>
                      </div>
                    </div>
                    <Badge variant={getThreatBadgeVariant(alert.threatLevel)}>
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
                    <Button
                      variant="outline"
                      className="flex-1 gap-2"
                      size="sm"
                    >
                      <Navigation className="w-4 h-4" />
                      View on Map
                    </Button>
                    <Button
                      className="flex-1 gap-2 bg-green-600 hover:bg-green-700 text-white"
                      size="sm"
                    >
                      <Phone className="w-4 h-4" />
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-10 text-muted-foreground text-sm">
              No alerts match your filter/search.
            </div>
          )}
        </div>

        {/* Assignment Panel – right side details, same card style as other pages */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">
            Assign Responders
          </h2>
          <Card className="glass-card border-border">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">
                {selectedAlert
                  ? `Alert #${selectedAlert.id} – ${selectedAlert.type}`
                  : 'Select an alert from the left'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedAlert ? (
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-xl">
                    <p className="text-sm text-muted-foreground mb-2">
                      Location
                    </p>
                    <p className="font-semibold text-foreground">
                      {selectedAlert.location}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {selectedAlert.coordinates.lat},{' '}
                      {selectedAlert.coordinates.lng}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-foreground mb-3">
                      Available Responders
                    </p>
                    <div className="space-y-2">
                      {responders.map((responder) => (
                        <div
                          key={responder.id}
                          className="flex items-center justify-between p-3 bg-card rounded-lg border border-border hover:border-primary transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                responder.available
                                  ? 'bg-green-500'
                                  : 'bg-muted'
                              }`}
                            />
                            <div>
                              <p className="font-medium text-sm text-foreground">
                                {responder.name}
                              </p>
                              <p className="text-xs text-muted-foreground capitalize">
                                {responder.type}
                              </p>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            disabled={!responder.available}
                            onClick={() =>
                              handleAssignResponder(
                                selectedAlert.id,
                                responder.id
                              )
                            }
                          >
                            Assign
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-medium text-foreground mb-2">
                      Status Timeline
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <span className="text-muted-foreground">
                          Received – {selectedAlert.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-muted rounded-full" />
                        <span className="text-muted-foreground/70">
                          En Route – Pending
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-muted rounded-full" />
                        <span className="text-muted-foreground/70">
                          Resolved – Pending
                        </span>
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
