export const SCREEN_NAMES = {
  Splash: 'Splash',
  Login: 'Login',
  MainTabs: 'MainTabs',
  Search: 'Search',
  Events: 'Events',
  Favourites: 'Favourites',
  Profile: 'Profile',
} as const;

export type ScreenName = (typeof SCREEN_NAMES)[keyof typeof SCREEN_NAMES];
