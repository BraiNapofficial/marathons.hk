import Head from 'next/head'
import Hero from '@/components/Hero'
import AboutSection from '@/components/AboutSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import EventsTable, { EventRow } from '@/components/EventsTable'
import { supabase } from '@/lib/supabase'
import { mockRootProps } from '@/data/eventMockData'
import EventPageHero from '@/components/ui/eventpage-hero'
import EventPageDetailsCard from '@/components/ui/eventpage-details-card'
import EventPageRelatedEventsCard from '@/components/ui/eventpage-related-events-card'
import EventPageRegistrationButton from '@/components/ui/eventpage-registration-button'
import EventPageShareButtons from '@/components/ui/eventpage-share-buttons'

// Helper: format a JS Date to YYYY-MM-DD in Asia/Hong_Kong
function hkTodayYYYYMMDD(): string {
  const now = new Date()
  const fmt = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Hong_Kong',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  const [day, month, year] = fmt.format(now).split('/')
  return `${year}-${month}-${day}`
}

// Map DB row (from marathons.hk) to EventRow expected by EventsTable
function mapDbToEventRow(row: {
  id: string | number;
  event_name?: string;
  event_date: string;
  location?: string;
  event_category?: string;
  distance?: string;
  link?: string;
}): EventRow {
  return {
    id: String(row.id),
    title_zh: row.event_name ?? '未命名活動',
    date: row.event_date, // Supabase returns DATE as YYYY-MM-DD string
    location: row.location ?? null,
    category: row.event_category ?? null,
    distance: row.distance ?? null,
    price_range: null,
    registration_url: row.link ?? null,
    status: null,
    slug: null,
  }
}

type HomeProps = {
  events: EventRow[];
}

export default function Home({ events }: HomeProps) {
  return (
    <>
      <Head>
        <title>香港馬拉松活動 - Hong Kong Marathon Events</title>
        <meta name="description" content="探索香港最完整的跑步活動資訊平台。從馬拉松到越野跑，從初學者到專業選手，找到最適合你的跑步活動。" />
        <meta name="keywords" content="馬拉松, 香港, 跑步, 活動, 報名, 半程馬拉松, 10公里, 5公里, 越野跑" />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "足•包 marathons.hk",
              "description": "香港最完整的馬拉松和跑步活動資訊平台",
              "url": "https://marathons.hk",
              "logo": "https://marathons.hk/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer support",
                "email": "support@marathons.hk"
              },
              "sameAs": []
            })
          }}
        />
      </Head>

      <main className="min-h-screen bg-background">
        <Hero />
        
        {/* Event Page Preview Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display text-foreground mb-4">活動頁面預覽</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  個別活動頁面展示
                </p>
              </div>
              
              {/* Event Hero Preview */}
              <div className="mb-12">
                <EventPageHero event={mockRootProps.event} />
              </div>

              {/* Event Content Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Registration CTA */}
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-6 bg-card/50 border border-border rounded-lg">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-1">準備好參加了嗎？</h3>
                      <p className="text-muted-foreground">立即報名參加這個精彩的跑步活動</p>
                    </div>
                    <EventPageRegistrationButton event={mockRootProps.event} />
                  </div>

                  {/* Event Details */}
                  <EventPageDetailsCard event={mockRootProps.event} />
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Share Buttons */}
                  <EventPageShareButtons event={mockRootProps.event} />
                  
                  {/* Related Events */}
                  <EventPageRelatedEventsCard events={mockRootProps.relatedEvents} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Homepage Events Section (SSR) */}
        <section id="events" className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-display text-foreground mb-4">跑步活動</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  即將舉行的跑步活動一覽
                </p>
              </div>
              {/* Table with headerless action handled inside EventsTable (button under title on small screens already) */}
              <EventsTable events={events} />
            </div>
          </div>
        </section>
        <AboutSection />
        <ContactSection />
      </main>
      
      <Footer />
    </>
  )
}

export async function getServerSideProps() {
  try {
    const today = hkTodayYYYYMMDD();
    const { data, error } = await supabase
      .from('marathons.hk')
      .select('id, event_name, event_date, event_category, distance, location, link')
      .gte('event_date', today)
      .order('event_date', { ascending: true });

    if (error) {
      return { props: { events: [] } };
    }

    const events: EventRow[] = (data ?? []).map(mapDbToEventRow);
    return { props: { events } };
  } catch {
    return { props: { events: [] } };
  }
}