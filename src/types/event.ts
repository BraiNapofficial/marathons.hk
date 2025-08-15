// Event detail page types
export interface EventDetail {
  id: string;
  title_zh: string;
  date: string;
  time?: string;
  location: string;
  category: string;
  distance?: string;
  price?: number;
  registration_url?: string;
  organizer?: string;
  description?: string;
  image_url?: string;
  status: 'upcoming' | 'registration_open' | 'registration_closed' | 'completed' | 'cancelled';
  registration_deadline?: string;
  max_participants?: number;
  current_participants?: number;
  slug: string;
}

export interface RelatedEvent {
  id: string;
  title_zh: string;
  date: string;
  location: string;
  category: string;
  distance?: string;
  registration_url?: string;
  slug: string;
}

// Props types
export interface EventPageProps {
  event: EventDetail;
  relatedEvents: RelatedEvent[];
}