// Event detail page types
export interface EventDetail {
  id: string;
  title_zh: string;
  date: string;
  time: string | null;
  location: string;
  category: string;
  distance: string | null;
  registration_url: string | null;
  organizer: string | null;
  description: string | null;
  image_url?: string;
  status: 'upcoming' | 'registration_open' | 'registration_closed' | 'completed' | 'cancelled';
  registration_deadline: string | null;
  max_participants: number | null;
  current_participants: number | null;
  slug: string;
}

export interface RelatedEvent {
  id: string;
  title_zh: string;
  date: string;
  location: string;
  category: string;
  distance: string | null;
  registration_url: string | null;
  slug: string;
}

// Props types
export interface EventPageProps {
  event: EventDetail;
  relatedEvents: RelatedEvent[];
}