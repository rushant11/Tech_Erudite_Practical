import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  FAVOURITE_EVENT_IDS: 'favourite_event_ids',
};

export const setAuthToken = async (token: string) => {
  await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
};

export const getAuthToken = async () => {
  return AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
};

export const clearAuthToken = async () => {
  await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
};

export const getFavouriteEventIds = async () => {
  const rawValue = await AsyncStorage.getItem(STORAGE_KEYS.FAVOURITE_EVENT_IDS);
  if (!rawValue) {
    return [] as number[];
  }
  try {
    const parsed = JSON.parse(rawValue);
    if (Array.isArray(parsed)) {
      return parsed as number[];
    }
    return [] as number[];
  } catch {
    return [] as number[];
  }
};

export const setFavouriteEventIds = async (ids: number[]) => {
  await AsyncStorage.setItem(STORAGE_KEYS.FAVOURITE_EVENT_IDS, JSON.stringify(ids));
};
