import React from 'react';

export type EventRow = {
  id: string;
  title_zh: string;
  date: string; // ISO date string
  location?: string | null;
  category?: string | null;
  distance?: string | null;
  price_range?: string | null;
  registration_url?: string | null;
  status?: string | null; // optional derived field if available later
  slug?: string | null;
};

type Props = {
  events: EventRow[];
};

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    // Render as "17 Aug 2025" in HK time
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Hong_Kong',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
    // Intl with en-GB gives format like "17 Aug 2025"
    return fmt.format(d).replace(',', '');
  } catch {
    return iso;
  }
}

const EventsTable: React.FC<Props> = ({ events }) => {
  if (!events?.length) {
    return (
      <div className="w-full text-center text-muted-foreground py-8">
        目前沒有符合條件的活動
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-md border border-border shadow-sm">
      <table className="w-full border-collapse text-sm md:text-base">
        <thead className="bg-muted/50 sticky top-0">
          <tr>
            <th scope="col" className="px-3 py-3 text-left font-semibold text-foreground">日期</th>
            <th scope="col" className="px-3 py-3 text-left font-semibold text-foreground">活動名稱</th>
            <th scope="col" className="px-3 py-3 text-left font-semibold text-foreground hidden md:table-cell">分類</th>
            <th scope="col" className="px-3 py-3 text-left font-semibold text-foreground hidden lg:table-cell">距離</th>
            <th scope="col" className="px-3 py-3 text-left font-semibold text-foreground hidden md:table-cell">地點</th>
            <th scope="col" className="px-3 py-3 text-left font-semibold text-foreground w-28"></th>
          </tr>
        </thead>
        <tbody>
          {events.map((e) => (
            <tr key={e.id} className="border-t border-border hover:bg-muted/30">
              <td className="px-3 py-3 align-middle whitespace-nowrap">{formatDate(e.date)}</td>
              <td className="px-3 py-3 align-middle">
                <div className="font-medium text-foreground">{e.title_zh || '未命名活動'}</div>
                <div className="mt-1 flex gap-2 md:hidden text-xs text-muted-foreground">
                  <span>{e.category || '其他'}</span>
                  <span>•</span>
                  <span>{e.location || '—'}</span>
                </div>
              </td>
              <td className="px-3 py-3 align-middle hidden md:table-cell">{e.category || '其他'}</td>
              <td className="px-3 py-3 align-middle hidden lg:table-cell text-muted-foreground">{e.distance || '—'}</td>
              <td className="px-3 py-3 align-middle hidden md:table-cell text-muted-foreground">{e.location || '—'}</td>
              <td className="px-3 py-3 align-middle">
                {e.registration_url ? (
                  <div className="w-full flex items-center justify-end">
                    <a
                      href={e.registration_url}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center justify-center rounded-md border border-accent text-accent hover:bg-accent hover:text-accent-foreground px-3 py-1.5 text-sm transition-colors"
                    >
                      立即報名
                    </a>
                  </div>
                ) : (
                  <div className="w-full flex items-center justify-end">
                    <span className="text-muted-foreground">—</span>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventsTable;