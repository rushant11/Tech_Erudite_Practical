/** Default number of EventCard rows shown while a list is loading. */
export const EVENT_CARD_SKELETON_ROW_COUNT = 6;

export type EventCardSkeletonListItem = {id: string};

/**
 * Build stable keys for FlatList while showing EventCard skeleton rows.
 * @param idPrefix e.g. `'s'` → `s-0` …, `'skeleton'` → `skeleton-0` …
 */
export const createEventCardSkeletonKeys = (
  idPrefix: string,
  count: number = EVENT_CARD_SKELETON_ROW_COUNT,
): EventCardSkeletonListItem[] =>
  Array.from({length: count}, (_, i) => ({id: `${idPrefix}-${i}`}));
