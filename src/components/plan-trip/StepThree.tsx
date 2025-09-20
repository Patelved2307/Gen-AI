import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Switch } from '../ui/switch';
import { Badge } from '../ui/badge';
import { Heart, Car, Home, ArrowLeft, Shield, Phone, Clock } from 'lucide-react';
import { TripData } from '../PlanTripPage';

interface StepThreeProps {
  tripData: TripData;
  updateTripData: (data: Partial<TripData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function StepThree({ tripData, updateTripData, onNext, onPrev }: StepThreeProps) {
  const services = [
    {
      key: 'medicalFacilities' as keyof TripData,
      title: 'Medical Facilities',
      description: 'Professional medical support and emergency care',
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      details: [
        'Dedicated medical facilitator contact',
        'Emergency medical assistance',
        'First aid support during travel',
        'Coordination with local medical facilities'
      ],
      note: 'A medical facilitator will contact you and the assistant group leader directly'
    },
    {
      key: 'transportation' as keyof TripData,
      title: 'Transportation',
      description: 'Complete transportation arrangements',
      icon: Car,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      details: [
        'Airport/station pickup and drop',
        'Local transportation during trip',
        'Inter-city travel arrangements',
        'Vehicle maintenance and support'
      ],
      note: 'Transportation will be provided till the end of the trip'
    },
    {
      key: 'accommodation' as keyof TripData,
      title: 'Accommodation',
      description: 'Comfortable and safe lodging arrangements',
      icon: Home,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      details: [
        'Verified and safe accommodations',
        'Hotels/resorts booking and management',
        'Check-in/check-out assistance',
        'Special requirements coordination'
      ],
      note: 'Our travel agent will arrange everything for you'
    }
  ];

  const handleServiceToggle = (serviceKey: keyof TripData, value: boolean) => {
    updateTripData({ [serviceKey]: value });
  };

  const handleSubmit = () => {
    onNext();
  };

  const getSelectedServicesCount = () => {
    return services.filter(service => tripData[service.key] as boolean).length;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Additional Services
          </CardTitle>
          <CardDescription>
            Select the services you need for a safe and comfortable journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <span className="text-sm">24/7 Agent Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm">Complete Safety</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm">Real-time Assistance</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Services */}
      <div className="space-y-6">
        {services.map((service) => (
          <Card key={service.key} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${service.bgColor}`}>
                    <service.icon className={`h-6 w-6 ${service.color}`} />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={tripData[service.key] as boolean}
                    onCheckedChange={(checked) => handleServiceToggle(service.key, checked)}
                    className="data-[state=checked]:bg-primary"
                  />
                  {tripData[service.key] && (
                    <Badge variant="default">Selected</Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            
            {tripData[service.key] && (
              <CardContent className="pt-0">
                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="font-medium mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    {service.details.map((detail, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span className="text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-sm text-primary font-medium">
                      📞 {service.note}
                    </p>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* Summary */}
      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Selected Services</h3>
              <p className="text-sm text-muted-foreground">
                You have selected {getSelectedServicesCount()} out of {services.length} services
              </p>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {getSelectedServicesCount()}/{services.length}
            </Badge>
          </div>
          
          {getSelectedServicesCount() > 0 && (
            <div className="mt-4 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <div className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-primary">24/7 Travel Agent Support</p>
                  <p className="text-sm text-primary/80">
                    One of our experienced travel agents will be connected to your group leader 
                    throughout the journey to ensure smooth and safe travel.
                  </p>
                </div>
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
          Continue to Preview
        </Button>
      </div>
    </div>
  );
}