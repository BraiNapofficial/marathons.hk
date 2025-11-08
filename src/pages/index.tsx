import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Hero from '@/components/Hero'
import AboutSection from '@/components/AboutSection'
import Footer from '@/components/Footer'
import EventsTable, { EventRow } from '@/components/EventsTable'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { supabase } from '@/lib/supabase'

// Helper: get first day of current month in YYYY-MM-DD format
function getFirstDayOfCurrentMonth(): string {
  const now = new Date()
  const hk = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Hong_Kong' }))
  const year = hk.getFullYear()
  const month = `${hk.getMonth() + 1}`.padStart(2, '0')
  return `${year}-${month}-01`
}

// Helper: get last day of next month in YYYY-MM-DD format
function getLastDayOfNextMonth(): string {
  const now = new Date()
  const hk = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Hong_Kong' }))
  // Move to next month
  hk.setMonth(hk.getMonth() + 2)
  // Set to first day of that month
  hk.setDate(1)
  // Go back one day to get last day of next month
  hk.setDate(hk.getDate() - 1)
  const year = hk.getFullYear()
  const month = `${hk.getMonth() + 1}`.padStart(2, '0')
  const day = `${hk.getDate()}`.padStart(2, '0')
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
  english_slug_base?: string;
}): EventRow {
  return {
    id: String(row.id),
    title_zh: row.event_name ?? '未命名活動',
    date: row.event_date, // Supabase returns DATE as YYYY-MM-DD string
    location: row.location ?? null,
    category: row.event_category ?? null,
    distance: row.distance ?? null,
    registration_url: row.link ?? null,
    status: null,
    slug: row.english_slug_base ?? null,
  }
}

type HomeProps = {
  events: EventRow[];
}

// FAQ Section Component
const FAQSection = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: '如何報名參加活動？',
      answer: '點擊活動卡片上的「立即報名」按鈕，您將被導向到主辦方的官方報名頁面。請按照主辦方的指示完成報名程序。'
    },
    {
      question: '活動資訊多久更新一次？',
      answer: '我們每天都會更新活動資訊，確保您獲得最新、最準確的活動詳情。如發現任何錯誤資訊，請立即聯絡我們。'
    },
    {
      question: '可以提交新的活動資訊嗎？',
      answer: '當然可以！如果您知道任何我們尚未收錄的跑步活動，歡迎透過聯絡表單或電子郵件告訴我們。'
    },
    {
      question: '是否提供活動提醒服務？',
      answer: '目前我們正在開發活動提醒功能，敬請期待。您可以關注我們的社交媒體獲取最新活動資訊。'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display text-foreground mb-4">
              常見問題
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              查看香港馬拉松活動平台的常見問題，獲得活動報名、資訊更新等相關解答。
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="bg-card border-border">
                <CardHeader
                  className="cursor-pointer"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-foreground">{faq.question}</CardTitle>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-accent" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-accent" />
                    )}
                  </div>
                </CardHeader>
                {expandedFaq === index && (
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              還有其他問題？
            </p>
            <Link
              href="/faq"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-accent text-accent-foreground hover:bg-accent/90 h-10 px-4 py-2"
            >
              查看更多問題
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function Home({ events }: HomeProps) {
  // Get the date range for the "更多活動" button
  const startDate = getFirstDayOfCurrentMonth();
  
  return (
    <>
      <Head>
        <title>香港馬拉松活動 - Hong Kong Marathon Events</title>
        <meta name="description" content="探索香港最完整的跑步活動資訊平台。從馬拉松到越野跑，從初學者到專業選手，找到最適合你的跑步活動。" />
        <meta name="keywords" content="馬拉松, 香港, 跑步, 活動, 報名, 半程馬拉松, 10公里, 5公里, 越野跑" />
        <link rel="canonical" href="https://marathons.hk/" />
        
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
              <div className="mt-8 text-center">
                <Link 
                  href={`/events/?from=${startDate}`}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-accent text-accent-foreground hover:bg-accent/90 h-10 px-4 py-2"
                >
                  更多活動
                </Link>
              </div>
            </div>
          </div>
        </section>
        <AboutSection />
        <FAQSection />
      </main>
      
      <Footer />
    </>
  )
}

export async function getServerSideProps() {
  try {
    const startDate = getFirstDayOfCurrentMonth();
    const endDate = getLastDayOfNextMonth();
    const { data, error } = await supabase
      .from('marathons.hk')
      .select('id, event_name, event_date, event_category, distance, location, link, english_slug_base')
      .gte('event_date', startDate)
      .lte('event_date', endDate)
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

