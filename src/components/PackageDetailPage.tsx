import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Star, 
  Clock, 
  ArrowLeft,
  Heart,
  Car,
  Home as HouseIcon,
  Shield,
  Download,
  Check,
  Utensils
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface User {
  id: string;
  name: string;
  email: string;
}

interface PackageDetailPageProps {
  packageId: string;
  navigateTo: (page: string) => void;
  user: User | null;
}

interface PackageDetail {
  id: string;
  name: string;
  location: string;
  duration: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  type: string;
  difficulty: string;
  groupSize: string;
  highlights: string[];
  description: string;
  isInternational: boolean;
  itinerary: Array<{
    day: number;
    title: string;
    activities: string[];
    accommodation: string;
    meals: string[];
  }>;
  included: string[];
  excluded: string[];
  images: string[];
}

export function PackageDetailPage({ packageId, navigateTo, user }: PackageDetailPageProps) {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [travelers, setTravelers] = useState({
    adults: 1,
    children: 0,
    infants: 0
  });

  // Mock data - in a real app, this would be fetched based on packageId
  const packageDetail: PackageDetail = {
    id: packageId,
    name: 'Himalayan Adventure',
    location: 'Nepal & India',
    duration: '10 Days',
    price: 45000,
    originalPrice: 55000,
    image: 'https://images.unsplash.com/photo-1729118318959-243053a1a023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBkZXN0aW5hdGlvbiUyMG1vdW50YWlucyUyMHNjZW5pY3xlbnwxfHx8fDE3NTc5NTg3MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.8,
    reviews: 124,
    type: 'Adventure',
    difficulty: 'Moderate',
    groupSize: '8-15',
    highlights: ['Mount Everest Base Camp', 'Sherpa Culture', 'Mountain Villages', 'Himalayan Views', 'Cultural Immersion'],
    description: 'Experience the majesty of the Himalayas with expert guides and complete safety support. This adventure takes you through breathtaking landscapes, ancient monasteries, and traditional Sherpa villages.',
    isInternational: true,
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Kathmandu - Welcome to Nepal',
        activities: [
          '🛬 Airport pickup by our representative with traditional Khada welcome',
          '🏨 Hotel check-in at Tibet International (4-star accommodation)',
          '🍽️ Welcome dinner at authentic Nepali restaurant with cultural show',
          '📋 Trip briefing with safety instructions and equipment check',
          '🛍️ Optional visit to Thamel market for last-minute shopping'
        ],
        accommodation: 'Hotel Tibet International (4-star) - Luxury rooms with mountain views',
        meals: ['Welcome Dinner with traditional Nepali cuisine']
      },
      {
        day: 2,
        title: 'Fly to Lukla - Trek to Phakding (2,610m)',
        activities: [
          '✈️ Early morning scenic flight to Lukla (35 minutes) - one of the most spectacular flights',
          '👥 Meet your trekking crew and final equipment check',
          '🥾 Begin trek to Phakding through beautiful Sherpa villages',
          '🌉 Cross several suspension bridges over Dudh Koshi river',
          '📸 Photography opportunities with stunning mountain backdrops',
          '🏕️ Evening rest and acclimatization'
        ],
        accommodation: 'Tea House Lodge - Traditional mountain lodge with shared facilities',
        meals: ['Breakfast', 'Packed Lunch', 'Dinner with local specialties']
      },
      {
        day: 3,
        title: 'Trek to Namche Bazaar (3,440m) - Gateway to Everest',
        activities: [
          '🌅 Early morning start with sunrise over peaks',
          '🚶‍♂️ Trek through Dudh Koshi valley with rhododendron forests',
          '🏔️ First glimpse of Mount Everest from the trail',
          '📍 Enter Sagarmatha National Park (UNESCO World Heritage Site)',
          '🏪 Reach Namche Bazaar - the Sherpa capital',
          '🛒 Explore local market and Saturday market (if applicable)',
          '☕ Evening tea at local bakery with mountain views'
        ],
        accommodation: 'Namche Lodge - Premium lodge with private rooms and hot showers',
        meals: ['Hearty Breakfast', 'Trail Lunch', 'Dinner with international options']
      },
      {
        day: 4,
        title: 'Acclimatization Day in Namche - Cultural Immersion',
        activities: [
          '🏨 Rest day for proper acclimatization',
          '🚁 Optional helicopter tour to Everest Base Camp (additional cost)',
          '🏨 Visit Everest View Hotel for panoramic mountain views',
          '🏛️ Explore Sherpa Culture Museum and learn about local traditions',
          '👥 Cultural interactions with local Sherpa families',
          '🧗‍♂️ Short acclimatization hike to nearby viewpoints',
          '🍺 Evening at local bar with fellow trekkers'
        ],
        accommodation: 'Namche Lodge - Same comfortable accommodation',
        meals: ['Continental Breakfast', 'Lunch at Everest View Hotel', 'Traditional Sherpa dinner']
      },
      {
        day: 5,
        title: 'Trek to Tengboche (3,867m) - Monastery in the Clouds',
        activities: [
          '🌄 Early morning with spectacular sunrise views',
          '🚶‍♂️ Trek through rhododendron and juniper forests',
          '🏔️ Stunning views of Everest, Lhotse, Nuptse, and Ama Dablam',
          '🏛️ Visit Tengboche Monastery - spiritual heart of the Khumbu region',
          '👨‍💼 Meet with head monk and learn about Buddhist traditions',
          '🙏 Participate in evening prayer ceremony (optional)',
          '🌟 Stargazing session with clear mountain skies'
        ],
        accommodation: 'Tengboche Lodge - Mountain lodge with monastery views',
        meals: ['Energy Breakfast', 'Mountain Trail Lunch', 'Vegetarian dinner (monastery influence)']
      },
      {
        day: 6,
        title: 'Trek to Dingboche (4,410m) - Alpine Desert',
        activities: [
          '🏔️ Morning views of Everest massif from Tengboche',
          '🌲 Descend through beautiful forests to Debuche',
          '🌊 Cross Imja Khola river and enter alpine terrain',
          '🏘️ Reach Dingboche - summer settlement of Sherpa people',
          '🧱 Explore traditional stone-walled fields',
          '⛺ Rest and prepare for higher altitudes',
          '🌡️ Acclimatization monitoring by our guides'
        ],
        accommodation: 'Dingboche Lodge - High-altitude lodge with heating',
        meals: ['High-altitude Breakfast', 'Energy Lunch', 'Nutritious dinner for altitude']
      },
      {
        day: 7,
        title: 'Acclimatization Day - Chukhung Valley Exploration',
        activities: [
          '🚶‍♂️ Optional day hike to Chukhung Valley (4,730m)',
          '🏔️ Spectacular views of Island Peak and Lhotse South Face',
          '📸 Photography workshop with professional mountain photography tips',
          '💊 Health check and altitude monitoring',
          '📚 Rest day with reading and journaling time',
          '🎲 Evening games and storytelling with fellow trekkers'
        ],
        accommodation: 'Dingboche Lodge - Same comfortable lodge',
        meals: ['Nutritious Breakfast', 'Packed lunch for day hike', 'Hearty dinner']
      },
      {
        day: 8,
        title: 'Trek to Lobuche (4,930m) - Approaching Base Camp',
        activities: [
          '🏔️ Trek through Thukla with memorial stupas for mountaineers',
          '🙏 Pay respects at climber memorials',
          '❄️ Enter the glacial moraine zone',
          '🧊 First views of Khumbu Glacier',
          '🏕️ Reach Lobuche - closest lodge to Everest Base Camp',
          '🌌 Clear night sky for incredible stargazing'
        ],
        accommodation: 'Lobuche Lodge - Basic but warm mountain lodge',
        meals: ['Early Breakfast', 'High-energy lunch', 'Warming dinner']
      },
      {
        day: 9,
        title: 'Everest Base Camp (5,364m) - The Ultimate Goal',
        activities: [
          '🌅 Very early start (4:00 AM) for Base Camp trek',
          '🧊 Trek on Khumbu Glacier - one of the worlds highest glaciers',
          '🏔️ Reach Everest Base Camp - the famous mountaineering staging area',
          '📸 Photo session at Base Camp with prayer flags',
          '🏔️ Meet mountaineers preparing for Everest summit (seasonal)',
          '🎉 Celebration ceremony at Base Camp',
          '📱 Satellite phone call to family (additional cost)',
          '↩️ Return trek to Gorak Shep for overnight'
        ],
        accommodation: 'Gorak Shep Lodge - Highest accommodation on trek',
        meals: ['Very early breakfast', 'Celebration lunch at Base Camp', 'Achievement dinner']
      },
      {
        day: 10,
        title: 'Kala Patthar & Return Journey - Final Views',
        activities: [
          '🌅 Pre-dawn hike to Kala Patthar (5,545m) for sunrise on Everest',
          '📸 Best photography spot for Everest summit views',
          '🏆 Achievement certificate presentation',
          '✈️ Helicopter return to Lukla (weather permitting) or trek back',
          '🍾 Celebration dinner in Lukla with crew',
          '🎁 Traditional farewell ceremony with trekking team'
        ],
        accommodation: 'Lukla Lodge - Comfortable end-of-trek accommodation',
        meals: ['Summit breakfast', 'Celebration lunch', 'Farewell dinner with local entertainment']
      }
    ],
    included: [
      'All accommodation (hotels and tea houses)',
      'All meals during trekking',
      'Professional English-speaking guide',
      'Porter service (1 porter for 2 people)',
      'All necessary permits and fees',
      'Domestic flights (Kathmandu-Lukla-Kathmandu)',
      'Airport transfers',
      'First aid kit and safety equipment',
      '24/7 support hotline'
    ],
    excluded: [
      'International flights',
      'Nepal visa fees',
      'Travel insurance',
      'Personal expenses',
      'Tips for guide and porter',
      'Extra meals in Kathmandu',
      'Alcoholic beverages',
      'Emergency evacuation'
    ],
    images: [
      'https://images.unsplash.com/photo-1729118318959-243053a1a023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBkZXN0aW5hdGlvbiUyMG1vdW50YWlucyUyMHNjZW5pY3xlbnwxfHx8fDE3NTc5NTg3MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1614632775408-fbab45472aba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjB2YWNhdGlvbiUyMGJlYWNoJTIwdHJvcGljYWx8ZW58MXx8fHwxNzU3OTU4NzM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1601232318652-6df9afdd0f19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHZlbnR1cmUlMjB0cmF2ZWwlMjBoaWtpbmclMjBiYWNrcGFja3xlbnwxfHx8fDE3NTc5NTg3Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ]
  };

  const getTotalTravelers = () => {
    return travelers.adults + travelers.children + travelers.infants;
  };

  const getTotalCost = () => {
    const adultCost = travelers.adults * packageDetail.price;
    const childCost = travelers.children * (packageDetail.price * 0.8); // 20% discount for children
    const infantCost = travelers.infants * (packageDetail.price * 0.1); // 90% discount for infants
    return adultCost + childCost + infantCost;
  };

  const handleBookNow = () => {
    if (!user) {
      navigateTo('auth');
      return;
    }
    setIsBookingDialogOpen(true);
  };

  const confirmBooking = () => {
    const bookingId = `TRP${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Calculate trip dates (assuming trip starts 30 days from booking)
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 30);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + parseInt(packageDetail.duration.split(' ')[0]) || 7);
    
    const newTrip = {
      bookingId,
      destination: packageDetail.name,
      location: packageDetail.location,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      totalCost: getTotalCost(),
      status: 'confirmed' as const,
      travelers: {
        newborns: 0,
        children: travelers.children,
        adults: travelers.adults,
        seniors: 0,
        handicapped: 0
      },
      bookingDate: currentDate,
      type: 'package',
      packageId: packageDetail.id,
      itinerary: packageDetail.itinerary.map(day => ({
        day: day.day,
        title: day.title,
        activities: day.activities,
        accommodation: day.accommodation,
        meals: day.meals
      }))
    };

    // Save to localStorage
    const existingTrips = JSON.parse(localStorage.getItem('myTrips') || '[]');
    const updatedTrips = [...existingTrips, newTrip];
    localStorage.setItem('myTrips', JSON.stringify(updatedTrips));
    
    alert(`Booking confirmed! Your trip has been saved to "My Trips". Booking ID: ${bookingId}`);
    setIsBookingDialogOpen(false);
    navigateTo('my-trips');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <div className="h-96 relative overflow-hidden">
          <ImageWithFallback
            src={packageDetail.image}
            alt={packageDetail.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          
          <div className="absolute top-4 left-4">
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => navigateTo('packages')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Packages
            </Button>
          </div>
          
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Badge>{packageDetail.type}</Badge>
              {packageDetail.isInternational && (
                <Badge variant="secondary">International</Badge>
              )}
              <Badge variant="outline" className="bg-white/20 border-white/40 text-white">
                {packageDetail.difficulty}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl mb-2">{packageDetail.name}</h1>
            <div className="flex items-center gap-4 text-lg">
              <div className="flex items-center gap-1">
                <MapPin className="h-5 w-5" />
                <span>{packageDetail.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-5 w-5" />
                <span>{packageDetail.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span>{packageDetail.rating} ({packageDetail.reviews} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>About This Trip</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {packageDetail.description}
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Highlights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {packageDetail.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Trip Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <h4 className="font-medium mb-1">Duration</h4>
                          <p className="text-muted-foreground">{packageDetail.duration}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Group Size</h4>
                          <p className="text-muted-foreground">{packageDetail.groupSize} people</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Difficulty</h4>
                          <p className="text-muted-foreground">{packageDetail.difficulty}</p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">Type</h4>
                          <p className="text-muted-foreground">{packageDetail.type}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="itinerary" className="mt-6">
                <div className="space-y-4">
                  {packageDetail.itinerary.map((day) => (
                    <Card key={day.day}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm">
                            {day.day}
                          </div>
                          {day.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="md:col-span-2">
                            <h4 className="font-medium mb-2">Activities</h4>
                            <ul className="space-y-1">
                              {day.activities.map((activity, index) => (
                                <li key={index} className="flex items-start gap-2">
                                  <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                  <span className="text-sm">{activity}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-medium mb-1 flex items-center gap-1">
                                <HouseIcon className="h-4 w-4" />
                                Accommodation
                              </h4>
                              <p className="text-sm text-muted-foreground">{day.accommodation}</p>
                            </div>
                            <div>
                              <h4 className="font-medium mb-1 flex items-center gap-1">
                                <Utensils className="h-4 w-4" />
                                Meals
                              </h4>
                              <div className="flex flex-wrap gap-1">
                                {day.meals.map((meal, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {meal}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="inclusions" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-green-600 flex items-center gap-2">
                        <Check className="h-5 w-5" />
                        What's Included
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {packageDetail.included.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-red-600 flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        What's Excluded
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {packageDetail.excluded.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="h-4 w-4 border border-red-300 rounded mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="gallery" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {packageDetail.images.map((image, index) => (
                    <div key={index} className="aspect-video relative overflow-hidden rounded-lg">
                      <ImageWithFallback
                        src={image}
                        alt={`${packageDetail.name} - Image ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      {packageDetail.originalPrice && (
                        <p className="text-sm text-muted-foreground line-through">
                          ₹{packageDetail.originalPrice.toLocaleString()}
                        </p>
                      )}
                      <CardTitle className="text-2xl text-primary">
                        ₹{packageDetail.price.toLocaleString()}
                      </CardTitle>
                      <CardDescription>per person</CardDescription>
                    </div>
                    {packageDetail.originalPrice && (
                      <Badge className="bg-green-500">
                        Save ₹{(packageDetail.originalPrice - packageDetail.price).toLocaleString()}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <span className="text-sm">24/7 Safety Support</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <Heart className="h-5 w-5 text-green-600" />
                      <span className="text-sm">Medical Facilities</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <Car className="h-5 w-5 text-purple-600" />
                      <span className="text-sm">Transportation Included</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                    <Button onClick={handleBookNow} className="flex-1">
                      Book Now
                    </Button>
                  </div>

                  <p className="text-xs text-muted-foreground text-center">
                    Free cancellation up to 24 hours before departure
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={isBookingDialogOpen} onOpenChange={setIsBookingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book Your Trip</DialogTitle>
            <DialogDescription>
              Select the number of travelers and confirm your booking
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="adults">Adults</Label>
                <Input
                  id="adults"
                  type="number"
                  min="1"
                  value={travelers.adults}
                  onChange={(e) => setTravelers({ ...travelers, adults: parseInt(e.target.value) || 1 })}
                />
              </div>
              <div>
                <Label htmlFor="children">Children (2-12)</Label>
                <Input
                  id="children"
                  type="number"
                  min="0"
                  value={travelers.children}
                  onChange={(e) => setTravelers({ ...travelers, children: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label htmlFor="infants">Infants (&lt;2)</Label>
                <Input
                  id="infants"
                  type="number"
                  min="0"
                  value={travelers.infants}
                  onChange={(e) => setTravelers({ ...travelers, infants: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="flex justify-between mb-2">
                <span>Total Travelers:</span>
                <span>{getTotalTravelers()}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold">
                <span>Total Cost:</span>
                <span>₹{getTotalCost().toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsBookingDialogOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={confirmBooking} className="flex-1">
                Confirm Booking
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}