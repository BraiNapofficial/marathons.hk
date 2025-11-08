import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { EventDetail, RelatedEvent, EventPageProps } from '@/types/event';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import EventPageHero from '@/components/ui/eventpage-hero';
import EventPageDetailsCard from '@/components/ui/eventpage-details-card';
import EventPageRelatedEventsCard from '@/components/ui/eventpage-related-events-card';
import EventPageRegistrationButton from '@/components/ui/eventpage-registration-button';
import EventPageShareButtons from '@/components/ui/eventpage-share-buttons';
import Footer from '@/components/Footer';
import { createSportsEventJsonLd, createEventMeta } from '@/lib/seoUtils';

export default function EventPage({ event, relatedEvents }: EventPageProps) {

  // Create structured data and meta using utilities
  const structuredData = createSportsEventJsonLd({
    id: event.id,
    event_name: event.title_zh,
    event_date: event.date,
    event_category: event.category,
    distance: event.distance || '',
    location: event.location,
    link: event.registration_url,
    event_description: event.description,
    organizer_name: event.organizer,
    image_url: event.image_url,
    slug: event.slug
  });

  const meta = createEventMeta({
    event_name: event.title_zh,
    event_category: event.category,
    distance: event.distance || '',
    event_description: event.description,
    location: event.location,
    event_date: event.date,
    image_url: event.image_url,
    slug: event.slug
  });

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="keywords" content={`${event.title_zh}, ${event.category}, ${event.location}, 香港馬拉松, 跑步活動`} />
        
        {/* Canonical URL */}
        <link rel="canonical" href={meta.url} />
        
        {/* Open Graph */}
        <meta property="og:type" content="event" />
        <meta property="og:url" content={meta.url} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.image} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={meta.imageAlt} />
        <meta property="og:site_name" content={meta.siteName} />
        <meta property="og:locale" content={meta.locale} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <meta name="twitter:image:alt" content={meta.imageAlt} />
        <meta name="twitter:domain" content="marathons.hk" />
        {/* Add your Twitter handle here when available */}
        {/* <meta name="twitter:site" content="@yourusername" /> */}
        {/* <meta name="twitter:creator" content="@yourusername" /> */}
        
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
                  
                  {/* Back Button */}
                  <div className="flex justify-center mt-4">
                    <Link href="/events">
                      <Button
                        variant="outline"
                        className="border-accent/30 text-accent hover:bg-accent/10"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        返回活動列表
                      </Button>
                    </Link>
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
      .select('id, event_name, event_date, event_category, distance, location, link, english_slug_base, event_description, organizer_name')
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
      english_slug_base?: string;
      event_description?: string | null;
      organizer_name?: string | null;
    }) =>
      event.english_slug_base === slug
    );

    if (!eventData) {
      return {
        notFound: true
      };
    }

    // Log warnings for missing critical fields
    if (!eventData.event_name) console.warn('[SEO] Missing event_name in Supabase for slug:', slug);
    if (!eventData.event_date) console.warn('[SEO] Missing event_date in Supabase for slug:', slug);
    if (!eventData.location) console.warn('[SEO] Missing location in Supabase for slug:', slug);
    if (!eventData.event_description) console.warn('[SEO] Missing event_description in Supabase for slug:', slug);
    if (!eventData.organizer_name) console.warn('[SEO] Missing organizer_name in Supabase for slug:', slug);

    // Transform to EventDetail
    const event: EventDetail = {
      id: String(eventData.id),
      title_zh: eventData.event_name || '未命名活動',
      date: eventData.event_date,
      time: null,
      location: eventData.location || '待定',
      category: eventData.event_category || '其他',
      distance: eventData.distance || null,
      registration_url: eventData.link || null,
      organizer: eventData.organizer_name,
      description: eventData.event_description,
      image_url: '/hero-image.webp',
      status: 'registration_open',
      registration_deadline: null,
      max_participants: null,
      current_participants: null,
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
        distance: e.distance || null,
        registration_url: e.link || null,
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