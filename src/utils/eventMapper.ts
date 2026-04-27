import type {EventListingApiItem} from '@api/dashboardApi';
import type {EventCardItem} from '@components/common/EventCard';

export const formatPrice = (from: number, to: number) => {
  if (from > 0 && to > 0) {
    return `€${from} - €${to}`;
  }
  if (from > 0) {
    return `€${from}`;
  }
  if (to > 0) {
    return `€${to}`;
  }
  return 'Free';
};

export const mapEventToCardItem = (
  event: EventListingApiItem,
  favouriteEventDateIds: number[],
): EventCardItem => {
  const styleTags = event.danceStyles.map(style => style.ds_name);
  const fallbackTags = event.keywords ?? [];
  const tags = styleTags.length > 0 ? styleTags : fallbackTags;
  const readableDate = event.readable_to_date
    ? `${event.readable_from_date} - ${event.readable_to_date}`
    : event.readable_from_date;
  return {
    id: `${event.event_id}-${event.event_date_id}`,
    eventDateId: event.event_date_id,
    title: event.event_name,
    dateRange: readableDate || '-',
    location: `${event.city}, ${event.country}`,
    priceRange: formatPrice(event.event_price_from, event.event_price_to),
    tags,
    imageUrl: event.event_profile_img,
    isFavourited:
      favouriteEventDateIds.includes(event.event_date_id) || event.isFavorite === 1,
  };
};
