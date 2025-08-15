import Image from 'next/image';
import { Calendar, MapPin, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EventDetail } from '@/types/event';
import { formatEventDate, formatEventTime } from '@/lib/eventUtils';
import Link from 'next/link';

interface EventHeroProps {
  event: EventDetail;
}

const EventHero: React.FC<EventHeroProps> = ({ event }) => {
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
          {/* Back Button */}
          <div className="mb-6">
            <Link href="/events">
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回活動列表
              </Button>
            </Link>
          </div>

          {/* Event Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display text-white mb-6 text-shadow animate-fade-in-up">
            {event.title_zh}
          </h1>
          
          {/* Event Meta Info */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8 text-white/90 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
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
            
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-accent" />
              <span className="text-lg">{event.location}</span>
            </div>
          </div>

          {/* Event Category & Distance */}
          <div className="flex flex-wrap gap-4 justify-center mb-8 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <span className="px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium backdrop-blur-sm">
              {event.category}
            </span>
            {event.distance && (
              <span className="px-4 py-2 bg-white/10 text-white rounded-full text-sm font-medium backdrop-blur-sm">
                {event.distance}
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventHero;