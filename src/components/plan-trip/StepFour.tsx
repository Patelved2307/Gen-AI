import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { 
  Edit3, 
  MapPin, 
  Calendar, 
  Users, 
  DollarSign, 
  Heart, 
  Car, 
  Home, 
  ArrowLeft,
  Check,
  User,
  UserCheck
} from 'lucide-react';
import { TripData } from '../PlanTripPage';

interface StepFourProps {
  tripData: TripData;
  updateTripData: (data: Partial<TripData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function StepFour({ tripData, updateTripData, onNext, onPrev }: StepFourProps) {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [tempData, setTempData] = useState<Partial<TripData>>({});

  const getTotalTravelers = () => {
    return Object.values(tripData.travelers).reduce((sum, count) => sum + count, 0);
  };

  const getTripDuration = () => {
    if (!tripData.startDate || !tripData.endDate) return 0;
    return Math.ceil((new Date(tripData.endDate).getTime() - new Date(tripData.startDate).getTime()) / (1000 * 60 * 60 * 24));
  };

  const getSelectedServices = () => {
    const services = [];
    if (tripData.medicalFacilities) services.push('Medical Facilities');
    if (tripData.transportation) services.push('Transportation');
    if (tripData.accommodation) services.push('Accommodation');
    return services;
  };

  const openEditDialog = (section: string) => {
    setEditingSection(section);
    setTempData({ ...tripData });
  };

  const saveChanges = () => {
    updateTripData(tempData);
    setEditingSection(null);
    setTempData({});
  };

  const cancelEdit = () => {
    setEditingSection(null);
    setTempData({});
  };

  const handleSubmit = () => {
    onNext();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-600" />
            Trip Preview & Confirmation
          </CardTitle>
          <CardDescription>
            Review all your trip details below. You can edit any section if needed.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Destination & Budget */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              <CardTitle>Destination & Budget</CardTitle>
            </div>
            <Dialog open={editingSection === 'destination'} onOpenChange={(open) => !open && cancelEdit()}>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => openEditDialog('destination')}
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Destination & Budget</DialogTitle>
                  <DialogDescription>
                    Update your destination and budget preferences
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="edit-destination">Destination</Label>
                    <Input
                      id="edit-destination"
                      value={tempData.destination || ''}
                      onChange={(e) => setTempData({ ...tempData, destination: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-location-types">Location Types</Label>
                    <Input
                      id="edit-location-types"
                      value={tempData.locationTypes?.join(', ') || ''}
                      onChange={(e) => setTempData({ ...tempData, locationTypes: e.target.value.split(', ').filter(t => t.trim()) })}
                      placeholder="e.g., adventure, nature, cultural"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={saveChanges}>Save Changes</Button>
                    <Button variant="outline" onClick={cancelEdit}>Cancel</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium mb-2">Destination</h4>
              <p className="text-muted-foreground">{tripData.destination}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Type</h4>
              <Badge variant="secondary">{tripData.locationType}</Badge>
            </div>
            <div>
              <h4 className="font-medium mb-2">Budget Range</h4>
              <p className="text-muted-foreground">
                ₹{tripData.budget.min.toLocaleString()} - ₹{tripData.budget.max.toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Travel Details */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-600" />
              <CardTitle>Travel Details</CardTitle>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => openEditDialog('travel')}
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium mb-2">Travel Dates</h4>
              <p className="text-muted-foreground">
                {new Date(tripData.startDate).toLocaleDateString()} - {new Date(tripData.endDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Duration</h4>
              <Badge variant="secondary">{getTripDuration()} days</Badge>
            </div>
            <div>
              <h4 className="font-medium mb-2">Total Travelers</h4>
              <Badge variant="secondary">{getTotalTravelers()} people</Badge>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-muted/30 rounded-lg">
            <h4 className="font-medium mb-3">Traveler Breakdown:</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
              {tripData.travelers.newborns > 0 && (
                <span>Newborns: {tripData.travelers.newborns}</span>
              )}
              {tripData.travelers.children > 0 && (
                <span>Children: {tripData.travelers.children}</span>
              )}
              {tripData.travelers.adults > 0 && (
                <span>Adults: {tripData.travelers.adults}</span>
              )}
              {tripData.travelers.seniors > 0 && (
                <span>Seniors: {tripData.travelers.seniors}</span>
              )}
              {tripData.travelers.handicapped > 0 && (
                <span>Special Needs: {tripData.travelers.handicapped}</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Details */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-purple-600" />
              <CardTitle>Contact Details</CardTitle>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => openEditDialog('contacts')}
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <UserCheck className="h-4 w-4" />
                Group Organizer
              </h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Name:</span> {tripData.organizer.name}</p>
                <p><span className="font-medium">Email:</span> {tripData.organizer.email}</p>
                <p><span className="font-medium">Mobile:</span> {tripData.organizer.mobile1}</p>
                {tripData.organizer.mobile2 && (
                  <p><span className="font-medium">Alt Mobile:</span> {tripData.organizer.mobile2}</p>
                )}
              </div>
            </div>
            
            {tripData.assistant.name && (
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Assistant
                </h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Name:</span> {tripData.assistant.name}</p>
                  <p><span className="font-medium">Email:</span> {tripData.assistant.email}</p>
                  <p><span className="font-medium">Mobile:</span> {tripData.assistant.mobile1}</p>
                  {tripData.assistant.mobile2 && (
                    <p><span className="font-medium">Alt Mobile:</span> {tripData.assistant.mobile2}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Selected Services */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-orange-600" />
              <CardTitle>Selected Services</CardTitle>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => openEditDialog('services')}
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {getSelectedServices().length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tripData.medicalFacilities && (
                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border">
                  <Heart className="h-5 w-5 text-red-600" />
                  <span>Medical Facilities</span>
                </div>
              )}
              {tripData.transportation && (
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border">
                  <Car className="h-5 w-5 text-blue-600" />
                  <span>Transportation</span>
                </div>
              )}
              {tripData.accommodation && (
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border">
                  <Home className="h-5 w-5 text-green-600" />
                  <span>Accommodation</span>
                </div>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground">No additional services selected</p>
          )}
          
          <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-sm text-primary font-medium">
              ✅ 24/7 Travel Agent Support is included with all trips
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Ready to Generate Your Itinerary?</h3>
            <p className="text-muted-foreground mb-4">
              Our AI will create a detailed day-to-day itinerary based on your preferences. 
              You can review and edit it in the next step.
            </p>
            <Badge variant="secondary" className="text-base px-4 py-2">
              All details confirmed ✓
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button onClick={handleSubmit} size="lg" className="px-8">
          Generate AI Itinerary
        </Button>
      </div>
    </div>
  );
}