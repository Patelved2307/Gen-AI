import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware
app.use('*', cors({
  origin: '*',
  allowHeaders: ['*'],
  allowMethods: ['*'],
}));
app.use('*', logger(console.log));

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Authentication endpoints
app.post('/make-server-47b31d17/signup', async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    if (!email || !password || !name) {
      return c.json({ error: 'Email, password, and name are required' }, 400);
    }

    // Create user with Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log(`Error creating user: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    // Store user profile in KV store
    await kv.set(`user:${data.user.id}`, {
      id: data.user.id,
      name,
      email,
      createdAt: new Date().toISOString(),
      trips: []
    });

    return c.json({ 
      message: 'User created successfully',
      user: {
        id: data.user.id,
        email: data.user.email,
        name
      }
    });
  } catch (error: any) {
    console.log(`Signup error: ${error.message}`);
    return c.json({ error: 'Failed to create user' }, 500);
  }
});

// Trip management endpoints
app.post('/make-server-47b31d17/trips', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Authorization token required' }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (authError || !user) {
      console.log(`Authorization error while saving trip: ${authError?.message}`);
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const tripData = await c.req.json();
    const tripId = `trip:${user.id}:${Date.now()}`;
    
    const trip = {
      id: tripId,
      userId: user.id,
      ...tripData,
      createdAt: new Date().toISOString(),
      status: 'planned'
    };

    await kv.set(tripId, trip);

    // Update user's trips list
    const userData = await kv.get(`user:${user.id}`);
    if (userData) {
      userData.trips = userData.trips || [];
      userData.trips.push(tripId);
      await kv.set(`user:${user.id}`, userData);
    }

    return c.json({ message: 'Trip saved successfully', trip });
  } catch (error: any) {
    console.log(`Error saving trip: ${error.message}`);
    return c.json({ error: 'Failed to save trip' }, 500);
  }
});

app.get('/make-server-47b31d17/trips', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    if (!accessToken) {
      return c.json({ error: 'Authorization token required' }, 401);
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (authError || !user) {
      console.log(`Authorization error while fetching trips: ${authError?.message}`);
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userData = await kv.get(`user:${user.id}`);
    if (!userData || !userData.trips) {
      return c.json({ trips: [] });
    }

    const trips = await kv.mget(userData.trips);
    return c.json({ trips: trips.filter(Boolean) });
  } catch (error: any) {
    console.log(`Error fetching trips: ${error.message}`);
    return c.json({ error: 'Failed to fetch trips' }, 500);
  }
});

// Package endpoints
app.get('/make-server-47b31d17/packages', async (c) => {
  try {
    // Get packages from KV store or return default packages
    let packages = await kv.get('travel_packages');
    
    if (!packages) {
      // Initialize default packages
      packages = [
        {
          id: 'pkg1',
          title: 'Goa Beach Paradise',
          description: 'Experience the pristine beaches, vibrant nightlife, and Portuguese heritage of Goa.',
          price: 15000,
          duration: '4D/3N',
          image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=500',
          features: ['Beach Resort Stay', 'Water Sports', 'Local Sightseeing', 'Sunset Cruise'],
          rating: 4.8,
          location: 'Goa, India'
        },
        {
          id: 'pkg2',
          title: 'Kerala Backwaters',
          description: 'Discover the serene backwaters, spice gardens, and cultural richness of Gods Own Country.',
          price: 22000,
          duration: '5D/4N',
          image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=500',
          features: ['Houseboat Stay', 'Spice Plantation Tour', 'Ayurveda Massage', 'Traditional Cuisine'],
          rating: 4.9,
          location: 'Kerala, India'
        },
        {
          id: 'pkg3',
          title: 'Rajasthan Royal Experience',
          description: 'Immerse yourself in the royal heritage, desert landscapes, and architectural marvels.',
          price: 35000,
          duration: '7D/6N',
          image: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=500',
          features: ['Palace Hotels', 'Desert Safari', 'Cultural Shows', 'Heritage Tours'],
          rating: 4.7,
          location: 'Rajasthan, India'
        },
        {
          id: 'pkg4',
          title: 'Himachal Adventure',
          description: 'Experience the majestic Himalayas, adventure sports, and hill station charm.',
          price: 18000,
          duration: '6D/5N',
          image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500',
          features: ['Mountain Resort', 'Trekking', 'River Rafting', 'Scenic Cable Car'],
          rating: 4.6,
          location: 'Himachal Pradesh, India'
        }
      ];
      await kv.set('travel_packages', packages);
    }

    return c.json({ packages });
  } catch (error: any) {
    console.log(`Error fetching packages: ${error.message}`);
    return c.json({ error: 'Failed to fetch packages' }, 500);
  }
});

// Health check
app.get('/make-server-47b31d17/health', (c) => {
  return c.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

serve(app.fetch);