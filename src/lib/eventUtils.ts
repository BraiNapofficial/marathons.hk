// Event status types
export enum EventStatus {
  UPCOMING = 'upcoming',
  REGISTRATION_OPEN = 'registration_open', 
  REGISTRATION_CLOSED = 'registration_closed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

// Event categories
export enum EventCategory {
  MARATHON = '馬拉松',
  HALF_MARATHON = '半程馬拉松',
  TEN_K = '10公里',
  FIVE_K = '5公里',
  TRAIL_RUN = '越野跑',
  OTHER = '其他'
}

// Event regions
export enum EventRegion {
  HONG_KONG_ISLAND = '香港',
  KOWLOON = '九龍', 
  NEW_TERRITORIES = '新界',
  OUTLYING_ISLANDS = '離島'
}

export const formatEventDate = (date: string): string => {
  try {
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) return date;
    const fmt = new Intl.DateTimeFormat('zh-HK', {
      timeZone: 'Asia/Hong_Kong',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
    return fmt.format(d);
  } catch {
    return date;
  }
};

export const formatEventTime = (time: string): string => {
  if (!time) return '';
  try {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  } catch {
    return time;
  }
};

export const formatPrice = (price: number | null): string => {
  if (price === null || price === 0) return '免費';
  return `HK$${price.toLocaleString()}`;
};

export const formatDistance = (distance: string | null): string => {
  if (!distance) return '待定';
  return distance;
};