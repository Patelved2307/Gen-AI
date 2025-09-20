import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  MapPin, 
  Star, 
  Clock, 
  Users, 
  Search,
  Filter,
  Calendar,
  DollarSign,
  Globe,
  Compass,
  Camera,
  Sparkles,
  ArrowRight,
  Heart,
  Eye
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface User {
  id: string;
  name: string;
  email: string;
}

interface PackagesPageProps {
  navigateTo: (page: string, packageId?: string) => void;
  user: User | null;
}

interface Package {
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
}

export function PackagesPage({ navigateTo, user }: PackagesPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [budgetFilter, setBudgetFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  const packages: Package[] = [
    {
      id: '1',
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
      highlights: ['Mount Everest Base Camp', 'Sherpa Culture', 'Mountain Villages'],
      description: 'Experience the majesty of the Himalayas with expert guides and complete safety support.',
      isInternational: true
    },
    {
      id: '2',
      name: 'Tropical Paradise',
      location: 'Goa & Kerala',
      duration: '7 Days',
      price: 25000,
      image: 'https://images.unsplash.com/photo-1614632775408-fbab45472aba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjB2YWNhdGlvbiUyMGJlYWNoJTIwdHJvcGljYWx8ZW58MXx8fHwxNzU3OTU4NzM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.9,
      reviews: 89,
      type: 'Beach',
      difficulty: 'Easy',
      groupSize: '4-20',
      highlights: ['Beautiful Beaches', 'Backwater Cruises', 'Local Cuisine'],
      description: 'Relax on pristine beaches and explore the rich culture of coastal India.',
      isInternational: false
    },
    {
      id: '3',
      name: 'Cultural Heritage',
      location: 'Rajasthan',
      duration: '12 Days',
      price: 35000,
      originalPrice: 42000,
      image: 'https://images.unsplash.com/photo-1601232318652-6df9afdd0f19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHZlbnR1cmUlMjB0cmF2ZWwlMjBoaWtpbmclMjBiYWNrcGFja3xlbnwxfHx8fDE3NTc5NTg3Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.7,
      reviews: 156,
      type: 'Heritage',
      difficulty: 'Easy',
      groupSize: '6-25',
      highlights: ['Majestic Palaces', 'Desert Safari', 'Royal Cuisine'],
      description: 'Discover the royal heritage and vibrant culture of Rajasthan.',
      isInternational: false
    },
    {
      id: '4',
      name: 'Wildlife Safari',
      location: 'Kenya & Tanzania',
      duration: '14 Days',
      price: 85000,
      image: 'https://images.unsplash.com/photo-1614632775408-fbab45472aba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjB2YWNhdGlvbiUyMGJlYWNoJTIwdHJvcGljYWx8ZW58MXx8fHwxNzU3OTU4NzM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.9,
      reviews: 67,
      type: 'Wildlife',
      difficulty: 'Moderate',
      groupSize: '6-12',
      highlights: ['Great Migration', 'Big Five Safari', 'Maasai Culture'],
      description: 'Witness the incredible wildlife and natural beauty of East Africa.',
      isInternational: true
    },
    {
      id: '5',
      name: 'Mountain Retreat',
      location: 'Himachal Pradesh',
      duration: '8 Days',
      price: 18000,
      image: 'https://images.unsplash.com/photo-1729118318959-243053a1a023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBkZXN0aW5hdGlvbiUyMG1vdW50YWlucyUyMHNjZW5pY3xlbnwxfHx8fDE3NTc5NTg3MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.6,
      reviews: 93,
      type: 'Nature',
      difficulty: 'Easy',
      groupSize: '4-16',
      highlights: ['Snow-capped Peaks', 'Valley Views', 'Adventure Sports'],
      description: 'Escape to the serene mountains of Himachal Pradesh for a rejuvenating experience.',
      isInternational: false
    },
    {
      id: '6',
      name: 'European Capitals',
      location: 'Paris, Rome, London',
      duration: '16 Days',
      price: 95000,
      originalPrice: 110000,
      image: 'https://images.unsplash.com/photo-1601232318652-6df9afdd0f19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHZlbnR1cmUlMjB0cmF2ZWwlMjBoaWtpbmclMjBiYWNrcGFja3xlbnwxfHx8fDE3NTc5NTg3Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.8,
      reviews: 201,
      type: 'Culture',
      difficulty: 'Easy',
      groupSize: '10-20',
      highlights: ['Historic Landmarks', 'Art Museums', 'Fine Dining'],
      description: 'Explore the rich history and culture of Europes most iconic cities.',
      isInternational: true
    }
  ];

  const filteredPackages = packages.filter(pkg => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || pkg.type.toLowerCase() === typeFilter.toLowerCase();
    
    const matchesBudget = budgetFilter === 'all' ||
                         (budgetFilter === 'budget' && pkg.price < 30000) ||
                         (budgetFilter === 'mid' && pkg.price >= 30000 && pkg.price < 60000) ||
                         (budgetFilter === 'luxury' && pkg.price >= 60000);
    
    const matchesLocation = locationFilter === 'all' ||
                           (locationFilter === 'domestic' && !pkg.isInternational) ||
                           (locationFilter === 'international' && pkg.isInternational);
    
    return matchesSearch && matchesType && matchesBudget && matchesLocation;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 py-20">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-cyan-300/20 to-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-orange-300/20 to-pink-400/20 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center">
            <Badge className="badge-travel mb-8 px-8 py-4 text-xl">
              <Globe className="w-6 h-6 mr-3" />
              Curated Adventures
            </Badge>
            <h1 className="text-6xl md:text-7xl lg:text-8xl mb-8 gradient-text-ocean leading-tight font-bold">
              Travel Packages
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground max-w-5xl mx-auto leading-relaxed">
              Discover our curated travel packages with AI-generated itineraries, 
              24/7 support, and complete safety assurance.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">

        {/* Enhanced Search and Filters */}
        <div className="mb-16 space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold gradient-text-primary mb-4">Find Your Perfect Adventure</h2>
            <p className="text-xl text-muted-foreground">Filter through our amazing collection of travel experiences</p>
          </div>
          
          <div className="glass-card p-8 rounded-3xl space-y-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="relative flex-1">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-cyan-600 h-6 w-6" />
                <Input
                  placeholder="Search destinations, activities, experiences..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-travel pl-16 h-16 text-xl rounded-2xl"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="input-travel h-16 rounded-2xl text-lg">
                  <Filter className="h-6 w-6 mr-3 text-cyan-600" />
                  <SelectValue placeholder="Adventure Type" />
                </SelectTrigger>
                <SelectContent className="glass-card border-cyan-200/50">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="adventure">🏔️ Adventure</SelectItem>
                  <SelectItem value="beach">🏖️ Beach</SelectItem>
                  <SelectItem value="heritage">🏛️ Heritage</SelectItem>
                  <SelectItem value="wildlife">🦁 Wildlife</SelectItem>
                  <SelectItem value="nature">🌿 Nature</SelectItem>
                  <SelectItem value="culture">🎭 Culture</SelectItem>
                </SelectContent>
              </Select>

              <Select value={budgetFilter} onValueChange={setBudgetFilter}>
                <SelectTrigger className="input-travel h-16 rounded-2xl text-lg">
                  <DollarSign className="h-6 w-6 mr-3 text-emerald-600" />
                  <SelectValue placeholder="Budget Range" />
                </SelectTrigger>
                <SelectContent className="glass-card border-cyan-200/50">
                  <SelectItem value="all">All Budgets</SelectItem>
                  <SelectItem value="budget">💰 Budget (&lt; ₹30k)</SelectItem>
                  <SelectItem value="mid">💎 Mid Range (₹30k-60k)</SelectItem>
                  <SelectItem value="luxury">👑 Luxury (&gt; ₹60k)</SelectItem>
                </SelectContent>
              </Select>

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="input-travel h-16 rounded-2xl text-lg">
                  <Globe className="h-6 w-6 mr-3 text-blue-600" />
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent className="glass-card border-cyan-200/50">
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="domestic">🇮🇳 Domestic</SelectItem>
                  <SelectItem value="international">🌍 International</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8 flex justify-between items-center">
          <p className="text-muted-foreground text-xl font-medium">
            Showing <span className="gradient-text-primary font-bold">{filteredPackages.length}</span> of {packages.length} packages
          </p>
          <div className="flex items-center gap-2 text-lg text-muted-foreground">
            <Heart className="h-5 w-5" />
            <span>Save your favorites</span>
          </div>
        </div>

        {/* Enhanced Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredPackages.map((pkg, index) => (
            <div key={pkg.id} className="travel-card group cursor-pointer h-full overflow-hidden" style={{animationDelay: `${index * 0.1}s`}}>
              <div className="relative h-80 overflow-hidden">
                <ImageWithFallback
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125"
                />
                <div className="destination-overlay">
                  <div className="text-center">
                    <Camera className="w-16 h-16 mb-4 mx-auto" />
                    <p className="text-2xl font-bold">Explore {pkg.location}</p>
                    <p className="text-lg mt-2 opacity-90">{pkg.highlights.length} amazing experiences</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                <div className="absolute top-6 left-6 flex gap-3">
                  <Badge className="badge-travel text-sm">
                    {pkg.type}
                  </Badge>
                  {pkg.isInternational && (
                    <Badge className="badge-travel bg-gradient-to-r from-blue-500 to-indigo-500 text-sm">
                      <Globe className="w-4 h-4 mr-1" />
                      International
                    </Badge>
                  )}
                </div>
                
                {pkg.originalPrice && (
                  <Badge className="absolute top-6 right-6 badge-travel bg-gradient-to-r from-emerald-500 to-green-500 animate-pulse">
                    Save ₹{(pkg.originalPrice - pkg.price).toLocaleString()}
                  </Badge>
                )}

                <div className="absolute bottom-6 right-6 glass-card px-4 py-2 rounded-full">
                  <div className="flex items-center gap-2 text-white">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-lg">{pkg.rating}</span>
                    <span className="text-sm opacity-80">({pkg.reviews})</span>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="mb-6">
                  <h3 className="text-3xl mb-4 gradient-text-primary group-hover:scale-105 transition-transform duration-300 font-bold">
                    {pkg.name}
                  </h3>
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="h-6 w-6 text-cyan-600" />
                    <span className="text-muted-foreground text-xl font-medium">{pkg.location}</span>
                  </div>
                  <p className="text-lg leading-relaxed text-gray-600">
                    {pkg.description}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-card p-4 rounded-2xl text-center">
                      <Clock className="h-6 w-6 text-cyan-600 mx-auto mb-2" />
                      <span className="text-lg font-semibold">{pkg.duration}</span>
                    </div>
                    <div className="glass-card p-4 rounded-2xl text-center">
                      <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                      <span className="text-lg font-semibold">{pkg.groupSize}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {pkg.highlights.slice(0, 3).map((highlight, index) => (
                      <Badge key={index} className="badge-travel text-sm bg-gradient-to-r from-cyan-100 to-blue-100 text-cyan-800 border-cyan-200">
                        {highlight}
                      </Badge>
                    ))}
                    {pkg.highlights.length > 3 && (
                      <Badge className="badge-travel text-sm bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 border-orange-200">
                        +{pkg.highlights.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex justify-between items-end pt-6 border-t border-gray-100">
                    <div>
                      {pkg.originalPrice && (
                        <p className="text-xl text-muted-foreground line-through">
                          ₹{pkg.originalPrice.toLocaleString()}
                        </p>
                      )}
                      <p className="price-highlight text-5xl mb-2">
                        ₹{pkg.price.toLocaleString()}
                      </p>
                      <p className="text-muted-foreground font-medium">per person</p>
                    </div>
                    <div className="space-y-3">
                      <Button 
                        onClick={() => navigateTo('package-detail', pkg.id)}
                        variant="outline"
                        className="interactive-scale px-8 py-3 border-2 border-cyan-300 hover:bg-cyan-50 hover:border-cyan-400 transition-all duration-300 rounded-2xl"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button 
                        onClick={() => navigateTo('package-detail', pkg.id)}
                        className="btn-travel w-full"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <p className="text-2xl text-muted-foreground mb-6">
                No packages found matching your criteria
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm('');
                  setTypeFilter('all');
                  setBudgetFilter('all');
                  setLocationFilter('all');
                }}
                variant="outline"
                size="lg"
                className="px-8 py-4 rounded-full"
              >
                🔄 Clear Filters
              </Button>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-20 py-16 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl">
          <Badge className="mb-6 px-6 py-3 bg-cyan-100 text-cyan-800 text-base rounded-full">
            🤖 AI-Powered Planning
          </Badge>
          <h2 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">Can't find what you're looking for?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Create your own custom trip with our AI-powered trip planner
          </p>
          <Button 
            size="lg"
            onClick={() => navigateTo('plan-trip')}
            className="px-12 py-5 btn-gradient-primary shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg rounded-full"
          >
            ✨ Plan Custom Trip
          </Button>
        </div>
      </div>
    </div>
  );
}