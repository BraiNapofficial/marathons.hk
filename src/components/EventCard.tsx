import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Calendar, MapPin, Users, ExternalLink, Clock } from 'lucide-react';

interface EventCardProps {
  title_zh: string;
  date: string;
  location: string;
  category: string;
  distance: string;
  price: string;
  organizer: string;
  is_featured?: boolean;
  registration_url?: string;
}

const EventCard = ({ 
  title_zh, 
  date, 
  location, 
  category, 
  distance, 
  price, 
  organizer, 
  is_featured = false,
  registration_url 
}: EventCardProps) => {
  const categoryColors = {
    '馬拉松': 'bg-red-500',
    '半程馬拉松': 'bg-blue-500',
    '10公里': 'bg-green-500',
    '5公里': 'bg-yellow-500',
    '越野跑': 'bg-purple-500',
    '其他': 'bg-gray-500'
  };

  const categoryColor = categoryColors[category as keyof typeof categoryColors] || 'bg-gray-500';

  return (
    <Card className="bg-card border-border hover:border-accent/50 transition-all duration-300 card-hover group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            {is_featured && (
              <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
                精選活動
              </span>
            )}
            <span className={`${categoryColor} text-white text-xs px-2 py-1 rounded-full font-medium`}>
              {category}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
            {title_zh}
          </h3>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="w-4 h-4 text-accent" />
          <span className="text-sm">{date}</span>
        </div>
        
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4 text-accent" />
          <span className="text-sm">{location}</span>
        </div>
        
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4 text-accent" />
          <span className="text-sm">{distance}</span>
        </div>
        
        <div className="flex items-center gap-2 text-muted-foreground">
          <Users className="w-4 h-4 text-accent" />
          <span className="text-sm">主辦方：{organizer}</span>
        </div>
        
        <div className="pt-2">
          <span className="text-lg font-semibold text-accent">{price}</span>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-4">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 border-border hover:border-accent hover:bg-accent hover:text-accent-foreground"
        >
          查看詳情
        </Button>
        {registration_url && (
          <Button 
            size="sm" 
            className="bg-accent hover:bg-accent/90 text-white flex items-center gap-1"
            onClick={() => window.open(registration_url, '_blank')}
          >
            立即報名
            <ExternalLink className="w-3 h-3" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default EventCard;

