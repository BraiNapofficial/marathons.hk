// SEO utilities for event pages

// Get event status based on date
export function getEventStatus(eventDate: string): string {
  const today = new Date();
  const event = new Date(eventDate);
  return event > today ? "https://schema.org/EventScheduled" : "https://schema.org/EventCompleted";
}

// Generate event description from database fields
export function generateEventDescription(event: {
  event_name: string;
  event_category: string;
  distance: string;
  location: string;
  event_date: string;
  event_description?: string | null;
}): string {
  // If we have fetched description, use it
  if (event.event_description) {
    return event.event_description;
  }
  
  // Otherwise generate from existing fields
  const categoryMap: Record<string, string> = {
    '越野': '越野跑',
    '路跑': '路跑賽',
    'HYROX': '健身越野賽',
    '樓梯': '爬樓賽'
  };
  
  const category = categoryMap[event.event_category] || event.event_category;
  return `${event.event_name} - ${category}活動，距離${event.distance}，地點${event.location}，日期${event.event_date}。立即報名參加這個精彩的跑步活動！`;
}

// Get event image (fallback to hero)
export function getEventImage(eventImageUrl?: string | null): string {
  const siteUrl = 'https://marathons.hk';
  if (eventImageUrl) {
    return `${siteUrl}${eventImageUrl}`;
  }
  return `${siteUrl}/hero-image.webp`;
}

// Derive organizer name from URL domain
export function deriveOrganizerFromUrl(url?: string | null): string | null {
  if (!url) return null;
  
  try {
    const domain = new URL(url).hostname.replace('www.', '');
    const domainMap: Record<string, string> = {
      'actionpanda3ballrun.com': 'Action Panda',
      'hyrox.com': 'HYROX',
      'bluemountainsports.hk': 'Blue Mountain Sports',
      'avohk.org': 'AVOHK',
      'chunghingwrc.com': 'Chung Hing WRC',
      'life-fever.com': 'Life Fever',
      'noracenogoal.com': 'No Race No Goal',
      'sdhhk.org': 'Southern District',
      'playaroundhk.com': 'Play Around',
      'wildtrekhk.com': 'Wild Trek',
      'luacharityrun2025.sportsoho.com': 'LUA Charity Run',
      'victoria162.hk': 'Victoria 162',
      'motorrun2025': 'Motor Run',
      'actionasiaevents.com': 'Action Asia Events',
      'outwardbound.org.hk': 'Outward Bound',
      'dark45.com': 'Dark 45',
      'hkaaa.com': 'Hong Kong AAA',
      'raleighwilsontrail.hk': 'Raleigh Wilson',
      'hongchi.org.hk': 'Hong Chi',
      'fishnsheep50.com': 'Fish N Sheep',
      'thetrailhub.com': 'The Trail Hub',
      'rundaevents.com': 'Runda Events',
      'sowers.hk': 'Sowers',
      'translantau.utmb.world': 'Translantau',
      'mizunohkrun.com': 'Mizuno Hong Kong',
      'pinkrun.hk': 'Pink Run',
      'streetathon.com': 'Hong Kong Streetathon',
      'oxfamtrailwalker.org.hk': 'Oxfam Trailwalker',
      'sephk.com': 'SEP',
      'salomon100.com': 'Salomon Hong Kong',
      'hkmarathon.com': 'Standard Chartered Hong Kong Marathon',
      'hike.greenpower.org.hk': 'Green Power',
      'run2gather.com': 'Run2Gather',
      'the9dragons.asia': 'The 9 Dragons',
      'hkmarathonpro.com': 'Hong Kong Marathon Pro'
    };
    return domainMap[domain] || null;
  } catch {
    return null;
  }
}

// Get organizer name from database or fallback to URL-derived name
export function getOrganizerName(organizerName?: string | null, url?: string | null): string {
  if (organizerName) return organizerName;
  const derived = deriveOrganizerFromUrl(url);
  return derived || '足•包 marathons.hk';
}

// Create SportsEvent JSON-LD
export function createSportsEventJsonLd(event: {
  id: string;
  event_name: string;
  event_date: string;
  event_category: string;
  distance: string;
  location: string;
  link?: string | null;
  event_description?: string | null;
  organizer_name?: string | null;
  image_url?: string | null;
  slug: string;
}) {
  const siteUrl = 'https://marathons.hk';
  const eventUrl = `${siteUrl}/events/${event.slug}/`;
  
  // Default times (can be enhanced later)
  const startDate = event.event_date + 'T06:00:00+08:00';
  const endDate = event.event_date + 'T18:00:00+08:00';
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    "name": event.event_name,
    "description": generateEventDescription(event),
    "startDate": startDate,
    "endDate": endDate,
    "location": {
      "@type": "Place",
      "name": event.location,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": event.location,
        "addressCountry": "HK"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": getOrganizerName(event.organizer_name, event.link),
      "url": event.link || siteUrl
    },
    "eventStatus": getEventStatus(event.event_date),
    "url": eventUrl,
    "image": getEventImage(event.image_url),
    "sport": "Running"
  };

  // Log warnings for missing critical fields
  if (!event.event_name) console.warn('[SEO] Missing event name for JSON-LD');
  if (!event.event_date) console.warn('[SEO] Missing event date for JSON-LD');
  if (!event.location) console.warn('[SEO] Missing event location for JSON-LD');
  if (!event.slug) console.warn('[SEO] Missing event slug for JSON-LD');
  
  return structuredData;
}

// Create OpenGraph and Twitter meta data
export function createEventMeta(event: {
  event_name: string;
  event_category: string;
  distance: string;
  event_description?: string | null;
  location: string;
  event_date: string;
  image_url?: string | null;
  slug: string;
}) {
  const siteUrl = 'https://marathons.hk';
  const eventUrl = `${siteUrl}/events/${event.slug}/`;
  const description = generateEventDescription(event);
  const image = getEventImage(event.image_url);
  
  // Log warnings for missing critical fields
  if (!event.event_name) console.warn('[SEO] Missing event name for meta');
  if (!event.location) console.warn('[SEO] Missing event location for meta');
  if (!event.slug) console.warn('[SEO] Missing event slug for meta');
  
  return {
    title: `${event.event_name} - 足•包 | marathons.hk`,
    description,
    url: eventUrl,
    image,
    imageAlt: `${event.event_name} - ${event.location} 活動圖片`,
    siteName: '足•包 marathons.hk',
    locale: 'zh_HK'
  };
}