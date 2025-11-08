import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import EventsTable, { EventRow } from '@/components/EventsTable';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import BackButton from '@/components/ui/back-button';

type EventsPageProps = {
  events: EventRow[];
  categories: string[];
  category: string | null;
  from: string | null;
  q: string | null;
};

function hkTodayYYYYMMDD() {
  const now = new Date();
  const hk = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Hong_Kong' }));
  const yyyy = hk.getFullYear();
  const mm = `${hk.getMonth() + 1}`.padStart(2, '0');
  const dd = `${hk.getDate()}`.padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function normalizeStringParam(value: string | string[] | undefined): string | null {
  if (!value) return null;
  const v = Array.isArray(value) ? value[0] : value;
  const trimmed = v.trim();
  return trimmed.length ? trimmed : null;
}

export const getServerSideProps: GetServerSideProps<EventsPageProps> = async (ctx) => {
  const { query } = ctx;
  const q = normalizeStringParam(query.q);
  const fromParam = normalizeStringParam(query.from);

  // Validate and use the from parameter, or default to today
  let from = hkTodayYYYYMMDD();
  if (fromParam) {
    // Validate YYYY-MM-DD format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (dateRegex.test(fromParam)) {
      const parsedDate = new Date(fromParam);
      if (!isNaN(parsedDate.getTime())) {
        from = fromParam;
      }
    }
  }

  // Fetch only future events from the specified date
  let sb = supabase
    .from('marathons.hk')
    .select('id, event_name, event_date, event_category, distance, location, link, english_slug_base')
    .gte('event_date', from)
    .order('event_date', { ascending: true });

  // Apply search filter server-side (if provided)
  if (q) {
    const sanitizedQ = q.replace(/([\\%_])/g, '\\$1');
    sb = sb.or(`event_name.ilike.%${sanitizedQ}%,location.ilike.%${sanitizedQ}%`);
  }

  const { data, error } = await sb;

  if (error) {
    return {
      props: {
        events: [],
        categories: [],
        category: normalizeStringParam(query.category) ?? null,
        from,
        q: q ?? null,
      },
    };
  }

  const events = (data || []).map((e: {
    id: string | number;
    event_name?: string;
    event_date: string;
    location?: string;
    event_category?: string;
    distance?: string;
    link?: string;
    english_slug_base?: string;
  }) => ({
    id: String(e.id),
    title_zh: e.event_name ?? '未命名活動',
    date: e.event_date,
    location: e.location ?? null,
    category: e.event_category ?? null,
    distance: e.distance ?? null,
    registration_url: e.link ?? null,
    slug: e.english_slug_base ?? null,
  })) as EventRow[];

  // Get categories from future events only
  const uniqueCategories = Array.from(new Set(
    events.map(e => e.category).filter((cat): cat is string => Boolean(cat))
  ));

  return {
    props: {
      events,
      categories: uniqueCategories,
      category: normalizeStringParam(query.category) ?? null,
      from,
      q: q ?? null,
    },
  };
};

