import { EventDetail, RelatedEvent } from '@/types/event';

// Mock data for individual event page
export const mockRootProps = {
  event: {
    id: "1",
    title_zh: "香港馬拉松2025",
    date: "2025-02-09",
    time: "06:00",
    location: "尖沙咀文化中心",
    category: "馬拉松" as const,
    distance: "42.195公里",
    price: 680,
    registration_url: "https://example.com/register",
    organizer: "香港業餘田徑總會",
    description: "香港最具規模的馬拉松賽事，吸引來自世界各地的跑者參與。路線經過香港多個著名地標，是體驗香港城市風光的最佳方式。",
    image_url: "/hero-image.webp",
    status: "registration_open" as const,
    registration_deadline: "2025-01-15",
    max_participants: 37000,
    current_participants: 28500,
    slug: "hong-kong-marathon-2025-20250209"
  } as EventDetail,
  relatedEvents: [
    {
      id: "2", 
      title_zh: "香港半程馬拉松",
      date: "2025-03-16",
      location: "沙田",
      category: "半程馬拉松" as const,
      distance: "21.1公里",
      registration_url: "https://example.com/register2",
      slug: "hong-kong-half-marathon-20250316"
    },
    {
      id: "3",
      title_zh: "維港10公里跑",
      date: "2025-04-20", 
      location: "中環",
      category: "10公里" as const,
      distance: "10公里",
      registration_url: "https://example.com/register3",
      slug: "victoria-harbour-10k-20250420"
    }
  ] as RelatedEvent[]
};