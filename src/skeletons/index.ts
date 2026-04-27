import {createEventCardSkeletonKeys} from './placeholders';

export {default as EventCardSkeleton} from './EventCardSkeleton';
export {
  EVENT_CARD_SKELETON_ROW_COUNT,
  createEventCardSkeletonKeys,
} from './placeholders';
export type {EventCardSkeletonListItem} from './placeholders';

export const eventsScreenSkeletonKeys = createEventCardSkeletonKeys('s');
export const favouritesScreenSkeletonKeys = createEventCardSkeletonKeys('skeleton');
