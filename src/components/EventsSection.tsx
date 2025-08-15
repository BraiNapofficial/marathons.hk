import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import { Search, Filter } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

type EventItem = {
  id: string;
  title_zh?: string;
  date: string;
  location?: string;
  category?: string;
  distance?: string;
  price_range?: string;
  organizer?: string;
  is_featured?: boolean;
  registration_url?: string;
};

const EventsSection = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('全部分類');
  const [selectedLocation, setSelectedLocation] = useState<string>('全部地區');
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const categories = ['全部分類', '馬拉松', '半程馬拉松', '10公里', '5公里', '越野跑'];
  const locations = ['全部地區', '中環', '尖沙咀', '沙田', '太平山', '大嶼山', '維多利亞港'];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const isoToday = today.toISOString().slice(0, 10); // YYYY-MM-DD

      // Prefer upcoming events from today; if none, fall back to recent past 90 days
      const { data, error } = await supabase
        .from('marathons.hk')
        .select('*')
        .gte('date', isoToday)
        .order('date', { ascending: true });

      if (error) {
        // Surface Supabase error details
        throw new Error(error.message || 'Supabase query failed');
      }

      let rows: EventItem[] = (data || []).map((row: {
        id: string | number;
        event_name?: string;
        event_date: string;
        location?: string;
        event_category?: string;
        distance?: string;
        link?: string;
      }) => ({
        id: String(row.id),
        title_zh: row.event_name ?? '未命名活動',
        date: row.event_date,
        location: row.location ?? undefined,
        category: row.event_category ?? undefined,
        distance: row.distance ?? undefined,
        price_range: undefined,
        organizer: undefined,
        is_featured: false,
        registration_url: row.link ?? undefined,
      })) || [];

      // Fallback: if no upcoming events, show last 90 days to avoid an empty homepage
      if (!rows.length) {
        const past90 = new Date(today);
        past90.setDate(past90.getDate() - 90);
        const isoPast90 = past90.toISOString().slice(0, 10);

        const { data: fallbackData, error: fbErr } = await supabase
          .from('marathons.hk')
          .select('*')
          .gte('date', isoPast90)
          .lte('date', isoToday)
          .order('date', { ascending: false });

        if (fbErr) throw new Error(fbErr.message || 'Supabase fallback query failed');
        rows = (fallbackData || []).map((row: {
          id: string | number;
          event_name?: string;
          event_date: string;
          location?: string;
          event_category?: string;
          distance?: string;
          link?: string;
        }) => ({
          id: String(row.id),
          title_zh: row.event_name ?? '未命名活動',
          date: row.event_date,
          location: row.location ?? undefined,
          category: row.event_category ?? undefined,
          distance: row.distance ?? undefined,
          price_range: undefined,
          organizer: undefined,
          is_featured: false,
          registration_url: row.link ?? undefined,
        })) || [];
      }

      setEvents(rows);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : typeof err === 'string'
          ? err
          : 'Unknown error';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Filter events based on search and filters
  const filteredEvents = events.filter((event) => {
    const term = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !term ||
      event.title_zh?.toLowerCase().includes(term) ||
      event.location?.toLowerCase().includes(term);
    const matchesCategory = selectedCategory === '全部分類' || event.category === selectedCategory;
    const matchesLocation = selectedLocation === '全部地區' || event.location === selectedLocation;

    return matchesSearch && matchesCategory && matchesLocation;
  });

  const featuredEvents = filteredEvents.filter((event: EventItem) => !!event.is_featured);
  const upcomingEvents = filteredEvents.filter((event: EventItem) => !event.is_featured);

  if (loading) {
    return (
      <section id="events" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-display text-foreground mb-4">
                跑步活動
              </h2>
              <div className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mx-auto mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-card rounded-lg p-6 animate-pulse">
                      <div className="h-4 bg-muted rounded mb-4"></div>
                      <div className="h-3 bg-muted rounded mb-2"></div>
                      <div className="h-3 bg-muted rounded mb-2"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="events" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-display text-foreground mb-4">
                跑步活動
              </h2>
              <div className="text-red-500">
                <p>載入活動資料時發生錯誤</p>
                <p className="text-sm mt-2 break-all">{error}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

    return (
    <section id="events" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display text-foreground mb-4">
              跑步活動
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              發現香港最精彩的跑步活動，從馬拉松到越野跑，總有一個適合你
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="搜尋活動或地點..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent"
                />
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-accent focus:border-accent"
              >
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Featured Events */}
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-8">
              <Filter className="w-5 h-5 text-accent" />
              <h3 className="text-2xl font-semibold text-foreground">精選活動</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  title_zh={event.title_zh ?? '未命名活動'}
                  date={event.date}
                  location={event.location ?? '—'}
                  category={event.category ?? '其他'}
                  distance={event.distance ?? '—'}
                  price_range={event.price_range}
                  organizer={event.organizer ?? '—'}
                  is_featured={event.is_featured}
                  registration_url={event.registration_url}
                />
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-foreground mb-8">即將舉行</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard
                  key={event.id}
                  title_zh={event.title_zh ?? '未命名活動'}
                  date={event.date}
                  location={event.location ?? '—'}
                  category={event.category ?? '其他'}
                  distance={event.distance ?? '—'}
                  price_range={event.price_range}
                  organizer={event.organizer ?? '—'}
                  is_featured={event.is_featured}
                  registration_url={event.registration_url}
                />
              ))}
            </div>
          </div>

          {/* Load More Notice */}
          <div className="text-center text-sm text-muted-foreground">
            如需更多活動與進階搜尋，請前往
            <Link href="/events" className="underline underline-offset-2 pl-1 hover:text-accent">活動列表</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;

