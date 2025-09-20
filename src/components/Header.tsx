import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from './ui/dropdown-menu';
import { MapPin, Menu, X, User, Settings, LogOut, Wallet, Compass, Globe, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface HeaderProps {
  currentPage: string;
  navigateTo: (page: string) => void;
  user: User | null;
  onLogout: () => void;
}

export function Header({ currentPage, navigateTo, user, onLogout }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', page: 'home' },
    { name: 'Packages', page: 'packages' },
    { name: 'Plan a Trip', page: 'plan-trip' },
  ];

  return (
    <header className="glass-card border-b border-white/20 sticky top-0 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Enhanced Logo */}
          <div 
            className="flex items-center space-x-4 cursor-pointer group"
            onClick={() => navigateTo('home')}
          >
            <div className="relative">
              <div className="ocean-wave w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <Compass className="h-7 w-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold gradient-text-ocean">WanderLuxe</span>
              <span className="text-xs text-muted-foreground font-medium tracking-wider">TRAVEL REIMAGINED</span>
            </div>
          </div>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden md:flex space-x-2">
            {navigation.map((item, index) => (
              <button
                key={item.page}
                onClick={() => navigateTo(item.page)}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 relative overflow-hidden group ${
                  currentPage === item.page
                    ? 'gradient-text-primary glass-card shadow-lg border border-cyan-200/50'
                    : 'text-slate-600 hover:text-cyan-700 hover:glass-card hover:shadow-md interactive-scale'
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                {currentPage === item.page && (
                  <div className="absolute bottom-0 left-0 w-full h-1 ocean-wave"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-50/0 via-cyan-50/50 to-cyan-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            ))}
          </nav>

          {/* User Menu / Auth */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => navigateTo('my-trips')}
                  className="hidden md:flex px-6 py-3 rounded-2xl glass-card hover:shadow-md interactive-scale font-semibold"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  My Trips
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-12 w-12 rounded-full interactive-scale">
                      <Avatar className="h-12 w-12 ring-2 ring-cyan-300/50">
                        <AvatarFallback className="text-lg font-bold ocean-wave text-white">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 glass-card border-cyan-200/50 shadow-2xl" align="end">
                    <div className="px-4 py-4 border-b border-cyan-200/30">
                      <p className="font-bold text-lg gradient-text-primary">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <div className="mt-2 inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Premium Member
                      </div>
                    </div>
                    <DropdownMenuItem onClick={() => navigateTo('profile')} className="py-3 px-4 hover:bg-cyan-50 interactive-scale">
                      <User className="h-5 w-5 mr-3 text-cyan-600" />
                      <span className="font-medium">Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigateTo('my-trips')} className="py-3 px-4 hover:bg-cyan-50 interactive-scale">
                      <Globe className="h-5 w-5 mr-3 text-blue-600" />
                      <span className="font-medium">My Trips</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigateTo('profile')} className="py-3 px-4 hover:bg-cyan-50 interactive-scale">
                      <Wallet className="h-5 w-5 mr-3 text-emerald-600" />
                      <span className="font-medium">Wallet</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-cyan-200/30" />
                    <DropdownMenuItem onClick={() => navigateTo('profile')} className="py-3 px-4 hover:bg-cyan-50 interactive-scale">
                      <Settings className="h-5 w-5 mr-3 text-gray-600" />
                      <span className="font-medium">Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onLogout} className="py-3 px-4 text-red-600 hover:bg-red-50 interactive-scale">
                      <LogOut className="h-5 w-5 mr-3" />
                      <span className="font-medium">Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button 
                onClick={() => navigateTo('auth')}
                className="btn-travel px-8 py-3 text-lg"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Sign In
              </Button>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-10 w-10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    navigateTo(item.page);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-4 py-2 rounded-lg text-left transition-colors ${
                    currentPage === item.page
                      ? 'gradient-text-primary bg-cyan-50'
                      : 'text-muted-foreground hover:text-cyan-700 hover:bg-cyan-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              {user && (
                <>
                  <button
                    onClick={() => {
                      navigateTo('my-trips');
                      setIsMobileMenuOpen(false);
                    }}
                    className="px-4 py-2 rounded-lg text-left text-muted-foreground hover:text-cyan-700 hover:bg-cyan-50"
                  >
                    My Trips
                  </button>
                  <button
                    onClick={() => {
                      navigateTo('profile');
                      setIsMobileMenuOpen(false);
                    }}
                    className="px-4 py-2 rounded-lg text-left text-muted-foreground hover:text-cyan-700 hover:bg-cyan-50"
                  >
                    Profile
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}