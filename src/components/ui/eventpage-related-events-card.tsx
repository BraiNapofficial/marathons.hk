import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RelatedEvent } from '@/types/event';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

interface RelatedEventsCardProps {
  events: RelatedEvent[];
}

const RelatedEventsCard: React.FC<RelatedEventsCardProps> = ({ events }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-HK', {
      month: 'short',
      day: 'numeric'
    });
  };

  if (!events.length) {
    return (
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground">相關活動</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">暫無相關活動</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-effect border-border/50">
      <CardHeader>
        <CardTitle className="text-foreground">相關活動</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="border border-border/30 rounded-lg p-4 hover:bg-muted/20 transition-colors">
              <div className="flex flex-col gap-2">
                {event.slug ? (
                  <Link href={`/events/${event.slug}/`} aria-label={`查看 ${event.title_zh} 詳情`}>
                    <h4 className="font-semibold text-foreground text-sm leading-tight hover:text-accent transition-colors">
                      {event.title_zh}
                    </h4>
                  </Link>
                ) : (
                  <h4 className="font-semibold text-foreground text-sm leading-tight" title="詳情即將推出">
                    {event.title_zh}
                  </h4>
                )}
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs py-1 bg-accent/10 text-accent rounded">
                    {event.category}
                  </span>
                  
                  {event.registration_url && (
                    <a
                      href={event.registration_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-accent hover:text-accent/80 flex items-center gap-1"
                    >
                      報名
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-border/30">
          <Link href="/events">
            <Button variant="outline" size="sm" className="w-full">
              查看更多活動
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default RelatedEventsCard;