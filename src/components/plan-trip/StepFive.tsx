import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
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
  Plus,
  Trash2,
  Clock,
  RefreshCw
} from 'lucide-react';
import { TripData } from '../PlanTripPage';

interface StepFiveProps {
  tripData: TripData;
  updateTripData: (data: Partial<TripData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

interface ItineraryDay {
  day: number;
  title: string;
  activities: Array<{
    time: string;
    activity: string;
    location: string;
    duration: string;
    transportation?: string;
  }>;
  accommodation: string;
  meals: Array<{
    type: string;
    time: string;
    location: string;
    cuisine?: string;
  }>;
}

export function StepFive({ tripData, updateTripData, onNext, onPrev }: StepFiveProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingDay, setEditingDay] = useState<number | null>(null);
  const [tempDay, setTempDay] = useState<ItineraryDay | null>(null);

  const getTripDuration = () => {
    if (!tripData.startDate || !tripData.endDate) return 7;
    return Math.ceil((new Date(tripData.endDate).getTime() - new Date(tripData.startDate).getTime()) / (1000 * 60 * 60 * 24));
  };

  const generateItinerary = () => {
    setIsGenerating(true);
    
    // Simulate AI generation with realistic data based on destination and type
    setTimeout(() => {
      const duration = getTripDuration();
      const newItinerary: ItineraryDay[] = [];

      for (let i = 1; i <= duration; i++) {
        let dayActivities: string[] = [];
        let accommodation = '';
        let meals = ['Breakfast', 'Lunch', 'Dinner'];

        // Generate activities based on location type and day
        if (tripData.locationType === 'adventure') {
          if (i === 1) {
            dayActivities = [
              '🛬 Arrival and adventure resort check-in',
              '🎒 Equipment briefing and safety orientation',
              '🏞️ Short nature walk to acclimatize',
              '🍽️ Welcome dinner with adventure team',
              '📋 Trip briefing and tomorrow\'s preparations'
            ];
          } else if (i === duration) {
            dayActivities = ['🧗‍♂️ Final adventure activity (rock climbing/rappelling)', '🛍️ Souvenir shopping and certificate collection', '📦 Departure preparations and check-out'];
          } else {
            const adventureActivities = [
              '🌅 Early morning trek to scenic viewpoint',
              '🧗‍♂️ Rock climbing session with certified instructors', 
              '🚣‍♂️ White water rafting expedition',
              '🪂 Paragliding or zip-lining adventure',
              '🏕️ Survival skills workshop',
              '🔥 Evening campfire with adventure stories',
              '🌙 Night trekking with headlamps',
              '📸 Adventure photography session'
            ];
            dayActivities = adventureActivities.slice(0, 4 + Math.floor(Math.random() * 2));
          }
          accommodation = i < duration ? 'Adventure Base Camp / Mountain Resort with adventure facilities' : 'Departure';
        } else if (tripData.locationType === 'beaches') {
          if (i === 1) {
            dayActivities = [
              '🏖️ Arrival and beachfront resort check-in',
              '🌅 Sunset beach walk and photography',
              '🍹 Welcome cocktails by the beach',
              '🦀 Beachside seafood dinner'
            ];
          } else if (i === duration) {
            dayActivities = ['🏄‍♂️ Final beach activities and water sports', '🛍️ Beach market shopping for souvenirs', '✈️ Resort check-out and departure'];
          } else {
            const beachActivities = [
              '🏊‍♂️ Morning beach swimming and sunbathing',
              '🤿 Snorkeling expedition to coral reefs',
              '🏄‍♂️ Surfing lessons with professional instructors',
              '🚤 Boat trip to nearby islands',
              '🏐 Beach volleyball tournament',
              '💆‍♀️ Beachside spa and massage treatments',
              '🎣 Deep sea fishing adventure',
              '🌅 Sunrise yoga session on the beach',
              '🕺 Beach party with live music and dancing'
            ];
            dayActivities = beachActivities.slice(0, 4 + Math.floor(Math.random() * 2));
          }
          accommodation = i < duration ? 'Luxury Beach Resort / Ocean View Hotel with private beach access' : 'Departure';
        } else if (tripData.locationType === 'cultural') {
          if (i === 1) {
            dayActivities = [
              '🏛️ Arrival and heritage hotel check-in',
              '🚶‍♂️ Guided city orientation tour',
              '🛒 Traditional local market exploration',
              '🍛 Authentic local cuisine dinner'
            ];
          } else if (i === duration) {
            dayActivities = ['🏛️ Final heritage site visit and photo session', '🎨 Traditional handicraft shopping', '✈️ Check-out and departure'];
          } else {
            const culturalActivities = [
              '🏛️ Ancient temple and monument exploration',
              '🏛️ Museum and art gallery visits',
              '🎭 Traditional cultural performance and folk dances',
              '👨‍🎨 Hands-on traditional craft workshops',
              '🍲 Local cooking class and food tasting tour',
              '🚶‍♂️ Heritage walk through old city quarters',
              '👘 Traditional costume photo session',
              '🎪 Festival participation (if seasonal)',
              '👥 Meet and interact with local artisans'
            ];
            dayActivities = culturalActivities.slice(0, 4 + Math.floor(Math.random() * 2));
          }
          accommodation = i < duration ? 'Heritage Palace Hotel / Traditional Haveli with cultural ambiance' : 'Departure';
        } else if (tripData.locationType === 'wildlife') {
          if (i === 1) {
            dayActivities = [
              '🦁 Arrival at wildlife resort near national park',
              '📋 Safari briefing and safety instructions',
              '🌿 Nature walk around resort premises',
              '🍽️ Dinner with wildlife documentary screening'
            ];
          } else if (i === duration) {
            dayActivities = ['📸 Final safari for missed wildlife sightings', '🎁 Wildlife conservation center visit', '✈️ Check-out and departure'];
          } else {
            const wildlifeActivities = [
              '🌅 Early morning safari (best time for wildlife sighting)',
              '🦒 Jeep safari through different zones of national park',
              '🐘 Elephant safari experience (where available)',
              '🦅 Bird watching tour with ornithologist guide',
              '📸 Wildlife photography workshop',
              '🌙 Night safari to spot nocturnal animals',
              '🐾 Nature walk with wildlife tracking',
              '👨‍🔬 Visit to wildlife research center',
              '🏕️ Bush dinner under the stars'
            ];
            dayActivities = wildlifeActivities.slice(0, 4 + Math.floor(Math.random() * 2));
          }
          accommodation = i < duration ? 'Wildlife Safari Lodge / Jungle Resort with watchtower views' : 'Departure';
        } else if (tripData.locationType === 'mountains') {
          if (i === 1) {
            dayActivities = [
              '🏔️ Arrival at mountain resort/hill station',
              '🚠 Cable car ride for panoramic views',
              '☕ Evening tea at scenic viewpoint',
              '🔥 Bonfire dinner with mountain views'
            ];
          } else if (i === duration) {
            dayActivities = ['🏔️ Sunrise viewing from highest accessible point', '🛍️ Local handicraft shopping', '✈️ Check-out and departure'];
          } else {
            const mountainActivities = [
              '🥾 Guided mountain trekking to scenic peaks',
              '📸 Mountain photography at golden hour',
              '🏞️ Valley exploration and waterfall visits',
              '🏕️ Camping under the stars (weather permitting)',
              '🌿 Medicinal plant identification walk',
              '👥 Local village visits and cultural exchange',
              '🧘‍♂️ Mountain meditation and yoga sessions',
              '🏊‍♂️ Natural hot springs visit (if available)',
              '🦅 Bird watching and nature observation'
            ];
            dayActivities = mountainActivities.slice(0, 4 + Math.floor(Math.random() * 2));
          }
          accommodation = i < duration ? 'Mountain Resort / Hill Station Hotel with valley views' : 'Departure';
        } else if (tripData.locationType === 'spiritual') {
          if (i === 1) {
            dayActivities = [
              '🕉️ Arrival at spiritual retreat center',
              '🧘‍♂️ Introduction to meditation practices',
              '🛐 Evening prayer ceremony participation',
              '🍲 Sattvic vegetarian dinner'
            ];
          } else if (i === duration) {
            dayActivities = ['🙏 Final blessing ceremony', '📿 Spiritual souvenir shopping', '✈️ Peaceful departure'];
          } else {
            const spiritualActivities = [
              '🌅 Early morning meditation and yoga',
              '🛐 Ancient temple visits and rituals',
              '👨‍🏫 Spiritual discourse with learned masters',
              '🎵 Devotional music and chanting sessions',
              '🚶‍♂️ Peaceful nature walks for contemplation',
              '💧 Sacred river bathing rituals',
              '📚 Philosophy and spiritual literature study',
              '🍃 Ayurvedic wellness consultations',
              '🕯️ Evening aarti (prayer) ceremonies'
            ];
            dayActivities = spiritualActivities.slice(0, 4 + Math.floor(Math.random() * 2));
          }
          accommodation = i < duration ? 'Spiritual Ashram / Retreat Center with meditation halls' : 'Departure';
        } else if (tripData.locationType === 'desert') {
          if (i === 1) {
            dayActivities = [
              '🏜️ Arrival at desert camp',
              '🐪 Camel safari introduction',
              '🌅 Sunset viewing over sand dunes',
              '🔥 Traditional desert dinner with folk music'
            ];
          } else if (i === duration) {
            dayActivities = ['🌅 Sunrise camel ride', '🎨 Desert craft shopping', '✈️ Desert camp departure'];
          } else {
            const desertActivities = [
              '🐪 Extended camel safari across sand dunes',
              '🏍️ Desert bike riding adventure',
              '🏜️ Sand dune surfing and sandboarding',
              '⭐ Star gazing with telescope in clear desert sky',
              '🎪 Traditional Rajasthani folk dance performance',
              '🏕️ Desert camping with cultural programs',
              '🌅 Hot air balloon ride over desert (seasonal)',
              '🏺 Visit to desert villages and local lifestyle',
              '🦎 Desert wildlife spotting tour'
            ];
            dayActivities = desertActivities.slice(0, 4 + Math.floor(Math.random() * 2));
          }
          accommodation = i < duration ? 'Luxury Desert Camp / Heritage Desert Resort with traditional architecture' : 'Departure';
        } else if (tripData.locationType === 'culinary') {
          if (i === 1) {
            dayActivities = [
              '🍽️ Arrival and food lover\'s hotel check-in',
              '🛒 Local spice market tour',
              '👨‍🍳 Meet the chef session',
              '🍛 Welcome dinner with signature local dishes'
            ];
          } else if (i === duration) {
            dayActivities = ['👨‍🍳 Final cooking class and recipe collection', '🥘 Farewell feast with all learned dishes', '✈️ Check-out with recipe book souvenir'];
          } else {
            const culinaryActivities = [
              '👨‍🍳 Hands-on cooking classes with master chefs',
              '🍷 Food and wine pairing experiences',
              '🛒 Farm-to-table ingredient sourcing visits',
              '🍜 Street food tours with local food experts',
              '🧑‍🌾 Visit to organic farms and spice gardens',
              '🍯 Traditional food preservation techniques workshop',
              '🥘 Regional cuisine tasting tours',
              '📖 Food history and culture storytelling sessions',
              '🍰 Dessert and sweet making workshops'
            ];
            dayActivities = culinaryActivities.slice(0, 4 + Math.floor(Math.random() * 2));
          }
          accommodation = i < duration ? 'Culinary Heritage Hotel / Food-focused Resort with cooking facilities' : 'Departure';
        } else if (tripData.locationType === 'wellness') {
          if (i === 1) {
            dayActivities = [
              '🧘‍♀️ Arrival at wellness resort',
              '👩‍⚕️ Health consultation with Ayurvedic doctor',
              '🍃 Herbal garden tour',
              '💆‍♀️ Welcome relaxation massage'
            ];
          } else if (i === duration) {
            dayActivities = ['🧘‍♀️ Final meditation and yoga session', '📋 Personalized wellness plan for home', '✈️ Rejuvenated departure'];
          } else {
            const wellnessActivities = [
              '🧘‍♀️ Daily yoga and meditation practices',
              '💆‍♀️ Ayurvedic spa treatments and massages',
              '🌿 Detox and cleansing programs',
              '🏊‍♀️ Therapeutic swimming and water therapy',
              '🍵 Herbal tea preparation and healing drinks',
              '🧘‍♂️ Pranayama (breathing) workshops',
              '🌱 Organic nutrition and healthy cooking classes',
              '💎 Crystal healing and alternative therapy sessions',
              '🌸 Aromatherapy and essential oils workshop'
            ];
            dayActivities = wellnessActivities.slice(0, 4 + Math.floor(Math.random() * 2));
          }
          accommodation = i < duration ? 'Luxury Wellness Resort / Ayurvedic Retreat with spa facilities' : 'Departure';
        } else {
          // Default nature/forest activities
          if (i === 1) {
            dayActivities = [
              '🌲 Arrival at nature resort/forest lodge',
              '🚶‍♂️ Gentle nature walk and orientation',
              '🦋 Butterfly and flora identification tour',
              '🌙 Evening nature sounds relaxation'
            ];
          } else if (i === duration) {
            dayActivities = ['🌿 Final forest walk and tree planting ceremony', '📚 Nature conservation awareness session', '✈️ Check-out and departure'];
          } else {
            const natureActivities = [
              '🥾 Forest trekking through pristine trails',
              '📸 Nature and wildlife photography workshops',
              '🦅 Bird watching with expert naturalists',
              '🌊 Waterfall visits and natural pool swimming',
              '🏕️ Eco-camping experience in forest clearings',
              '👥 Tribal village visits and cultural learning',
              '🌿 Medicinal plant walks with local guides',
              '🌙 Night safari for nocturnal wildlife',
              '🦋 Butterfly garden visits and insect study'
            ];
            dayActivities = natureActivities.slice(0, 4 + Math.floor(Math.random() * 2));
          }
          accommodation = i < duration ? 'Eco-friendly Forest Lodge / Tree House Resort with nature views' : 'Departure';
        }

        newItinerary.push({
          day: i,
          title: i === 1 ? 'Arrival Day' : i === duration ? 'Departure Day' : `Day ${i} - Exploration`,
          activities: dayActivities,
          accommodation,
          meals: i < duration ? meals : ['Breakfast']
        });
      }

      updateTripData({ itinerary: newItinerary });
      setIsGenerating(false);
    }, 2000);
  };

  useEffect(() => {
    if (tripData.itinerary.length === 0) {
      generateItinerary();
    }
  }, []);

  const openEditDialog = (day: ItineraryDay) => {
    setEditingDay(day.day);
    setTempDay({ ...day });
  };

  const saveDay = () => {
    if (!tempDay) return;
    
    const updatedItinerary = tripData.itinerary.map(day => 
      day.day === tempDay.day ? tempDay : day
    );
    updateTripData({ itinerary: updatedItinerary });
    setEditingDay(null);
    setTempDay(null);
  };

  const cancelEdit = () => {
    setEditingDay(null);
    setTempDay(null);
  };

  const addActivity = () => {
    if (!tempDay) return;
    setTempDay({
      ...tempDay,
      activities: [...tempDay.activities, '']
    });
  };

  const removeActivity = (index: number) => {
    if (!tempDay) return;
    setTempDay({
      ...tempDay,
      activities: tempDay.activities.filter((_, i) => i !== index)
    });
  };

  const updateActivity = (index: number, value: string) => {
    if (!tempDay) return;
    const newActivities = [...tempDay.activities];
    newActivities[index] = value;
    setTempDay({
      ...tempDay,
      activities: newActivities
    });
  };

  const handleSubmit = () => {
    if (tripData.itinerary.length === 0) {
      alert('Please generate an itinerary first');
      return;
    }
    onNext();
  };

  if (isGenerating) {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="py-12">
            <div className="text-center">
              <div className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-blue-600 rounded-full mb-4" />
              <h3 className="text-xl font-semibold mb-2">Generating Your Perfect Itinerary</h3>
              <p className="text-muted-foreground mb-4">
                Our AI is creating a personalized day-to-day plan based on your preferences...
              </p>
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-blue-600">This may take a few moments</span>
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
            AI-Generated Itinerary
          </CardTitle>
          <CardDescription>
            Review and customize your day-to-day travel plan. You can edit any day to match your preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge variant="secondary">{getTripDuration()} days</Badge>
              <Badge variant="outline">{tripData.destination}</Badge>
              <Badge variant="outline">{tripData.locationType}</Badge>
            </div>
            <Button 
              variant="outline" 
              onClick={generateItinerary}
              disabled={isGenerating}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Regenerate
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Itinerary Days */}
      <div className="space-y-4">
        {tripData.itinerary.map((day) => (
          <Card key={day.day} className="overflow-hidden">
            <CardHeader>
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
                <Dialog open={editingDay === day.day} onOpenChange={(open) => !open && cancelEdit()}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => openEditDialog(day)}
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Edit Day {day.day}</DialogTitle>
                      <DialogDescription>
                        Customize activities, accommodation, and meals for this day
                      </DialogDescription>
                    </DialogHeader>
                    {tempDay && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="day-title">Day Title</Label>
                          <Input
                            id="day-title"
                            value={tempDay.title}
                            onChange={(e) => setTempDay({ ...tempDay, title: e.target.value })}
                          />
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Label>Activities</Label>
                            <Button type="button" size="sm" onClick={addActivity}>
                              <Plus className="h-4 w-4 mr-1" />
                              Add Activity
                            </Button>
                          </div>
                          <div className="space-y-2">
                            {tempDay.activities.map((activity, index) => (
                              <div key={index} className="flex gap-2">
                                <Input
                                  value={activity}
                                  onChange={(e) => updateActivity(index, e.target.value)}
                                  placeholder="Enter activity"
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeActivity(index)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="accommodation">Accommodation</Label>
                          <Input
                            id="accommodation"
                            value={tempDay.accommodation}
                            onChange={(e) => setTempDay({ ...tempDay, accommodation: e.target.value })}
                          />
                        </div>
                        
                        <div className="flex gap-2">
                          <Button onClick={saveDay}>Save Changes</Button>
                          <Button variant="outline" onClick={cancelEdit}>Cancel</Button>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Activities
                  </h4>
                  <ul className="space-y-2">
                    {day.activities.map((activity, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <HouseIcon className="h-4 w-4" />
                      Accommodation
                    </h4>
                    <p className="text-sm text-muted-foreground">{day.accommodation}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
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

      {/* Summary */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardContent className="py-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Your Itinerary is Ready!</h3>
            <p className="text-muted-foreground mb-4">
              Review your {getTripDuration()}-day adventure plan. You can always come back and make changes later.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Badge variant="secondary">{tripData.itinerary.length} days planned</Badge>
              <Badge variant="secondary">{tripData.itinerary.reduce((sum, day) => sum + day.activities.length, 0)} activities</Badge>
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