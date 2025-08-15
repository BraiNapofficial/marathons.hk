import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { EventDetail, RelatedEvent, EventPageProps } from '@/types/event';
import { supabase } from '@/lib/supabase';
import EventPageHero from '@/components/ui/eventpage-hero';
import EventPageDetailsCard from '@/components/ui/eventpage-details-card';
import EventPageRelatedEventsCard from '@/components/ui/eventpage-related-events-card';
import EventPageRegistrationButton from '@/components/ui/eventpage-registration-button';
import EventPageShareButtons from '@/components/ui/eventpage-share-buttons';
import Footer from '@/components/Footer';

export default function EventPage({ event, relatedEvents }: EventPageProps) {
  const siteUrl = 'https://marathons.hk';
  const eventUrl = `${siteUrl}/events/${event.slug}`;

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    "name": event.title_zh,
    "description": event.description || `${event.title_zh} - ${event.location}`,
    "startDate": event.date + (event.time ? `T${event.time}:00+08:00` : 'T06:00:00+08:00'),
    "location": {
      "@type": "Place",
      "name": event.location,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": event.location,
        "addressCountry": "HK"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": event.organizer || "足•包 marathons.hk"
    },
    "offers": event.price ? {
      "@type": "Offer",
      "price": event.price,
      "priceCurrency": "HKD",
      "url": event.registration_url,
      "availability": event.status === 'registration_open' ? 
        "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    } : undefined,
    "sport": "Running",
    "eventStatus": event.status === 'completed' ? 
      "https://schema.org/EventScheduled" : "https://schema.org/EventScheduled",
    "url": eventUrl,
    "image": event.image_url ? `${siteUrl}${event.image_url}` : `${siteUrl}/hero-image.webp`
  };

  return (
    <>
      <Head>
        <title>{event.title_zh} - 足•包 | marathons.hk</title>
        <meta name="description" content={event.description || `${event.title_zh} - ${event.location}，${event.date}`} />
        <meta name="keywords" content={`${event.title_zh}, ${event.category}, ${event.location}, 香港馬拉松, 跑步活動`} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={eventUrl} />
        
        {/* Open Graph */}
        <meta property="og:type" content="event" />
        <meta property="og:url" content={eventUrl} />
        <meta property="og:title" content={event.title_zh} />
        <meta property="og:description" content={event.description || `${event.title_zh} - ${event.location}`} />
        <meta property="og:image" content={event.image_url ? `${siteUrl}${event.image_url}` : `${siteUrl}/hero-image.webp`} />
        <meta property="og:site_name" content="足•包 marathons.hk" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={event.title_zh} />
        <meta name="twitter:description" content={event.description || `${event.title_zh} - ${event.location}`} />
        <meta name="twitter:image" content={event.image_url ? `${siteUrl}${event.image_url}` : `${siteUrl}/hero-image.webp`} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <main className="min-h-screen bg-background">
        {/* Event Hero Section */}
        <EventPageHero event={event} />

        {/* Main Content */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Registration CTA */}
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-6 bg-card/50 border border-border rounded-lg">
                    <div>
                      <h2 className="text-xl font-semibold text-foreground mb-1">準備好參加了嗎？</h2>
                      <p className="text-muted-foreground">立即報名參加這個精彩的跑步活動</p>
                    </div>
                    <EventPageRegistrationButton event={event} />
                  </div>

                  {/* Event Details */}
                  <EventPageDetailsCard event={event} />
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Share Buttons */}
                  <EventPageShareButtons event={event} />
                  
                  {/* Related Events */}
                  <EventPageRelatedEventsCard events={relatedEvents} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // Get all events from Supabase
    const { data: events, error } = await supabase
      .from('marathons.hk')
      .select('id, event_name, event_date, english_slug_base')
      .order('event_date', { ascending: true });

    if (error || !events) {
      return {
        paths: [],
        fallback: 'blocking'
      };
    }

    // Generate paths for all events
    const paths = events.map((event: {
      id: string | number;
      event_name?: string;
      event_date: string;
      english_slug_base?: string;
    }) => ({
      params: {
        slug: event.english_slug_base || 'event'
      }
    }));

    return {
      paths,
      fallback: 'blocking'
    };
  } catch (error) {
    console.error('Error generating static paths:', error);
    return {
      paths: [],
      fallback: 'blocking'
    };
  }
};

export const getStaticProps: GetStaticProps<EventPageProps> = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    
    if (!slug) {
      return {
        notFound: true
      };
    }

    // Get all events to find the matching one
    const { data: events, error } = await supabase
      .from('marathons.hk')
      .select('id, event_name, event_date, event_category, distance, location, link, event_time, price, organizer, description, image_url, registration_deadline, max_participants, current_participants, english_slug_base')
      .order('event_date', { ascending: true });

    if (error || !events) {
      return {
        notFound: true
      };
    }

    // Find event by matching slug
    const eventData = events.find((event: {
      id: string | number;
      event_name?: string;
      event_date: string;
      event_category?: string;
      distance?: string;
      location?: string;
      link?: string;
      event_time?: string;
      price?: number;
      organizer?: string;
      description?: string;
      image_url?: string;
      registration_deadline?: string;
      max_participants?: number;
      current_participants?: number;
      english_slug_base?: string;
    }) =>
      event.english_slug_base === slug
    );

    if (!eventData) {
      return {
        notFound: true
      };
    }

    // Transform to EventDetail
    const event: EventDetail = {
      id: String(eventData.id),
      title_zh: eventData.event_name || '未命名活動',
      date: eventData.event_date,
      time: eventData.event_time || undefined,
      location: eventData.location || '待定',
      category: eventData.event_category || '其他',
      distance: eventData.distance || undefined,
      price: eventData.price || undefined,
      registration_url: eventData.link || undefined,
      organizer: eventData.organizer || undefined,
      description: eventData.description || undefined,
      image_url: eventData.image_url || '/hero-image.webp',
      status: 'registration_open',
      registration_deadline: eventData.registration_deadline || undefined,
      max_participants: eventData.max_participants || undefined,
      current_participants: eventData.current_participants || undefined,
      slug: slug
    };

    // Get related events (same category or location, excluding current event)
    const relatedEvents: RelatedEvent[] = events
      .filter((e: {
        id: string | number;
        event_name?: string;
        event_date: string;
        event_category?: string;
        distance?: string;
        location?: string;
        link?: string;
        english_slug_base?: string;
      }) =>
        e.id !== eventData.id &&
        (e.event_category === eventData.event_category || e.location === eventData.location)
      )
      .slice(0, 3)
      .map((e: {
        id: string | number;
        event_name?: string;
        event_date: string;
        event_category?: string;
        distance?: string;
        location?: string;
        link?: string;
        english_slug_base?: string;
      }) => ({
        id: String(e.id),
        title_zh: e.event_name || '未命名活動',
        date: e.event_date,
        location: e.location || '待定',
        category: e.event_category || '其他',
        distance: e.distance || undefined,
        registration_url: e.link || undefined,
        slug: e.english_slug_base || 'event'
      }));

    return {
      props: {
        event,
        relatedEvents
      },
      revalidate: 3600 // Revalidate every hour
    };
  } catch (error) {
    console.error('Error fetching event data:', error);
    return {
      notFound: true
    };
  }
};