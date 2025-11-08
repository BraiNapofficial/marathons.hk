import Image from 'next/image';
import { Calendar, MapPin, Clock, Tag, Route } from 'lucide-react';
import { EventDetail } from '@/types/event';
import { formatEventDate, formatEventTime } from '@/lib/eventUtils';

interface EventHeroProps {
  event: EventDetail;
}

const EventHero: React.FC<EventHeroProps> = ({ event }) => {
  // Function to handle Google Maps opening
  const handleLocationClick = () => {
    const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(event.location)}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={event.image_url || "/hero-image.webp"}
          alt={event.title_zh}
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">

          {/* Event Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display text-white mb-6 text-shadow">
            {event.title_zh}
          </h1>
          
          {/* Event Meta Info */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8 text-white/90">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-accent" />
              <span className="text-lg">{formatEventDate(event.date)}</span>
            </div>
            
            {event.time && (
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                <span className="text-lg">{formatEventTime(event.time)}</span>
              </div>
            )}
            
            <div
              className="flex items-center gap-2 cursor-pointer hover:text-accent transition-colors"
              onClick={handleLocationClick}
              title={`在 Google Maps 中查看 ${event.location}`}
            >
              <MapPin className="w-5 h-5 text-accent" />
              <span className="text-lg underline decoration-dotted underline-offset-4">{event.location}</span>
            </div>
          </div>

          {/* Event Category & Distance */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            {/* Category Badge */}
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/10 border border-accent/40 text-white text-sm font-medium backdrop-blur-sm shadow-sm"
              aria-label={`Category: ${event.category}`}
            >
              <Tag className="w-4 h-4 opacity-80" />
              <span>{event.category}</span>
            </span>
            
            {/* Distance Badge */}
            {event.distance && (
              <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/10 border border-accent/40 text-white text-sm font-medium backdrop-blur-sm shadow-sm"
                aria-label={`Distance: ${event.distance}`}
                title={event.distance}
              >
                <Route className="w-4 h-4 opacity-80" />
                <span>{event.distance}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventHero;