import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EventDetail } from '@/types/event';
import { formatPrice } from '@/lib/eventUtils';
import { DollarSign, Users, Building, Calendar } from 'lucide-react';

interface EventDetailsCardProps {
  event: EventDetail;
}

const EventDetailsCard: React.FC<EventDetailsCardProps> = ({ event }) => {
  return (
    <div className="space-y-6">
      {/* Event Description */}
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground">活動詳情</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            {event.description || '暫無描述'}
          </p>
        </CardContent>
      </Card>

      {/* Event Metadata */}
      <Card className="glass-effect border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground">活動資訊</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">報名費用</p>
                <p className="font-semibold text-foreground">{formatPrice(event.price)}</p>
              </div>
            </div>

            {/* Organizer */}
            {event.organizer && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Building className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">主辦單位</p>
                  <p className="font-semibold text-foreground">{event.organizer}</p>
                </div>
              </div>
            )}

            {/* Participants */}
            {event.max_participants && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">參加人數</p>
                  <p className="font-semibold text-foreground">
                    {event.current_participants ? `${event.current_participants.toLocaleString()} / ` : ''}
                    {event.max_participants.toLocaleString()}
                  </p>
                </div>
              </div>
            )}

            {/* Registration Deadline */}
            {event.registration_deadline && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">報名截止</p>
                  <p className="font-semibold text-foreground">
                    {new Date(event.registration_deadline).toLocaleDateString('zh-HK')}
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EventDetailsCard;