export default function EventsPage({ events, categories = [], category, q }: EventsPageProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(category || '');
  const [selectedFrom, setSelectedFrom] = useState(hkTodayYYYYMMDD()); // Reset to today on every load

  // Hybrid: server-provided events + client-side instant filtering
  const filteredEvents = useMemo(() => {
    let base = events;
    // Apply date filter client-side
    if (selectedFrom) {
      base = base.filter(event => event.date >= selectedFrom);
    }
    // Apply category filter client-side
    if (selectedCategory) {
      base = base.filter(event => event.category === selectedCategory);
    }
    return base;
  }, [events, selectedCategory, selectedFrom]);

  // Handle category change with instant filtering and URL update
  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory);
    
    // Update URL without page reload (shallow routing)
    const params = new URLSearchParams();
    if (newCategory) params.set('category', newCategory);
    if (q) params.set('q', q);
    if (selectedFrom) params.set('from', selectedFrom);
    
    const url = `/events${params.toString() ? `?${params.toString()}` : ''}`;
    
    // Use try-catch to handle potential router issues
    try {
      router.push(url, undefined, { shallow: true });
    } catch (error) {
      console.warn('Router navigation failed:', error);
    }
  };

  // Handle date change with instant filtering and URL update
  const handleFromChange = (newFrom: string) => {
    setSelectedFrom(newFrom);
    
    // Update URL without page reload (shallow routing)
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    if (q) params.set('q', q);
    if (newFrom) params.set('from', newFrom);
    
    const url = `/events${params.toString() ? `?${params.toString()}` : ''}`;
    
    // Use try-catch to handle potential router issues
    try {
      router.push(url, undefined, { shallow: true });
    } catch (error) {
      console.warn('Router navigation failed:', error);
    }
  };

  return (
    <>
      <Head>
        <title>活動列表 - 足•包 | marathons.hk</title>
        <meta name="description" content="瀏覽香港馬拉松及跑步活動列表，支援分類、日期與關鍵字搜尋。" />
        <link rel="canonical" href="https://marathons.hk/events/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://marathons.hk/events/" />
        <meta property="og:title" content="活動列表 - 足•包 | marathons.hk" />
        <meta property="og:description" content="瀏覽香港馬拉松及跑步活動列表，支援分類、日期與關鍵字搜尋。" />
        <meta property="og:image" content="https://marathons.hk/hero-image.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="足•包 - 香港馬拉松活動列表頁面" />
        <meta property="og:site_name" content="足•包 marathons.hk" />
        <meta property="og:locale" content="zh_HK" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://marathons.hk/events/" />
        <meta name="twitter:title" content="活動列表 - 足•包 | marathons.hk" />
        <meta name="twitter:description" content="瀏覽香港馬拉松及跑步活動列表，支援分類、日期與關鍵字搜尋。" />
        <meta name="twitter:image" content="https://marathons.hk/hero-image.webp" />
        <meta name="twitter:image:alt" content="足•包 - 香港馬拉松活動列表頁面" />
        <meta name="twitter:domain" content="marathons.hk" />
        {/* Add your Twitter handle here when available */}
        {/* <meta name="twitter:site" content="@yourusername" /> */}
        {/* <meta name="twitter:creator" content="@yourusername" /> */}
      </Head>

      <main className="min-h-screen bg-background">
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <header className="mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-display text-foreground mb-3">活動列表</h1>
                <p className="text-muted-foreground">從今天開始的活動，支援分類與關鍵字搜尋</p>
              </header>

              <form method="get" className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-3">
                <div>
                  <label htmlFor="from" className="block text-sm text-muted-foreground mb-1">開始日期</label>
                  <input
                    id="from"
                    name="from"
                    type="date"
                    value={selectedFrom}
                    onChange={(e) => handleFromChange(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground [color-scheme:dark]"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm text-muted-foreground mb-1">分類</label>
                  <select
                    id="category"
                    name="category"
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  >
                    <option value="">全部分類</option>
                    {(categories || []).map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="q" className="block text-sm text-muted-foreground mb-1">關鍵字 (活動/地點)</label>
                  <input
                    id="q"
                    name="q"
                    type="text"
                    defaultValue={q ?? ''}
                    placeholder="例如：尖沙咀 / 馬拉松"
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  />
                </div>

                <div className="md:col-span-4 flex justify-end gap-3">
                  <Link
                    href="/events"
                    className="px-4 py-2 border border-border rounded-md text-sm hover:bg-muted"
                    onClick={() => {
                      setSelectedFrom(hkTodayYYYYMMDD());
                      setSelectedCategory('');
                    }}
                  >
                    重設
                  </Link>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-border rounded-md text-sm hover:bg-muted"
                  >
                    搜尋
                  </button>
                </div>
              </form>

              <div className="relative">
                <EventsTable events={filteredEvents} />
              </div>
              <BackButton />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}