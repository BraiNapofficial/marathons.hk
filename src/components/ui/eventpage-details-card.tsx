import React from 'react';
import { EventDetail } from '@/types/event';

interface EventDetailsCardProps {
  event: EventDetail;
}

/**
 * Category + Distance design:
 * - Category: colored solid pill (left icon)
 * - Distance: neutral outlined/soft pill (left icon)
 * - Keep the same font size as surrounding text; use py-2 (8px) vertical padding
 */
const EventDetailsCard: React.FC<EventDetailsCardProps> = () => {

  return (
    <div className="space-y-6">
      {/* Placeholder for Event Description and Information (uncomment when content available) */}
      {/*
        1. Event Description (活動詳情)
        2. Event Information (活動資訊)
      */}
    </div>
  );
};

export default EventDetailsCard;