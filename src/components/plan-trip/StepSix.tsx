import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { 
  CreditCard, 
  Download, 
  Check, 
  ArrowLeft, 
  Shield, 
  FileText, 
  Users,
  MapPin,
  Calendar,
  DollarSign,
  Heart,
  Car,
  Home as HouseIcon
} from 'lucide-react';
import { TripData } from '../PlanTripPage';

interface User {
  id: string;
  name: string;
  email: string;
}

interface StepSixProps {
  tripData: TripData;
  navigateTo: (page: string) => void;
  onPrev: () => void;
  user: User | null;
}

export function StepSix({ tripData, navigateTo, onPrev, user }: StepSixProps) {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const getTotalTravelers = () => {
    return Object.values(tripData.travelers).reduce((sum, count) => sum + count, 0);
  };

  const getTripDuration = () => {
    if (!tripData.startDate || !tripData.endDate) return 0;
    return Math.ceil((new Date(tripData.endDate).getTime() - new Date(tripData.startDate).getTime()) / (1000 * 60 * 60 * 24));
  };

  const calculateBaseCost = () => {
    const baseCostPerPerson = (tripData.budget.min + tripData.budget.max) / 2;
    return baseCostPerPerson * getTotalTravelers();
  };

  const calculateServicesCost = () => {
    let servicesCost = 0;
    const travelers = getTotalTravelers();
    const duration = getTripDuration();
    
    if (tripData.medicalFacilities) {
      servicesCost += 2000 * travelers; // Medical facilities
    }
    if (tripData.transportation) {
      servicesCost += 5000 * travelers; // Transportation
    }
    if (tripData.accommodation) {
      servicesCost += 3000 * travelers * duration; // Accommodation per night
    }
    
    return servicesCost;
  };

  const getTotalCost = () => {
    return calculateBaseCost() + calculateServicesCost();
  };

  const getDiscountAmount = () => {
    // Early bird discount of 10% if booking more than 30 days in advance
    const daysUntilTrip = Math.ceil((new Date(tripData.startDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (daysUntilTrip > 30) {
      return getTotalCost() * 0.1;
    }
    return 0;
  };

  const getFinalAmount = () => {
    return getTotalCost() - getDiscountAmount();
  };

  const handlePayment = async () => {
    if (!paymentMethod || !acceptedTerms) {
      alert('Please select a payment method and accept the terms and conditions');
      return;
    }

    if (paymentMethod === 'card' && (!cardNumber || !expiryDate || !cvv || !cardName)) {
      alert('Please fill in all card details');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const bookingId = `TP${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
      
      const finalTripData = {
        bookingId,
        destination: tripData.destination,
        location: `${tripData.destination} (${tripData.locationType})`,
        startDate: tripData.startDate,
        endDate: tripData.endDate,
        totalCost: getFinalAmount(),
        status: 'confirmed' as const,
        travelers: tripData.travelers,
        bookingDate: new Date().toISOString().split('T')[0],
        type: 'custom',
        itinerary: tripData.itinerary,
        organizer: tripData.organizer,
        assistant: tripData.assistant,
        services: {
          medicalFacilities: tripData.medicalFacilities,
          transportation: tripData.transportation,
          accommodation: tripData.accommodation
        }
      };

      // Save to localStorage
      const existingTrips = JSON.parse(localStorage.getItem('myTrips') || '[]');
      existingTrips.push(finalTripData);
      localStorage.setItem('myTrips', JSON.stringify(existingTrips));

      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 3000);
  };

  const downloadPDF = (type: 'itinerary' | 'group-details') => {
    // Simulate PDF download
    const filename = type === 'itinerary' 
      ? `${tripData.destination}_Itinerary_${tripData.startDate}.pdf`
      : `${tripData.destination}_Group_Details_${tripData.startDate}.pdf`;
    
    alert(`Downloading ${filename}...`);
  };

  if (paymentSuccess) {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
          <CardContent className="py-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Booking Confirmed!</h2>
              <p className="text-muted-foreground mb-6">
                Your trip has been successfully booked. You will receive a confirmation email shortly.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto mb-6">
                <Button 
                  onClick={() => downloadPDF('itinerary')}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download Itinerary
                </Button>
                <Button 
                  onClick={() => downloadPDF('group-details')}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Download Group Details
                </Button>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => navigateTo('my-trips')}
                  size="lg"
                >
                  View My Trips
                </Button>
                <Button 
                  onClick={() => navigateTo('home')}
                  variant="outline"
                  size="lg"
                >
                  Back to Home
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="py-12">
            <div className="text-center">
              <div className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-blue-600 rounded-full mb-4" />
              <h3 className="text-xl font-semibold mb-2">Processing Your Payment</h3>
              <p className="text-muted-foreground">
                Please wait while we process your payment and confirm your booking...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Booking Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Booking Summary
          </CardTitle>
          <CardDescription>
            Review your trip details and complete the payment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Destination</p>
                  <p className="text-sm text-muted-foreground">{tripData.destination}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium">Travel Dates</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(tripData.startDate).toLocaleDateString()} - {new Date(tripData.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium">Travelers</p>
                  <p className="text-sm text-muted-foreground">{getTotalTravelers()} people</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Selected Services:</h4>
              <div className="space-y-2">
                {tripData.medicalFacilities && (
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-600" />
                    <span className="text-sm">Medical Facilities</span>
                  </div>
                )}
                {tripData.transportation && (
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Transportation</span>
                  </div>
                )}
                {tripData.accommodation && (
                  <div className="flex items-center gap-2">
                    <HouseIcon className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Accommodation</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-orange-600" />
                  <span className="text-sm">24/7 Agent Support (Included)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cost Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Cost Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Base cost ({getTotalTravelers()} travelers × {getTripDuration()} days)</span>
              <span>₹{calculateBaseCost().toLocaleString()}</span>
            </div>
            
            {calculateServicesCost() > 0 && (
              <div className="flex justify-between">
                <span>Additional services</span>
                <span>₹{calculateServicesCost().toLocaleString()}</span>
              </div>
            )}
            
            <Separator />
            
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{getTotalCost().toLocaleString()}</span>
            </div>
            
            {getDiscountAmount() > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Early bird discount (10%)</span>
                <span>-₹{getDiscountAmount().toLocaleString()}</span>
              </div>
            )}
            
            <Separator />
            
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Amount</span>
              <span>₹{getFinalAmount().toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Select value={paymentMethod} onValueChange={setPaymentMethod}>
            <SelectTrigger>
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="card">Credit/Debit Card</SelectItem>
              <SelectItem value="upi">UPI</SelectItem>
              <SelectItem value="netbanking">Net Banking</SelectItem>
              <SelectItem value="wallet">Digital Wallet</SelectItem>
            </SelectContent>
          </Select>

          {paymentMethod === 'card' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="card-name">Cardholder Name</Label>
                <Input
                  id="card-name"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="Enter cardholder name"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input
                  id="card-number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="1234 5678 9012 3456"
                />
              </div>
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                />
              </div>
            </div>
          )}

          {paymentMethod === 'upi' && (
            <div>
              <Label htmlFor="upi-id">UPI ID</Label>
              <Input
                id="upi-id"
                placeholder="yourname@upi"
              />
            </div>
          )}

          {paymentMethod === 'netbanking' && (
            <div>
              <Label htmlFor="bank">Select Bank</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your bank" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sbi">State Bank of India</SelectItem>
                  <SelectItem value="hdfc">HDFC Bank</SelectItem>
                  <SelectItem value="icici">ICICI Bank</SelectItem>
                  <SelectItem value="axis">Axis Bank</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="terms" 
              checked={acceptedTerms}
              onCheckedChange={setAcceptedTerms}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I accept the terms and conditions
              </label>
              <p className="text-xs text-muted-foreground">
                By checking this box, you agree to our terms of service, privacy policy, and cancellation policy.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button 
          onClick={handlePayment} 
          size="lg" 
          className="px-8"
          disabled={!paymentMethod || !acceptedTerms}
        >
          Pay ₹{getFinalAmount().toLocaleString()}
        </Button>
      </div>
    </div>
  );
}