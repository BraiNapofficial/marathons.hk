import React from 'react';
import Link from 'next/link';

export type EventRow = {
  id: string;
  title_zh: string;
  date: string; // ISO date string
  location?: string | null;
  category?: string | null;
  distance?: string | null;
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
    
    // Custom month abbreviations to ensure 3-letter format
    const monthAbbrs = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    
    const day = d.getDate().toString().padStart(2, '0'); // Ensure 2-digit day
    const month = monthAbbrs[d.getMonth()];
    const year = d.getFullYear();
    
    // Render as "01 Aug 2025" on desktop
    const desktopFormat = `${day} ${month} ${year}`;
    
    // Render as "01 Aug\n2025" on mobile
    return (
      <>
        <span className="hidden sm:inline">{desktopFormat}</span>
        <span className="sm:hidden">
          <span>{day} {month}</span>
          <br />
          <span className="block text-right">{year}</span>
        </span>
      </>
    );
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
      <table className="w-full border-collapse text-sm table-fixed">
        <thead className="bg-muted/50 sticky top-0">
          <tr>
            <th scope="col" className="px-2 py-2 sm:px-3 sm:py-3 text-left font-semibold text-foreground w-[100px] sm:w-[120px]">日期</th>
            <th scope="col" className="px-2 py-2 sm:px-3 sm:py-3 text-left font-semibold text-foreground">活動名稱</th>
            <th scope="col" className="px-2 py-2 sm:px-3 sm:py-3 text-left font-semibold text-foreground hidden sm:table-cell w-[80px] sm:w-[100px]">分類</th>
            <th scope="col" className="px-2 py-2 sm:px-3 sm:py-3 text-left font-semibold text-foreground hidden lg:table-cell w-[80px] sm:w-[100px]">距離</th>
            <th scope="col" className="px-2 py-2 sm:px-3 sm:py-3 text-left font-semibold text-foreground hidden sm:table-cell w-[120px] sm:w-[150px]">地點</th>
            <th scope="col" className="px-2 py-2 sm:px-3 sm:py-3 text-left font-semibold text-foreground w-24 sm:w-28"></th>
          </tr>
        </thead>
        <tbody>
          {events.map((e) => (
            <tr key={e.id} className="border-t border-border hover:bg-muted/30">
              <td className="px-2 py-2 sm:px-3 sm:py-3 align-middle whitespace-nowrap text-sm">{formatDate(e.date)}</td>
              <td className="px-2 py-2 sm:px-3 sm:py-3 align-middle">
                {e.slug ? (
                  <Link
                    href={`/events/${e.slug}/`}
                    className="font-medium text-foreground text-sm sm:text-base hover:text-accent hover:underline transition-colors"
                    aria-label={`查看 ${e.title_zh || '未命名活動'} 詳情`}
                  >
                    {e.title_zh || '未命名活動'}
                  </Link>
                ) : (
                  <div className="font-medium text-foreground text-sm sm:text-base" title="詳情即將推出">
                    {e.title_zh || '未命名活動'}
                  </div>
                )}
                <div className="mt-1 sm:hidden text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="whitespace-nowrap">{e.category || '其他'}</span>
                    <span>•</span>
                    <span className="truncate">{e.location || '—'}</span>
                  </div>
                </div>
              </td>
              <td className="px-2 py-2 sm:px-3 sm:py-3 align-middle hidden sm:table-cell text-sm">{e.category || '其他'}</td>
              <td className="px-2 py-2 sm:px-3 sm:py-3 align-middle hidden lg:table-cell text-muted-foreground text-sm">{e.distance || '—'}</td>
              <td className="px-2 py-2 sm:px-3 sm:py-3 align-middle hidden sm:table-cell text-muted-foreground text-sm">{e.location || '—'}</td>
              <td className="px-2 py-2 sm:px-3 sm:py-3 align-middle">
                {e.registration_url ? (
                  <div className="w-full flex items-center justify-end">
                    <a
                      href={e.registration_url}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center justify-center rounded-md border border-accent text-accent hover:bg-accent hover:text-accent-foreground px-1.5 py-0.5 sm:px-3 sm:py-1.5 text-[0.65rem] sm:text-sm transition-colors"
                    >
                      立即報名
                    </a>
                  </div>
                ) : (
                  <div className="w-full flex items-center justify-end">
                    <span className="text-muted-foreground text-sm">—</span>
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
