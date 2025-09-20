import { Button } from './ui/button';
import { 
  MapPin, 
  Shield, 
  Heart, 
  Car, 
  Home, 
  Clock, 
  Users, 
  Star,
  ArrowRight,
  Sparkles,
  Globe,
  Camera,
  Compass
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Import Swiper React components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

interface User {
  id: string;
  name: string;
  email: string;
}

interface HomePageProps {
  navigateTo: (page: string, packageId?: string) => void;
  user: User | null;
}

export function HomePage({ navigateTo, user }: HomePageProps) {
  const features = [
    {
      icon: Shield,
      title: '24/7 Safety Support',
      description: 'Travel agent connected to your group leader for complete safety throughout your journey.'
    },
    {
      icon: Heart,
      title: 'Medical Facilities',
      description: 'Professional medical support and facilities available for all your health needs.'
    },
    {
      icon: Car,
      title: 'Transportation',
      description: 'Complete transportation arrangements from start to finish of your trip.'
    },
    {
      icon: Home,
      title: 'Accommodation',
      description: 'Comfortable accommodation options arranged according to your preferences.'
    },
    {
      icon: Clock,
      title: 'AI-Generated Itineraries',
      description: 'Smart day-to-day itineraries created by AI for the perfect travel experience.'
    },
    {
      icon: Users,
      title: 'Group Travel Support',
      description: 'Specialized support for groups of all sizes including families and organizations.'
    }
  ];

  const popularPackages = [
    {
      id: '1',
      name: 'Himalayan Adventure',
      location: 'Nepal & Ladakh',
      duration: '10 Days',
      price: '₹45,000',
      image: 'https://images.unsplash.com/photo-1630694676528-bdbcfdbf655f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWRha2glMjBtb3VudGFpbnMlMjBsYW5kc2NhcGV8ZW58MXx8fHwxNzU3OTYwNDA3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.8,
      type: 'Adventure'
    },
    {
      id: '2',
      name: 'Backwater Bliss',
      location: 'Kerala & Goa',
      duration: '8 Days',
      price: '₹28,000',
      image: 'https://images.unsplash.com/photo-1588068747940-76c095269f83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxrZXJhbGElMjBiYWNrd2F0ZXJzJTIwaG91c2Vib2F0fGVufDF8fHx8MTc1NzkyNDQwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.9,
      type: 'Nature'
    },
    {
      id: '3',
      name: 'Royal Rajasthan',
      location: 'Rajasthan Heritage Circuit',
      duration: '12 Days',
      price: '₹38,000',
      image: 'https://images.unsplash.com/photo-1633702737965-580d5ce00c94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxyYWphc3RoYW4lMjBwYWxhY2UlMjBoZXJpdGg8ZW58MXx8fHwxNzU3OTYwMzk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 4.7,
      type: 'Heritage'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        
        <div className="relative container-spacing w-full">
          <div className="text-center text-white max-w-4xl mx-auto">
            <div className="simple-badge mb-8 bg-white bg-opacity-20 text-white">
              <Sparkles className="w-4 h-4" />
              AI-Powered Travel Planning
            </div>
            
            <h1 className="heading-1 text-white mb-6">
              Your Perfect Journey<br />
              Starts Here
            </h1>
            
            <p className="body-large text-white opacity-90 mb-8 max-w-2xl mx-auto">
              Experience hassle-free travel planning with our comprehensive platform. 
              Choose from expertly crafted packages or create your custom adventure 
              with AI-powered itineraries and 24/7 safety support.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button 
                onClick={() => navigateTo('packages')}
                className="btn-primary"
              >
                <Globe className="w-5 h-5" />
                Browse Packages
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => navigateTo('plan-trip')}
                className="btn-secondary bg-white bg-opacity-20 border-white text-white hover:bg-white hover:text-blue-600"
              >
                <Compass className="w-5 h-5" />
                Plan Custom Trip
              </button>
            </div>
            
            <div className="simple-grid simple-grid-3 max-w-3xl mx-auto">
              <div className="simple-card bg-white bg-opacity-10 text-center">
                <Shield className="w-8 h-8 text-white mx-auto mb-3" />
                <h4 className="text-lg font-semibold text-white mb-2">24/7 Safety</h4>
                <p className="body-small text-white opacity-80">Complete protection</p>
              </div>
              <div className="simple-card bg-white bg-opacity-10 text-center">
                <Heart className="w-8 h-8 text-white mx-auto mb-3" />
                <h4 className="text-lg font-semibold text-white mb-2">Medical Support</h4>
                <p className="body-small text-white opacity-80">Healthcare available</p>
              </div>
              <div className="simple-card bg-white bg-opacity-10 text-center">
                <Star className="w-8 h-8 text-white mx-auto mb-3" />
                <h4 className="text-lg font-semibold text-white mb-2">4.8+ Rating</h4>
                <p className="body-small text-white opacity-80">Trusted by thousands</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding">
        <div className="container-spacing">
          <div className="text-center mb-16">
            <div className="simple-badge mb-4">
              <Sparkles className="w-4 h-4" />
              Why Choose Us
            </div>
            <h2 className="heading-2 mb-6">Complete Travel Solutions</h2>
            <p className="body-large text-secondary max-w-2xl mx-auto">
              We provide comprehensive travel services with cutting-edge technology 
              and human care to ensure your safety, comfort, and unforgettable experiences.
            </p>
          </div>
          
          <div className="simple-grid simple-grid-3">
            {features.map((feature, index) => (
              <div key={index} className="simple-card text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="heading-3 mb-3">{feature.title}</h3>
                <p className="body-regular text-secondary">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Packages Section - Updated with Swiper */}
      <section className="section-padding bg-gray-50">
        <div className="container-spacing">
          <div className="text-center mb-16">
            <div className="simple-badge mb-4">
              <Camera className="w-4 h-4" />
              Popular Destinations
            </div>
            <h2 className="heading-2 mb-6">Featured Travel Packages</h2>
            <p className="body-large text-secondary max-w-2xl mx-auto">
              Discover our most loved travel packages featuring detailed itineraries, 
              AI-generated plans, and complete safety support.
            </p>
          </div>
          
          <Swiper
            className="w-full"
            modules={[Pagination, Navigation]}
            spaceBetween={32}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
          >
            {popularPackages.map((pkg) => (
              <SwiperSlide key={pkg.id}>
                <div className="simple-card overflow-hidden h-full flex flex-col">
                  <div className="relative h-48 mb-4">
                    <ImageWithFallback
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute top-3 left-3">
                      <div className="simple-badge text-xs">
                        {pkg.type}
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 simple-card bg-white px-2 py-1 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{pkg.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="heading-3 mb-3">{pkg.name}</h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-secondary" />
                    <span className="body-regular text-secondary">{pkg.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4 text-secondary" />
                    <span className="body-regular text-secondary">{pkg.duration}</span>
                  </div>
                  
                  <div className="mt-auto flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-primary">{pkg.price}</p>
                      <p className="body-small text-secondary">per person</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => navigateTo('package-detail', pkg.id)}
                        className="btn-secondary text-sm px-4 py-2"
                      >
                        View Details
                      </button>
                      <button 
                        onClick={() => navigateTo('package-detail', pkg.id)}
                        className="btn-primary text-sm px-4 py-2"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="text-center mt-12">
            <button 
              onClick={() => navigateTo('packages')}
              className="btn-primary"
            >
              <Globe className="w-5 h-5" />
              View All Packages
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding">
        <div className="container-spacing">
          <div className="simple-grid simple-grid-3 text-center">
            <div>
              <h3 className="text-4xl font-bold text-primary mb-2">10,000+</h3>
              <p className="body-regular text-secondary">Happy Travelers</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-primary mb-2">4.8★</h3>
              <p className="body-regular text-secondary">Average Rating</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-primary mb-2">150+</h3>
              <p className="body-regular text-secondary">Destinations</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-blue-600 text-white">
        <div className="container-spacing text-center">
          <h2 className="heading-2 text-white mb-6">Ready to Start Your Journey?</h2>
          <p className="body-large text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied travelers who have chosen WanderLuxe for their adventures. 
            Experience the perfect blend of technology and human care.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!user && (
              <button 
                onClick={() => navigateTo('auth')}
                className="btn-secondary bg-white text-blue-600 hover:bg-gray-100"
              >
                Get Started Today
              </button>
            )}
            <button 
              onClick={() => navigateTo('plan-trip')}
              className="btn-secondary bg-white bg-opacity-20 border-white text-white hover:bg-white hover:text-blue-600"
            >
              Plan Custom Trip
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}