import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarInitials } from './ui/avatar';
import { 
  User,
  MapPin, 
  Calendar, 
  Wallet,
  Settings,
  Phone,
  Mail,
  Save,
  Edit3,
  CreditCard,
  Shield,
  Bell,
  Star,
  Download,
  Eye
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserProfile {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    address: string;
    emergencyContact: {
      name: string;
      phone: string;
      relation: string;
    };
  };
  preferences: {
    preferredDestinations: string[];
    budgetRange: { min: number; max: number };
    travelStyle: string[];
    dietaryRestrictions: string[];
    accessibilityNeeds: string[];
  };
  wallet: {
    balance: number;
    transactions: Array<{
      id: string;
      type: 'credit' | 'debit';
      amount: number;
      description: string;
      date: string;
    }>;
  };
  settings: {
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    privacy: {
      profilePublic: boolean;
      shareLocation: boolean;
    };
  };
}

interface UserProfilePageProps {
  navigateTo: (page: string) => void;
  user: User | null;
}

export function UserProfilePage({ navigateTo, user }: UserProfilePageProps) {
  const [profile, setProfile] = useState<UserProfile>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: user?.email || '',
      phone: '',
      dateOfBirth: '',
      address: '',
      emergencyContact: {
        name: '',
        phone: '',
        relation: ''
      }
    },
    preferences: {
      preferredDestinations: [],
      budgetRange: { min: 5000, max: 50000 },
      travelStyle: [],
      dietaryRestrictions: [],
      accessibilityNeeds: []
    },
    wallet: {
      balance: 0,
      transactions: []
    },
    settings: {
      notifications: {
        email: true,
        sms: false,
        push: true
      },
      privacy: {
        profilePublic: false,
        shareLocation: false
      }
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    // Load profile from localStorage
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else if (user) {
      // Initialize with user data
      setProfile(prev => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          firstName: user.name.split(' ')[0] || '',
          lastName: user.name.split(' ').slice(1).join(' ') || '',
          email: user.email
        }
      }));
    }
  }, [user]);

  const saveProfile = () => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setIsEditing(false);
  };

  const addToWallet = () => {
    const amount = prompt('Enter amount to add:');
    if (amount && !isNaN(Number(amount))) {
      const newTransaction = {
        id: `txn_${Date.now()}`,
        type: 'credit' as const,
        amount: Number(amount),
        description: 'Wallet top-up',
        date: new Date().toISOString()
      };
      
      setProfile(prev => ({
        ...prev,
        wallet: {
          balance: prev.wallet.balance + Number(amount),
          transactions: [newTransaction, ...prev.wallet.transactions]
        }
      }));
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
                Please sign in to view your profile
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
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-6 mb-6">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
                {profile.personalInfo.firstName.charAt(0)}{profile.personalInfo.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl md:text-4xl mb-2">
                {profile.personalInfo.firstName} {profile.personalInfo.lastName}
              </h1>
              <p className="text-xl text-muted-foreground">{profile.personalInfo.email}</p>
              <div className="flex items-center gap-4 mt-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Star className="h-3 w-3" />
                  WanderLuxe Member
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Wallet className="h-3 w-3" />
                  ₹{profile.wallet.balance.toLocaleString()}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="trips" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              My Trips
            </TabsTrigger>
            <TabsTrigger value="wallet" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Wallet
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Personal Information</CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <Edit3 className="h-4 w-4 mr-2" />
                      {isEditing ? 'Cancel' : 'Edit'}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profile.personalInfo.firstName}
                        onChange={(e) => setProfile(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, firstName: e.target.value }
                        }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profile.personalInfo.lastName}
                        onChange={(e) => setProfile(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, lastName: e.target.value }
                        }))}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.personalInfo.email}
                      disabled
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.personalInfo.phone}
                      onChange={(e) => setProfile(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, phone: e.target.value }
                      }))}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={profile.personalInfo.dateOfBirth}
                      onChange={(e) => setProfile(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, dateOfBirth: e.target.value }
                      }))}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={profile.personalInfo.address}
                      onChange={(e) => setProfile(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, address: e.target.value }
                      }))}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  {isEditing && (
                    <Button onClick={saveProfile} className="w-full">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contact</CardTitle>
                  <CardDescription>
                    This information is used for emergency situations during your travels
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="emergencyName">Contact Name</Label>
                    <Input
                      id="emergencyName"
                      value={profile.personalInfo.emergencyContact.name}
                      onChange={(e) => setProfile(prev => ({
                        ...prev,
                        personalInfo: {
                          ...prev.personalInfo,
                          emergencyContact: {
                            ...prev.personalInfo.emergencyContact,
                            name: e.target.value
                          }
                        }
                      }))}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="emergencyPhone">Phone Number</Label>
                    <Input
                      id="emergencyPhone"
                      value={profile.personalInfo.emergencyContact.phone}
                      onChange={(e) => setProfile(prev => ({
                        ...prev,
                        personalInfo: {
                          ...prev.personalInfo,
                          emergencyContact: {
                            ...prev.personalInfo.emergencyContact,
                            phone: e.target.value
                          }
                        }
                      }))}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="emergencyRelation">Relationship</Label>
                    <Input
                      id="emergencyRelation"
                      value={profile.personalInfo.emergencyContact.relation}
                      onChange={(e) => setProfile(prev => ({
                        ...prev,
                        personalInfo: {
                          ...prev.personalInfo,
                          emergencyContact: {
                            ...prev.personalInfo.emergencyContact,
                            relation: e.target.value
                          }
                        }
                      }))}
                      disabled={!isEditing}
                      placeholder="e.g., Spouse, Parent, Sibling"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Trips Tab */}
          <TabsContent value="trips" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>My Trips</CardTitle>
                <CardDescription>
                  View and manage all your bookings and travel history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No trips found</h3>
                  <p className="text-muted-foreground mb-4">
                    Your booked trips will appear here
                  </p>
                  <Button onClick={() => navigateTo('my-trips')}>
                    View All Trips
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wallet Tab */}
          <TabsContent value="wallet" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    Wallet Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      ₹{profile.wallet.balance.toLocaleString()}
                    </div>
                    <p className="text-muted-foreground mb-4">Available Balance</p>
                    <Button onClick={addToWallet} className="w-full">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Add Money
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  {profile.wallet.transactions.length > 0 ? (
                    <div className="space-y-3">
                      {profile.wallet.transactions.slice(0, 5).map((transaction) => (
                        <div key={transaction.id} className="flex justify-between items-center p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(transaction.date).toLocaleDateString()}
                            </p>
                          </div>
                          <span className={`font-medium ${
                            transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">No transactions yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">Trip updates and booking confirmations</p>
                    </div>
                    <Button
                      variant={profile.settings.notifications.email ? "default" : "outline"}
                      size="sm"
                      onClick={() => setProfile(prev => ({
                        ...prev,
                        settings: {
                          ...prev.settings,
                          notifications: {
                            ...prev.settings.notifications,
                            email: !prev.settings.notifications.email
                          }
                        }
                      }))}
                    >
                      {profile.settings.notifications.email ? 'On' : 'Off'}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">SMS Notifications</h4>
                      <p className="text-sm text-muted-foreground">Emergency updates and reminders</p>
                    </div>
                    <Button
                      variant={profile.settings.notifications.sms ? "default" : "outline"}
                      size="sm"
                      onClick={() => setProfile(prev => ({
                        ...prev,
                        settings: {
                          ...prev.settings,
                          notifications: {
                            ...prev.settings.notifications,
                            sms: !prev.settings.notifications.sms
                          }
                        }
                      }))}
                    >
                      {profile.settings.notifications.sms ? 'On' : 'Off'}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Privacy Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Public Profile</h4>
                      <p className="text-sm text-muted-foreground">Allow others to see your travel profile</p>
                    </div>
                    <Button
                      variant={profile.settings.privacy.profilePublic ? "default" : "outline"}
                      size="sm"
                      onClick={() => setProfile(prev => ({
                        ...prev,
                        settings: {
                          ...prev.settings,
                          privacy: {
                            ...prev.settings.privacy,
                            profilePublic: !prev.settings.privacy.profilePublic
                          }
                        }
                      }))}
                    >
                      {profile.settings.privacy.profilePublic ? 'Public' : 'Private'}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Share Location</h4>
                      <p className="text-sm text-muted-foreground">Share live location during trips for safety</p>
                    </div>
                    <Button
                      variant={profile.settings.privacy.shareLocation ? "default" : "outline"}
                      size="sm"
                      onClick={() => setProfile(prev => ({
                        ...prev,
                        settings: {
                          ...prev.settings,
                          privacy: {
                            ...prev.settings.privacy,
                            shareLocation: !prev.settings.privacy.shareLocation
                          }
                        }
                      }))}
                    >
                      {profile.settings.privacy.shareLocation ? 'On' : 'Off'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}