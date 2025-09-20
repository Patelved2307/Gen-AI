import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { 
  Sparkles, 
  Edit3, 
  Calendar, 
  MapPin, 
  Utensils, 
  Home as HouseIcon, 
  ArrowLeft,
  Clock,
  RefreshCw,
  Car,
  Download,
  Eye
} from 'lucide-react';
import { TripData } from '../PlanTripPage';

interface StepFiveEnhancedProps {
  tripData: TripData;
  updateTripData: (data: Partial<TripData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

interface DetailedActivity {
  time: string;
  activity: string;
  location: string;
  duration: string;
  transportation?: string;
}

interface DetailedMeal {
  type: string;
  time: string;
  location: string;
  cuisine?: string;
}

interface DetailedItineraryDay {
  day: number;
  title: string;
  activities: DetailedActivity[];
  accommodation: {
    name: string;
    address: string;
    checkIn?: string;
    checkOut?: string;
  };
  meals: DetailedMeal[];
  transportation: Array<{
    time: string;
    from: string;
    to: string;
    mode: string;
    duration: string;
  }>;
}

export function StepFiveEnhanced({ tripData, updateTripData, onNext, onPrev }: StepFiveEnhancedProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [detailedItinerary, setDetailedItinerary] = useState<DetailedItineraryDay[]>([]);
  const [editingDay, setEditingDay] = useState<number | null>(null);

  const getTripDuration = () => {
    if (!tripData.startDate || !tripData.endDate) return 7;
    return Math.ceil((new Date(tripData.endDate).getTime() - new Date(tripData.startDate).getTime()) / (1000 * 60 * 60 * 24));
  };

  const generateDetailedItinerary = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const duration = getTripDuration();
      const newItinerary: DetailedItineraryDay[] = [];

      for (let i = 1; i <= duration; i++) {
        let dayActivities: DetailedActivity[] = [];
        let accommodation = {
          name: '',
          address: '',
          checkIn: '15:00',
          checkOut: '11:00'
        };
        let meals: DetailedMeal[] = [];
        let transportation: Array<{
          time: string;
          from: string;
          to: string;
          mode: string;
          duration: string;
        }> = [];

        // Generate detailed activities based on location type
        if (tripData.locationTypes?.includes('adventure')) {
          if (i === 1) {
            // Arrival day with detailed timing
            dayActivities = [
              {
                time: '10:00',
                activity: 'Arrival at destination airport/station',
                location: `${tripData.destination} International Airport`,
                duration: '1 hour',
                transportation: 'Private transfer arranged'
              },
              {
                time: '12:00',
                activity: 'Check-in at adventure resort and welcome briefing',
                location: 'Adventure Base Camp Resort',
                duration: '1 hour'
              },
              {
                time: '14:00',
                activity: 'Equipment fitting and safety orientation',
                location: 'Adventure Equipment Center',
                duration: '2 hours'
              },
              {
                time: '16:30',
                activity: 'Short acclimatization trek around resort',
                location: 'Resort Nature Trail',
                duration: '1.5 hours'
              },
              {
                time: '19:00',
                activity: 'Welcome dinner with adventure team introduction',
                location: 'Resort Main Dining Hall',
                duration: '2 hours'
              },
              {
                time: '21:00',
                activity: 'Trip briefing and next day preparations',
                location: 'Resort Conference Room',
                duration: '1 hour'
              }
            ];
            
            meals = [
              { type: 'Lunch', time: '13:00', location: 'Airport/En-route', cuisine: 'Light continental' },
              { type: 'Dinner', time: '19:00', location: 'Adventure Resort', cuisine: 'Local welcome feast' }
            ];

            accommodation = {
              name: 'Adventure Base Camp Resort',
              address: `Main Adventure Zone, ${tripData.destination}`,
              checkIn: '15:00'
            };

            if (tripData.transportation) {
              transportation = [
                {
                  time: '10:00',
                  from: 'Airport',
                  to: 'Adventure Resort',
                  mode: 'Private AC Vehicle',
                  duration: '2 hours'
                }
              ];
            }
          } else if (i === duration) {
            // Departure day
            dayActivities = [
              {
                time: '08:00',
                activity: 'Final adventure activity - rock climbing or rappelling',
                location: 'Adventure Activity Site',
                duration: '2 hours'
              },
              {
                time: '11:00',
                activity: 'Adventure completion certificate ceremony',
                location: 'Resort Ceremony Hall',
                duration: '30 minutes'
              },
              {
                time: '12:00',
                activity: 'Souvenir shopping and gear return',
                location: 'Resort Shop & Equipment Center',
                duration: '1 hour'
              },
              {
                time: '14:00',
                activity: 'Check-out and departure preparations',
                location: 'Resort Reception',
                duration: '1 hour'
              }
            ];

            meals = [
              { type: 'Breakfast', time: '07:00', location: 'Adventure Resort', cuisine: 'Energy breakfast' }
            ];

            if (tripData.transportation) {
              transportation = [
                {
                  time: '15:00',
                  from: 'Adventure Resort',
                  to: 'Airport',
                  mode: 'Private AC Vehicle',
                  duration: '2 hours'
                }
              ];
            }
          } else {
            // Regular adventure days
            dayActivities = [
              {
                time: '06:00',
                activity: 'Early morning trek to scenic viewpoint',
                location: 'Mountain Peak Trail',
                duration: '3 hours',
                transportation: 'Trekking on foot'
              },
              {
                time: '10:00',
                activity: 'Rock climbing session with certified instructors',
                location: 'Adventure Rock Climbing Site',
                duration: '2.5 hours'
              },
              {
                time: '14:00',
                activity: 'White water rafting expedition',
                location: 'Rapids River Course',
                duration: '3 hours',
                transportation: 'Adventure vehicle to river'
              },
              {
                time: '18:00',
                activity: 'Evening campfire with adventure stories',
                location: 'Resort Campfire Area',
                duration: '2 hours'
              },
              {
                time: '20:30',
                activity: 'Adventure gear maintenance and tomorrow briefing',
                location: 'Equipment Room',
                duration: '1 hour'
              }
            ];

            meals = [
              { type: 'Breakfast', time: '05:30', location: 'Adventure Resort', cuisine: 'High energy breakfast' },
              { type: 'Packed Lunch', time: '12:30', location: 'Adventure Site', cuisine: 'Trail mix & sandwiches' },
              { type: 'Dinner', time: '19:30', location: 'Adventure Resort', cuisine: 'Hearty mountain cuisine' }
            ];

            accommodation = {
              name: 'Adventure Base Camp Resort',
              address: `Main Adventure Zone, ${tripData.destination}`
            };

            if (tripData.transportation) {
              transportation = [
                {
                  time: '13:30',
                  from: 'Rock Climbing Site',
                  to: 'Rafting Start Point',
                  mode: 'Adventure Vehicle',
                  duration: '30 minutes'
                },
                {
                  time: '17:00',
                  from: 'Rafting End Point',
                  to: 'Resort',
                  mode: 'Adventure Vehicle',
                  duration: '1 hour'
                }
              ];
            }
          }
        } else if (tripData.locationTypes?.includes('beaches')) {
          if (i === 1) {
            dayActivities = [
              {
                time: '11:00',
                activity: 'Arrival and beachfront resort check-in',
                location: 'Tropical Paradise Beach Resort',
                duration: '1 hour'
              },
              {
                time: '14:00',
                activity: 'Beach orientation and safety briefing',
                location: 'Resort Beach Front',
                duration: '1 hour'
              },
              {
                time: '16:00',
                activity: 'Sunset beach walk and photography session',
                location: 'Main Beach Promenade',
                duration: '2 hours'
              },
              {
                time: '18:30',
                activity: 'Welcome cocktails and beach games',
                location: 'Beach Bar & Recreation Area',
                duration: '2 hours'
              },
              {
                time: '20:30',
                activity: 'Beachside seafood dinner with live music',
                location: 'Oceanfront Restaurant',
                duration: '2 hours'
              }
            ];

            meals = [
              { type: 'Lunch', time: '13:00', location: 'Resort Restaurant', cuisine: 'Fresh seafood & tropical' },
              { type: 'Dinner', time: '20:30', location: 'Beachfront', cuisine: 'BBQ seafood & local specialties' }
            ];

            accommodation = {
              name: 'Tropical Paradise Beach Resort',
              address: `Oceanfront, ${tripData.destination}`,
              checkIn: '15:00'
            };
          } else {
            dayActivities = [
              {
                time: '07:00',
                activity: 'Sunrise yoga session on the beach',
                location: 'Private Beach Section',
                duration: '1 hour'
              },
              {
                time: '09:00',
                activity: 'Snorkeling expedition to coral reefs',
                location: 'Coral Garden Marine Sanctuary',
                duration: '3 hours',
                transportation: 'Speedboat to reef site'
              },
              {
                time: '14:00',
                activity: 'Surfing lessons with professional instructors',
                location: 'Surf Break Point',
                duration: '2 hours'
              },
              {
                time: '17:00',
                activity: 'Beach volleyball tournament',
                location: 'Resort Sports Beach',
                duration: '1.5 hours'
              },
              {
                time: '19:00',
                activity: 'Beachside spa and massage treatments',
                location: 'Ocean Spa Pavilion',
                duration: '2 hours'
              }
            ];

            meals = [
              { type: 'Breakfast', time: '08:00', location: 'Beachfront Café', cuisine: 'Tropical fruits & light continental' },
              { type: 'Lunch', time: '12:30', location: 'Boat/Beach', cuisine: 'Fresh catch & tropical drinks' },
              { type: 'Dinner', time: '20:00', location: 'Resort Restaurant', cuisine: 'International beach cuisine' }
            ];

            accommodation = {
              name: 'Tropical Paradise Beach Resort',
              address: `Oceanfront, ${tripData.destination}`
            };

            if (tripData.transportation) {
              transportation = [
                {
                  time: '09:00',
                  from: 'Resort Beach',
                  to: 'Coral Reef Site',
                  mode: 'Speedboat',
                  duration: '30 minutes'
                },
                {
                  time: '12:00',
                  from: 'Coral Reef Site',
                  to: 'Resort Beach',
                  mode: 'Speedboat',
                  duration: '30 minutes'
                }
              ];
            }
          }
        } else {
          // Default nature/cultural activities with detailed timing
          dayActivities = [
            {
              time: '08:00',
              activity: 'Morning nature walk and bird watching',
              location: 'Nature Reserve Trail',
              duration: '2 hours'
            },
            {
              time: '11:00',
              activity: 'Local cultural site visit with guided tour',
              location: 'Heritage Cultural Center',
              duration: '2.5 hours',
              transportation: 'Tourist vehicle'
            },
            {
              time: '15:00',
              activity: 'Traditional craft workshop experience',
              location: 'Local Artisan Village',
              duration: '2 hours'
            },
            {
              time: '18:00',
              activity: 'Sunset viewing at scenic point',
              location: 'Panoramic Viewpoint',
              duration: '1.5 hours'
            },
            {
              time: '20:00',
              activity: 'Cultural performance and folk dances',
              location: 'Cultural Center Amphitheater',
              duration: '2 hours'
            }
          ];

          meals = [
            { type: 'Breakfast', time: '07:30', location: 'Hotel Restaurant', cuisine: 'Continental & local' },
            { type: 'Lunch', time: '13:30', location: 'Heritage Site', cuisine: 'Traditional local cuisine' },
            { type: 'Dinner', time: '19:30', location: 'Cultural Center', cuisine: 'Authentic regional dishes' }
          ];

          accommodation = {
            name: 'Heritage Cultural Hotel',
            address: `Cultural District, ${tripData.destination}`
          };

          if (tripData.transportation) {
            transportation = [
              {
                time: '10:30',
                from: 'Hotel',
                to: 'Cultural Center',
                mode: 'AC Tourist Vehicle',
                duration: '45 minutes'
              },
              {
                time: '14:30',
                from: 'Cultural Center',
                to: 'Artisan Village',
                mode: 'AC Tourist Vehicle',
                duration: '30 minutes'
              },
              {
                time: '17:30',
                from: 'Artisan Village',
                to: 'Viewpoint',
                mode: 'AC Tourist Vehicle',
                duration: '30 minutes'
              },
              {
                time: '22:00',
                from: 'Cultural Center',
                to: 'Hotel',
                mode: 'AC Tourist Vehicle',
                duration: '45 minutes'
              }
            ];
          }
        }

        newItinerary.push({
          day: i,
          title: i === 1 ? 'Arrival & Welcome' : i === duration ? 'Departure' : `Day ${i} - Adventure & Exploration`,
          activities: dayActivities,
          accommodation,
          meals,
          transportation
        });
      }

      setDetailedItinerary(newItinerary);
      setIsGenerating(false);
    }, 3000);
  };

  useEffect(() => {
    if (detailedItinerary.length === 0) {
      generateDetailedItinerary();
    }
  }, []);

  const downloadItinerary = () => {
    // Create a simple text version for download
    const itineraryText = detailedItinerary.map(day => {
      let dayText = `DAY ${day.day}: ${day.title}\n`;
      dayText += `${'='.repeat(40)}\n\n`;
      
      dayText += `ACCOMMODATION:\n`;
      dayText += `📍 ${day.accommodation.name}\n`;
      dayText += `📍 ${day.accommodation.address}\n\n`;
      
      dayText += `DAILY SCHEDULE:\n`;
      day.activities.forEach(activity => {
        dayText += `🕐 ${activity.time} - ${activity.activity}\n`;
        dayText += `📍 Location: ${activity.location}\n`;
        dayText += `⏱️ Duration: ${activity.duration}\n`;
        if (activity.transportation) {
          dayText += `🚗 Transportation: ${activity.transportation}\n`;
        }
        dayText += '\n';
      });
      
      dayText += `MEALS:\n`;
      day.meals.forEach(meal => {
        dayText += `🍽️ ${meal.time} - ${meal.type} at ${meal.location}\n`;
        if (meal.cuisine) {
          dayText += `   Cuisine: ${meal.cuisine}\n`;
        }
      });
      
      if (day.transportation.length > 0) {
        dayText += `\nTRANSPORTATION:\n`;
        day.transportation.forEach(transport => {
          dayText += `🚗 ${transport.time}: ${transport.from} → ${transport.to} (${transport.mode}, ${transport.duration})\n`;
        });
      }
      
      return dayText + '\n\n';
    }).join('');

    // Create and download the file
    const blob = new Blob([itineraryText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tripData.destination}_Detailed_Itinerary.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = () => {
    if (detailedItinerary.length === 0) {
      alert('Please generate an itinerary first');
      return;
    }
    
    // Convert detailed itinerary back to simple format for compatibility
    const simpleItinerary = detailedItinerary.map(day => ({
      day: day.day,
      title: day.title,
      activities: day.activities.map(a => `${a.time} - ${a.activity} at ${a.location} (${a.duration})`),
      accommodation: `${day.accommodation.name}, ${day.accommodation.address}`,
      meals: day.meals.map(m => `${m.type} at ${m.time}`)
    }));
    
    updateTripData({ itinerary: simpleItinerary });
    onNext();
  };

  if (isGenerating) {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="py-12">
            <div className="text-center">
              <div className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-blue-600 rounded-full mb-4" />
              <h3 className="text-xl font-semibold mb-2">Generating Your Detailed Itinerary</h3>
              <p className="text-muted-foreground mb-4">
                Our AI is creating a comprehensive day-to-day plan with precise timings, locations, and transportation details...
              </p>
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-blue-600">Creating detailed schedule with transportation</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-purple-600" />
            Detailed AI-Generated Itinerary
          </CardTitle>
          <CardDescription>
            Complete day-to-day plan with precise timings, locations, transportation, and meal details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge variant="secondary">{getTripDuration()} days</Badge>
              <Badge variant="outline">{tripData.destination}</Badge>
              <Badge variant="outline">{tripData.locationTypes?.join(', ')}</Badge>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={downloadItinerary}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button 
                variant="outline" 
                onClick={generateDetailedItinerary}
                disabled={isGenerating}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Regenerate
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Itinerary Days */}
      <div className="space-y-6">
        {detailedItinerary.map((day) => (
          <Card key={day.day} className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Day {day.day}</CardTitle>
                    <CardDescription>{day.title}</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Activities Timeline */}
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Detailed Schedule
                  </h4>
                  <div className="space-y-4">
                    {day.activities.map((activity, index) => (
                      <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0">
                          <Badge variant="outline" className="bg-white">
                            {activity.time}
                          </Badge>
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium mb-1">{activity.activity}</h5>
                          <p className="text-sm text-muted-foreground flex items-center gap-1 mb-1">
                            <MapPin className="h-3 w-3" />
                            {activity.location}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Duration: {activity.duration}
                          </p>
                          {activity.transportation && (
                            <p className="text-sm text-blue-600 flex items-center gap-1">
                              <Car className="h-3 w-3" />
                              {activity.transportation}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Accommodation, Meals & Transportation */}
                <div className="space-y-6">
                  {/* Accommodation */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <HouseIcon className="h-5 w-5" />
                      Accommodation
                    </h4>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h5 className="font-medium">{day.accommodation.name}</h5>
                      <p className="text-sm text-muted-foreground">{day.accommodation.address}</p>
                      {day.accommodation.checkIn && (
                        <p className="text-sm text-green-600">Check-in: {day.accommodation.checkIn}</p>
                      )}
                      {day.accommodation.checkOut && (
                        <p className="text-sm text-green-600">Check-out: {day.accommodation.checkOut}</p>
                      )}
                    </div>
                  </div>

                  {/* Meals */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Utensils className="h-5 w-5" />
                      Meals
                    </h4>
                    <div className="space-y-2">
                      {day.meals.map((meal, index) => (
                        <div key={index} className="p-3 bg-orange-50 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{meal.type}</span>
                            <Badge variant="outline">{meal.time}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{meal.location}</p>
                          {meal.cuisine && (
                            <p className="text-sm text-orange-600">{meal.cuisine}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Transportation */}
                  {day.transportation.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Car className="h-5 w-5" />
                        Transportation
                      </h4>
                      <div className="space-y-2">
                        {day.transportation.map((transport, index) => (
                          <div key={index} className="p-3 bg-blue-50 rounded-lg">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium">{transport.mode}</span>
                              <Badge variant="outline">{transport.time}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {transport.from} → {transport.to}
                            </p>
                            <p className="text-sm text-blue-600">Duration: {transport.duration}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="py-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Your Detailed Itinerary is Ready!</h3>
            <p className="text-muted-foreground mb-4">
              Complete {getTripDuration()}-day plan with precise timings, locations, and transportation details.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Badge variant="secondary">{detailedItinerary.length} days planned</Badge>
              <Badge variant="secondary">{detailedItinerary.reduce((sum, day) => sum + day.activities.length, 0)} activities</Badge>
              <Badge variant="secondary">{detailedItinerary.reduce((sum, day) => sum + day.meals.length, 0)} meals arranged</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button onClick={handleSubmit} size="lg" className="px-8">
          Continue to Payment
        </Button>
      </div>
    </div>
  );
}