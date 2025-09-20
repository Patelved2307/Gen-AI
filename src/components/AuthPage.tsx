import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { MapPin, Mail, Lock, User, Phone } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthPageProps {
  onLogin: (user: User) => void;
  navigateTo: (page: string) => void;
}

export function AuthPage({ onLogin, navigateTo }: AuthPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signInData.email || !signInData.password) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      const user: User = {
        id: '1',
        name: 'Travel Explorer',
        email: signInData.email
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      onLogin(user);
      setIsLoading(false);
    }, 1000);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signUpData.name || !signUpData.email || !signUpData.phone || !signUpData.password) {
      alert('Please fill in all fields');
      return;
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }



    setIsLoading(true);

    // Simulate user creation
    setTimeout(() => {
      const user: User = {
        id: Date.now().toString(),
        name: signUpData.name,
        email: signUpData.email
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      onLogin(user);
      setIsLoading(false);
    }, 1000);
  };

  const handleGoogleAuth = () => {
    setIsLoading(true);
    
    // Simulate Google authentication
    setTimeout(() => {
      const user: User = {
        id: 'google_' + Date.now(),
        name: 'Google User',
        email: 'user@gmail.com'
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      onLogin(user);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen py-16 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-orange-400/20 to-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-emerald-400/10 to-teal-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <MapPin className="h-10 w-10 text-cyan-600" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full animate-pulse"></div>
            </div>
            <span className="text-3xl font-bold gradient-text-primary">TravelPro</span>
          </div>
          <h1 className="text-3xl font-bold mb-3 gradient-text-primary">Welcome to TravelPro</h1>
          <p className="text-muted-foreground text-lg">
            Sign in to plan your perfect trip or access your bookings
          </p>
        </div>

        <Card className="card-hover backdrop-blur-lg border-white/20 shadow-2xl">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl gradient-text-primary">Authentication</CardTitle>
            <CardDescription className="text-base">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-slate-100 to-slate-200 p-1 rounded-xl">
                <TabsTrigger value="signin" className="rounded-lg font-semibold transition-all data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:gradient-text-primary">Sign In</TabsTrigger>
                <TabsTrigger value="signup" className="rounded-lg font-semibold transition-all data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:gradient-text-primary">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin" className="space-y-4">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <Label htmlFor="signin-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="Enter your email"
                        value={signInData.email}
                        onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="signin-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signin-password"
                        type="password"
                        placeholder="Enter your password"
                        value={signInData.password}
                        onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full btn-gradient-primary font-semibold py-6 text-lg" disabled={isLoading}>
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
                
                <div className="text-center">
                  <Button variant="link" className="text-sm">
                    Forgot your password?
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div>
                    <Label htmlFor="signup-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Enter your full name"
                        value={signUpData.name}
                        onChange={(e) => setSignUpData({ ...signUpData, name: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="Enter your email"
                        value={signUpData.email}
                        onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="signup-phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={signUpData.phone}
                        onChange={(e) => setSignUpData({ ...signUpData, phone: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create a password"
                        value={signUpData.password}
                        onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-confirm-password"
                        type="password"
                        placeholder="Confirm your password"
                        value={signUpData.confirmPassword}
                        onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full btn-gradient-secondary font-semibold py-6 text-lg" disabled={isLoading}>
                    {isLoading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </form>
                
                <div className="text-center text-xs text-muted-foreground">
                  By creating an account, you agree to our Terms of Service and Privacy Policy
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6">
              <Separator className="my-4" />
              <Button 
                variant="outline" 
                className="w-full py-6 text-lg font-semibold border-2 hover:bg-gradient-to-r hover:from-slate-50 hover:to-slate-100 transition-all duration-300"
                onClick={handleGoogleAuth}
                disabled={isLoading}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center mt-8">
          <Button 
            variant="link" 
            onClick={() => navigateTo('home')}
            className="text-lg font-semibold gradient-text-primary hover:opacity-80 transition-opacity"
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}