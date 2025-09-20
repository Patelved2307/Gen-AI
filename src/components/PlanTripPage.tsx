import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { StepOne } from './plan-trip/StepOne';
import { StepTwo } from './plan-trip/StepTwo';
import { StepThree } from './plan-trip/StepThree';
import { StepFour } from './plan-trip/StepFour';
import { StepFiveEnhanced } from './plan-trip/StepFiveEnhanced';
import { StepSix } from './plan-trip/StepSix';

interface User {
  id: string;
  name: string;
  email: string;
}

interface PlanTripPageProps {
  navigateTo: (page: string) => void;
  user: User | null;
}

export interface TripData {
  // Step 1
  destination: string;
  locationTypes: string[];
  budget: { min: number; max: number };
  
  // Step 2
  travelers: {
    newborns: number;
    children: number;
    adults: number;
    seniors: number;
    handicapped: number;
  };
  organizer: {
    name: string;
    email: string;
    mobile1: string;
    mobile2: string;
  };
  assistant: {
    name: string;
    email: string;
    mobile1: string;
    mobile2: string;
  };
  startDate: string;
  endDate: string;
  
  // Step 3
  medicalFacilities: boolean;
  transportation: boolean;
  accommodation: boolean;
  
  // Step 5
  itinerary: Array<{
    day: number;
    title: string;
    activities: string[];
    accommodation: string;
    meals: string[];
  }>;
  
  // Step 6
  totalCost: number;
}

export function PlanTripPage({ navigateTo, user }: PlanTripPageProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [tripData, setTripData] = useState<TripData>({
    destination: '',
    locationTypes: [],
    budget: { min: 5000, max: 10000 },
    travelers: {
      newborns: 0,
      children: 0,
      adults: 1,
      seniors: 0,
      handicapped: 0
    },
    organizer: {
      name: '',
      email: '',
      mobile1: '',
      mobile2: ''
    },
    assistant: {
      name: '',
      email: '',
      mobile1: '',
      mobile2: ''
    },
    startDate: '',
    endDate: '',
    medicalFacilities: false,
    transportation: false,
    accommodation: false,
    itinerary: [],
    totalCost: 0
  });

  const steps = [
    { number: 1, title: 'Destination & Budget', description: 'Choose your destination and budget' },
    { number: 2, title: 'Travelers & Dates', description: 'Add traveler details and dates' },
    { number: 3, title: 'Services', description: 'Select additional services' },
    { number: 4, title: 'Preview & Edit', description: 'Review your trip details' },
    { number: 5, title: 'AI Itinerary', description: 'AI-generated day-to-day plan' },
    { number: 6, title: 'Payment', description: 'Confirm and pay' }
  ];

  const updateTripData = (data: Partial<TripData>) => {
    setTripData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepOne tripData={tripData} updateTripData={updateTripData} onNext={nextStep} />;
      case 2:
        return <StepTwo tripData={tripData} updateTripData={updateTripData} onNext={nextStep} onPrev={prevStep} />;
      case 3:
        return <StepThree tripData={tripData} updateTripData={updateTripData} onNext={nextStep} onPrev={prevStep} />;
      case 4:
        return <StepFour tripData={tripData} updateTripData={updateTripData} onNext={nextStep} onPrev={prevStep} />;
      case 5:
        return <StepFiveEnhanced tripData={tripData} updateTripData={updateTripData} onNext={nextStep} onPrev={prevStep} />;
      case 6:
        return <StepSix tripData={tripData} navigateTo={navigateTo} onPrev={prevStep} user={user} />;
      default:
        return <StepOne tripData={tripData} updateTripData={updateTripData} onNext={nextStep} />;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Sign In Required</CardTitle>
              <CardDescription>
                Please sign in to plan your custom trip
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

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-6 px-6 py-3 bg-purple-100 text-purple-800 text-base rounded-full">
            🤖 AI-Powered Planning
          </Badge>
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-8 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent leading-tight">Plan Your Perfect Trip</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Create a customized travel experience with our AI-powered trip planner
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-14 h-14 rounded-full border-3 transition-all duration-300
                  ${currentStep > step.number 
                    ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white border-cyan-500 shadow-lg' 
                    : currentStep === step.number
                    ? 'border-cyan-500 text-cyan-700 bg-cyan-50 shadow-md'
                    : 'border-gray-300 text-gray-400'
                  }
                `}>
                  {currentStep > step.number ? (
                    <Check className="h-7 w-7" />
                  ) : (
                    <span className="text-lg">{step.number}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div className={`
                    h-1 w-12 mx-4 rounded-full transition-all duration-300
                    ${currentStep > step.number ? 'bg-gradient-to-r from-cyan-500 to-blue-600' : 'bg-gray-200'}
                  `} />
                )}
              </div>
            ))}
          </div>
          
          <Progress value={(currentStep / 6) * 100} className="mb-8 h-3 rounded-full" />
          
          <div className="text-center">
            <h2 className="text-3xl mb-3 gradient-text-primary">{steps[currentStep - 1].title}</h2>
            <p className="text-xl text-muted-foreground">{steps[currentStep - 1].description}</p>
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-3 px-8 py-4 text-lg rounded-full disabled:opacity-40"
          >
            <ArrowLeft className="h-5 w-5" />
            Previous
          </Button>
          
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-6 py-3 text-lg rounded-full">
              Step {currentStep} of 6
            </Badge>
          </div>
          
          {currentStep < 6 && (
            <Button
              onClick={nextStep}
              className="flex items-center gap-3 px-8 py-4 text-lg btn-gradient-primary rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Next
              <ArrowRight className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}