import Head from 'next/head';
import { GetServerSideProps } from 'next';
import EventsTable, { EventRow } from '@/components/EventsTable';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

type EventsPageProps = {
  events: EventRow[];
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

function normalizeDateParam(value: string | string[] | undefined): string | null {
  if (!value) return null;
  const v = (Array.isArray(value) ? value[0] : value).trim();
  // Accept explicit ISO YYYY-MM-DD straight through
  if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return v;
  // Accept DD/MM/YYYY and convert
  const ddmmyyyy = v.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (ddmmyyyy) {
    const [, dd, mm, yyyy] = ddmmyyyy;
    return `${yyyy}-${mm}-${dd}`;
  }
  // Fallback: try Date parsing, but if invalid, return null to use HK today
  const date = new Date(v);
  if (Number.isNaN(date.getTime())) return null;
  const yyyy = date.getFullYear();
  const mm = `${date.getMonth() + 1}`.padStart(2, '0');
  const dd = `${date.getDate()}`.padStart(2, '0');
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
  const category = normalizeStringParam(query.category);
  const q = normalizeStringParam(query.q);

  // Default to HK "today" for upcoming-only
  const from = normalizeDateParam(query.from) ?? hkTodayYYYYMMDD();

  // Build Supabase query against public."marathons.hk"
  let sb = supabase
    .from('marathons.hk')
    .select('id, event_name, event_date, event_category, distance, location, link')
    .gte('event_date', from)
    .order('event_date', { ascending: true });

  if (category) {
    sb = sb.eq('event_category', category);
  }

  if (q) {
    // Search by event_name or location (case-insensitive)
    sb = sb.or(`event_name.ilike.%${q}%,location.ilike.%${q}%`);
  }

  const { data, error } = await sb;

  if (error) {
    return {
      props: {
        events: [],
        category: category ?? null,
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
  }) => ({
    id: e.id,
    title_zh: e.event_name ?? '未命名活動',
    date: e.event_date, // Postgres DATE -> "YYYY-MM-DD"
    location: e.location ?? null,
    category: e.event_category ?? null,
    distance: e.distance ?? null,
    price_range: null,
    registration_url: e.link ?? null,
    slug: null,
  })) as EventRow[];

  return {
    props: {
      events,
      category: category ?? null,
      from,
      q: q ?? null,
    },
  };
};

export default function EventsPage({ events, category, from, q }: EventsPageProps) {
  const categories = ['全部分類', '馬拉松', '半程馬拉松', '10公里', '5公里', '越野跑'];

  return (
    <>
      <Head>
        <title>活動列表 - 足•包 | marathons.hk</title>
        <meta name="description" content="瀏覽香港馬拉松及跑步活動列表，支援分類、日期與關鍵字搜尋。" />
        <link rel="canonical" href="https://marathons.hk/events" />
      </Head>

      <main className="min-h-screen bg-background">
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <header className="mb-8 text-center">
                <h1 className="text-3xl md:text-4xl font-display text-foreground mb-3">活動列表</h1>
                <p className="text-muted-foreground">從今天開始的活動，支援分類與關鍵字搜尋</p>
              </header>

              <form method="get" className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-3">
                <div>
                  <label htmlFor="from" className="block text-sm text-muted-foreground mb-1">開始日期</label>
                  <input
                    id="from"
                    name="from"
                    type="date"
                    defaultValue={from ?? ''}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm text-muted-foreground mb-1">分類</label>
                  <select
                    id="category"
                    name="category"
                    defaultValue={category ?? ''}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  >
                    <option value="">全部分類</option>
                    {categories.slice(1).map((c) => (
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
                  >
                    重設
                  </Link>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-accent text-accent-foreground rounded-md text-sm hover:bg-accent/90"
                  >
                    篩選
                  </button>
                </div>
              </form>

              <EventsTable events={events} />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}