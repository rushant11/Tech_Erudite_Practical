export type EventListingApiItem = {
  event_id: number;
  event_date_id: number;
  event_name: string;
  description: string;
  event_profile_img: string;
  event_price_from: number;
  event_price_to: number;
  readable_from_date: string;
  readable_to_date: string;
  isFavorite: number;
  city: string;
  country: string;
  keywords: string[];
  danceStyles: Array<{ds_id: number; ds_name: string}>;
};
