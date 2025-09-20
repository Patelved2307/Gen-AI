import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Download, 
  Eye, 
  Trash2,
  Plus,
  Clock,
  Star
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface MyTripsPageProps {
  navigateTo: (page: string) => void;
  user: User | null;
}

interface Trip {
  bookingId: string;
  destination: string;
  startDate: string;
  endDate: string;
  totalCost: number;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  travelers: {
    newborns: number;
    children: number;
    adults: number;
    seniors: number;
    handicapped: number;
  };
  bookingDate: string;
  itinerary: Array<{
    day: number;
    title: string;
    activities: string[];
    accommodation: string;
    meals: string[];
  }>;
}

export function MyTripsPage({ navigateTo, user }: MyTripsPageProps) {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    // Load trips from localStorage
    const savedTrips = localStorage.getItem('myTrips');
    if (savedTrips) {
      setTrips(JSON.parse(savedTrips));
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Sign In Required</CardTitle>
              <CardDescription>
                Please sign in to view your trips
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigateTo('auth')} size="lg">
                Sign In to Continue
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const getTotalTravelers = (travelers: Trip['travelers']) => {
    return Object.values(travelers).reduce((sum, count) => sum + count, 0);
  };

  const getTripDuration = (startDate: string, endDate: string) => {
    return Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filterTrips = (status: string) => {
    const now = new Date();
    
    return trips.filter(trip => {
      const startDate = new Date(trip.startDate);
      const endDate = new Date(trip.endDate);
      
      switch (status) {
        case 'upcoming':
          return startDate > now && trip.status === 'confirmed';
        case 'ongoing':
          return startDate <= now && endDate >= now && trip.status === 'confirmed';
        case 'completed':
          return endDate < now && trip.status === 'confirmed';
        case 'cancelled':
          return trip.status === 'cancelled';
        default:
          return true;
      }
    });
  };

  const downloadPDF = (trip: Trip, type: 'itinerary' | 'details') => {
    const filename = type === 'itinerary' 
      ? `${trip.destination}_Itinerary_${trip.startDate}.pdf`
      : `${trip.destination}_Booking_Details_${trip.bookingId}.pdf`;
    
    alert(`Downloading ${filename}...`);
  };

  const deleteTrip = (bookingId: string) => {
    if (confirm('Are you sure you want to delete this trip?')) {
      const updatedTrips = trips.filter(trip => trip.bookingId !== bookingId);
      setTrips(updatedTrips);
      localStorage.setItem('myTrips', JSON.stringify(updatedTrips));
    }
  };

  const tripTabs = [
    { id: 'upcoming', label: 'Upcoming', count: filterTrips('upcoming').length },
    { id: 'ongoing', label: 'Ongoing', count: filterTrips('ongoing').length },
    { id: 'completed', label: 'Completed', count: filterTrips('completed').length },
    { id: 'cancelled', label: 'Cancelled', count: filterTrips('cancelled').length }
  ];

  const renderTripCard = (trip: Trip) => (
    <Card key={trip.bookingId} className="overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              {trip.destination}
            </CardTitle>
            <CardDescription className="mt-2">
              Booking ID: {trip.bookingId}
            </CardDescription>
          </div>
          <Badge className={getStatusColor(trip.status)}>
            {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Travel Dates</p>
              <p className="text-xs text-muted-foreground">
                {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">{getTotalTravelers(trip.travelers)} Travelers</p>
              <p className="text-xs text-muted-foreground">
                {getTripDuration(trip.startDate, trip.endDate)} days
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">₹{trip.totalCost.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">
                Booked on {new Date(trip.bookingDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => downloadPDF(trip, 'itinerary')}
            className="flex items-center gap-1"
          >
            <Download className="h-3 w-3" />
            Itinerary
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => downloadPDF(trip, 'details')}
            className="flex items-center gap-1"
          >
            <Download className="h-3 w-3" />
            Details
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Eye className="h-3 w-3" />
            View Plan
          </Button>
          {trip.status !== 'completed' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => deleteTrip(trip.bookingId)}
              className="flex items-center gap-1 text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-3 w-3" />
              Delete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl mb-4">My Trips</h1>
          <p className="text-xl text-muted-foreground">
            Manage your bookings and download your travel documents
          </p>
        </div>

        {trips.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <div className="max-w-md mx-auto">
                <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl mb-2">No trips yet</h2>
                <p className="text-muted-foreground mb-6">
                  Start planning your next adventure with our curated packages or custom trip planner.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => navigateTo('packages')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Browse Packages
                  </Button>
                  <Button variant="outline" onClick={() => navigateTo('plan-trip')}>
                    Plan Custom Trip
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              {tripTabs.map(tab => (
                <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                  {tab.label}
                  {tab.count > 0 && (
                    <Badge variant="secondary" className="text-xs">
                      {tab.count}
                    </Badge>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            {tripTabs.map(tab => (
              <TabsContent key={tab.id} value={tab.id} className="mt-6">
                <div className="space-y-6">
                  {filterTrips(tab.id).length > 0 ? (
                    filterTrips(tab.id).map(renderTripCard)
                  ) : (
                    <Card className="text-center py-8">
                      <CardContent>
                        <p className="text-muted-foreground">
                          No {tab.label.toLowerCase()} trips found.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}

        {/* Quick Actions */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl mb-4">Ready for your next adventure?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => navigateTo('packages')}>
              Browse Packages
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigateTo('plan-trip')}>
              Plan Custom Trip
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}