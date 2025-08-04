import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import EventCard from './EventCard';
import { Search, Filter } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const EventsSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部分類');
  const [selectedLocation, setSelectedLocation] = useState('全部地區');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ['全部分類', '馬拉松', '半程馬拉松', '10公里', '5公里', '越野跑'];
  const locations = ['全部地區', '中環', '尖沙咀', '沙田', '太平山', '大嶼山', '維多利亞港'];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });
      
      if (error) throw error;
      setEvents(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter events based on search and filters
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title_zh?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '全部分類' || event.category === selectedCategory;
    const matchesLocation = selectedLocation === '全部地區' || event.location === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const featuredEvents = filteredEvents.filter(event => event.is_featured);
  const upcomingEvents = filteredEvents.filter(event => !event.is_featured);

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
                <p className="text-sm mt-2">{error}</p>
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
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold text-foreground mb-8">即將舉行</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          </div>

          {/* Load More Button */}
          <div className="text-center">
            <Button 
              variant="outline" 
              size="lg"
              className="border-border hover:border-accent hover:bg-accent hover:text-accent-foreground px-8 py-3"
            >
              載入更多活動
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;

