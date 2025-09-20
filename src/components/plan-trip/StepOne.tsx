import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { Badge } from '../ui/badge';
import { MapPin, Mountain, Waves, Camera, Trees, Building2, Palmtree, Sunrise, Utensils, Tent, Heart, Sparkles } from 'lucide-react';
import { TripData } from '../PlanTripPage';

interface StepOneProps {
  tripData: TripData;
  updateTripData: (data: Partial<TripData>) => void;
  onNext: () => void;
}

export function StepOne({ tripData, updateTripData, onNext }: StepOneProps) {
  const [budgetRange, setBudgetRange] = useState([tripData.budget.min, tripData.budget.max]);

  const locationTypes = [
    { id: 'adventure', name: 'Adventurous', icon: Mountain, description: 'Thrilling activities and extreme sports' },
    { id: 'nature', name: 'Nature & Forest', icon: Trees, description: 'Peaceful natural landscapes and forests' },
    { id: 'wildlife', name: 'Wildlife Safari', icon: Camera, description: 'Animal sanctuaries and national parks' },
    { id: 'mountains', name: 'Mountains & Hill Stations', icon: Mountain, description: 'High altitude destinations and peaks' },
    { id: 'beaches', name: 'Beaches & Islands', icon: Waves, description: 'Coastal destinations and tropical islands' },
    { id: 'cultural', name: 'Cultural Heritage', icon: Building2, description: 'Historical monuments and cultural sites' },
    { id: 'desert', name: 'Desert Experience', icon: Tent, description: 'Desert landscapes and sand dunes' },
    { id: 'spiritual', name: 'Spiritual & Religious', icon: Heart, description: 'Temples, monasteries and spiritual retreats' },
    { id: 'culinary', name: 'Food & Culinary Tours', icon: Utensils, description: 'Local cuisine and food experiences' },
    { id: 'wellness', name: 'Wellness & Spa', icon: Sparkles, description: 'Ayurveda, spa treatments and wellness' },
    { id: 'luxury', name: 'Luxury & Premium', icon: Palmtree, description: 'Premium resorts and luxury experiences' },
    { id: 'offbeat', name: 'Offbeat & Hidden Gems', icon: Sunrise, description: 'Unexplored and unique destinations' }
  ];

  const handleLocationTypeToggle = (typeId: string) => {
    const currentTypes = tripData.locationTypes || [];
    const updatedTypes = currentTypes.includes(typeId)
      ? currentTypes.filter(id => id !== typeId)
      : [...currentTypes, typeId];
    
    updateTripData({ locationTypes: updatedTypes });
  };

  const handleSubmit = () => {
    if (!tripData.destination || !tripData.locationTypes || tripData.locationTypes.length === 0) {
      alert('Please fill in all required fields and select at least one location type');
      return;
    }

    updateTripData({
      budget: { min: budgetRange[0], max: budgetRange[1] }
    });
    onNext();
  };

  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Destination Selection
          </CardTitle>
          <CardDescription>
            Choose your travel destination (International & National)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="destination">Destination *</Label>
            <Input
              id="destination"
              placeholder="e.g., Goa, Switzerland, Japan, Kerala..."
              value={tripData.destination}
              onChange={(e) => updateTripData({ destination: e.target.value })}
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Location Types</CardTitle>
          <CardDescription>
            What types of experiences are you looking for? (Select multiple)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {locationTypes.map((type) => {
              const isSelected = tripData.locationTypes?.includes(type.id) || false;
              return (
                <div
                  key={type.id}
                  onClick={() => handleLocationTypeToggle(type.id)}
                  className={`
                    p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md
                    ${isSelected
                      ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                      : 'border-border hover:border-primary/50'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`
                      p-2 rounded-lg
                      ${isSelected
                        ? 'bg-primary text-white' 
                        : 'bg-muted text-muted-foreground'
                      }
                    `}>
                      <type.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{type.name}</h3>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                    </div>
                    {isSelected && (
                      <div className="flex-shrink-0">
                        <Badge className="bg-primary text-white">✓</Badge>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {tripData.locationTypes && tripData.locationTypes.length > 0 && (
            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">Selected Experience Types:</span>
                <Badge variant="secondary" className="px-3 py-1">
                  {tripData.locationTypes.length} selected
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2">
                {tripData.locationTypes.map((typeId) => {
                  const type = locationTypes.find(t => t.id === typeId);
                  return type ? (
                    <Badge key={typeId} variant="outline" className="flex items-center gap-1">
                      <type.icon className="h-3 w-3" />
                      {type.name}
                    </Badge>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Budget Range</CardTitle>
          <CardDescription>
            Set your budget range per person (₹5,000 - ₹1,00,000+)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-muted-foreground">Budget Range</span>
              <div className="text-lg font-semibold">
                {formatCurrency(budgetRange[0])} - {formatCurrency(budgetRange[1])}
              </div>
            </div>
            
            <Slider
              value={budgetRange}
              onValueChange={setBudgetRange}
              max={100000}
              min={5000}
              step={5000}
              className="w-full"
            />
            
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>₹5,000</span>
              <span>₹50,000</span>
              <span>₹1,00,000+</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 border rounded-lg">
              <h4 className="font-medium text-green-600">Budget Friendly</h4>
              <p className="text-sm text-muted-foreground">₹5,000 - ₹25,000</p>
              <p className="text-xs text-muted-foreground mt-1">
                Great for domestic trips and budget accommodations
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h4 className="font-medium text-blue-600">Mid Range</h4>
              <p className="text-sm text-muted-foreground">₹25,000 - ₹60,000</p>
              <p className="text-xs text-muted-foreground mt-1">
                Perfect balance of comfort and affordability
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h4 className="font-medium text-purple-600">Premium</h4>
              <p className="text-sm text-muted-foreground">₹60,000+</p>
              <p className="text-xs text-muted-foreground mt-1">
                Luxury accommodations and exclusive experiences
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} size="lg" className="px-8">
          Continue to Traveler Details
        </Button>
      </div>
    </div>
  );
}