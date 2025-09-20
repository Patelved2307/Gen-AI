import { useState, useEffect } from 'react';
import { HomePage } from './components/HomePage';
import { PackagesPage } from './components/PackagesPage';
import { PlanTripPage } from './components/PlanTripPage';
import { AuthPage } from './components/AuthPage';
import { MyTripsPage } from './components/MyTripsPage';
import { PackageDetailPage } from './components/PackageDetailPage';
import { UserProfilePage } from './components/UserProfilePage';
import { Header } from './components/Header';
import { supabase } from './utils/supabase/client';

type Page = 'home' | 'packages' | 'plan-trip' | 'auth' | 'my-trips' | 'package-detail' | 'profile';

interface User {
  id: string;
  name: string;
  email: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [user, setUser] = useState<User | null>(null);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);



  // Check for existing session and listen for auth changes
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Get initial session
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Session check error:', error);
        } else if (session && session.user) {
          setUser({
            id: session.user.id,
            name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
            email: session.user.email || ''
          });
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.user_metadata?.name || session.user.email?.split('@')[0] || 'User',
          email: session.user.email || ''
        });
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    initializeAuth();

    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const navigateTo = (page: Page, packageId?: string) => {
    setCurrentPage(page);
    if (packageId) {
      setSelectedPackageId(packageId);
    }
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentPage('home');
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setCurrentPage('home');
    } catch (error) {
      console.log('Logout error:', error);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage navigateTo={navigateTo} user={user} />;
      case 'packages':
        return <PackagesPage navigateTo={navigateTo} user={user} />;
      case 'plan-trip':
        return <PlanTripPage navigateTo={navigateTo} user={user} />;
      case 'auth':
        return <AuthPage onLogin={handleLogin} onBack={() => navigateTo('home')} />;
      case 'my-trips':
        return <MyTripsPage navigateTo={navigateTo} user={user} />;
      case 'package-detail':
        return <PackageDetailPage 
          packageId={selectedPackageId!} 
          navigateTo={navigateTo} 
          user={user} 
        />;
      case 'profile':
        return <UserProfilePage navigateTo={navigateTo} user={user} />;
      default:
        return <HomePage navigateTo={navigateTo} user={user} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="simple-card text-center">
          <div className="loading-spinner mx-auto mb-6"></div>
          <h2 className="heading-2 mb-4">WanderLuxe</h2>
          <p className="body-large text-primary mb-4">Loading your travel experience...</p>
          <p className="body-small">Please wait while we prepare everything for you</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header 
        currentPage={currentPage}
        navigateTo={navigateTo}
        user={user}
        onLogout={handleLogout}
      />
      <main>
        {renderPage()}
      </main>
    </div>
  );
}