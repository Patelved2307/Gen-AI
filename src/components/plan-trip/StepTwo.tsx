import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { Users, Baby, User, UserCheck, Accessibility, Calendar, ArrowLeft } from 'lucide-react';
import { TripData } from '../PlanTripPage';

interface StepTwoProps {
  tripData: TripData;
  updateTripData: (data: Partial<TripData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function StepTwo({ tripData, updateTripData, onNext, onPrev }: StepTwoProps) {
  const travelerCategories = [
    { 
      key: 'newborns' as keyof typeof tripData.travelers, 
      label: 'Newborn Babies', 
      description: '0-5 years', 
      icon: Baby,
      color: 'bg-pink-100 text-pink-600'
    },
    { 
      key: 'children' as keyof typeof tripData.travelers, 
      label: 'Children', 
      description: '5-18 years', 
      icon: User,
      color: 'bg-blue-100 text-blue-600'
    },
    { 
      key: 'adults' as keyof typeof tripData.travelers, 
      label: 'Adults', 
      description: '18-60 years', 
      icon: User,
      color: 'bg-green-100 text-green-600'
    },
    { 
      key: 'seniors' as keyof typeof tripData.travelers, 
      label: 'Senior Citizens', 
      description: 'Above 60 years', 
      icon: UserCheck,
      color: 'bg-purple-100 text-purple-600'
    },
    { 
      key: 'handicapped' as keyof typeof tripData.travelers, 
      label: 'Special Needs', 
      description: 'Requiring assistance', 
      icon: Accessibility,
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const updateTravelerCount = (category: keyof typeof tripData.travelers, value: number) => {
    updateTripData({
      travelers: {
        ...tripData.travelers,
        [category]: Math.max(0, value)
      }
    });
  };

  const updateOrganizerField = (field: keyof typeof tripData.organizer, value: string) => {
    updateTripData({
      organizer: {
        ...tripData.organizer,
        [field]: value
      }
    });
  };

  const updateAssistantField = (field: keyof typeof tripData.assistant, value: string) => {
    updateTripData({
      assistant: {
        ...tripData.assistant,
        [field]: value
      }
    });
  };

  const handleSubmit = () => {
    const totalTravelers = Object.values(tripData.travelers).reduce((sum, count) => sum + count, 0);
    
    if (totalTravelers === 0) {
      alert('Please add at least one traveler');
      return;
    }

    if (!tripData.organizer.name || !tripData.organizer.email || !tripData.organizer.mobile1) {
      alert('Please fill in all required organizer details');
      return;
    }

    if (!tripData.startDate || !tripData.endDate) {
      alert('Please select travel dates');
      return;
    }

    if (new Date(tripData.startDate) >= new Date(tripData.endDate)) {
      alert('End date must be after start date');
      return;
    }

    onNext();
  };

  const getTotalTravelers = () => {
    return Object.values(tripData.travelers).reduce((sum, count) => sum + count, 0);
  };

  return (
    <div className="space-y-6">
      {/* Traveler Quantities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Traveler Details
          </CardTitle>
          <CardDescription>
            Specify the number of travelers in each category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {travelerCategories.map((category) => (
              <div key={category.key} className="p-4 border rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${category.color}`}>
                    <category.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">{category.label}</h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateTravelerCount(category.key, tripData.travelers[category.key] - 1)}
                    disabled={tripData.travelers[category.key] === 0}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-medium">
                    {tripData.travelers[category.key]}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateTravelerCount(category.key, tripData.travelers[category.key] + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-medium">Total Travelers:</span>
              <Badge variant="secondary" className="text-lg px-3 py-1">
                {getTotalTravelers()} people
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Organizer Details */}
      <Card>
        <CardHeader>
          <CardTitle>Group Organizer/Leader Details</CardTitle>
          <CardDescription>
            Details of the person organizing the trip
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="organizer-name">Full Name *</Label>
              <Input
                id="organizer-name"
                value={tripData.organizer.name}
                onChange={(e) => updateOrganizerField('name', e.target.value)}
                placeholder="Enter full name"
              />
            </div>
            <div>
              <Label htmlFor="organizer-email">Email ID *</Label>
              <Input
                id="organizer-email"
                type="email"
                value={tripData.organizer.email}
                onChange={(e) => updateOrganizerField('email', e.target.value)}
                placeholder="Enter email address"
              />
            </div>
            <div>
              <Label htmlFor="organizer-mobile1">Primary Mobile Number *</Label>
              <Input
                id="organizer-mobile1"
                type="tel"
                value={tripData.organizer.mobile1}
                onChange={(e) => updateOrganizerField('mobile1', e.target.value)}
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
            <div>
              <Label htmlFor="organizer-mobile2">Secondary Mobile Number</Label>
              <Input
                id="organizer-mobile2"
                type="tel"
                value={tripData.organizer.mobile2}
                onChange={(e) => updateOrganizerField('mobile2', e.target.value)}
                placeholder="+91 XXXXX XXXXX (Optional)"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assistant Details */}
      <Card>
        <CardHeader>
          <CardTitle>Assistant/Helper Details</CardTitle>
          <CardDescription>
            Details of the assistant from group members (Optional)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="assistant-name">Full Name</Label>
              <Input
                id="assistant-name"
                value={tripData.assistant.name}
                onChange={(e) => updateAssistantField('name', e.target.value)}
                placeholder="Enter full name"
              />
            </div>
            <div>
              <Label htmlFor="assistant-email">Email ID</Label>
              <Input
                id="assistant-email"
                type="email"
                value={tripData.assistant.email}
                onChange={(e) => updateAssistantField('email', e.target.value)}
                placeholder="Enter email address"
              />
            </div>
            <div>
              <Label htmlFor="assistant-mobile1">Primary Mobile Number</Label>
              <Input
                id="assistant-mobile1"
                type="tel"
                value={tripData.assistant.mobile1}
                onChange={(e) => updateAssistantField('mobile1', e.target.value)}
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
            <div>
              <Label htmlFor="assistant-mobile2">Secondary Mobile Number</Label>
              <Input
                id="assistant-mobile2"
                type="tel"
                value={tripData.assistant.mobile2}
                onChange={(e) => updateAssistantField('mobile2', e.target.value)}
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Travel Dates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Travel Dates
          </CardTitle>
          <CardDescription>
            Select your trip start and end dates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start-date">Start Date *</Label>
              <Input
                id="start-date"
                type="date"
                value={tripData.startDate}
                onChange={(e) => updateTripData({ startDate: e.target.value })}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <Label htmlFor="end-date">End Date *</Label>
              <Input
                id="end-date"
                type="date"
                value={tripData.endDate}
                onChange={(e) => updateTripData({ endDate: e.target.value })}
                min={tripData.startDate || new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
          
          {tripData.startDate && tripData.endDate && (
            <div className="mt-4 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium">Trip Duration:</span>
                <Badge variant="secondary">
                  {Math.ceil((new Date(tripData.endDate).getTime() - new Date(tripData.startDate).getTime()) / (1000 * 60 * 60 * 24))} days
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button onClick={handleSubmit} size="lg" className="px-8">
          Continue to Services
        </Button>
      </div>
    </div>
  );
}