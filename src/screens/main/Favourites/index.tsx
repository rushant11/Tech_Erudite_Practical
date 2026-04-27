import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, Text, FlatList, StyleSheet, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ds, fs} from '@utils/responsive';
import EventCard from '@components/common/EventCard';
import type {EventCardItem} from '@components/common/EventCard';
import {EventCardSkeleton, favouritesScreenSkeletonKeys} from '@skeletons';
import {getFavouriteEventIds, setFavouriteEventIds} from '@utils/asyncStorage';
import {mapEventToCardItem} from '@utils/eventMapper';
import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {
  hydrateFavouriteEventIds,
  toggleFavouriteEventId,
} from '@redux/reducer/commonReducer';
import {useGetEventsQuery} from '@services/api/plieApi';
import type {ApiError} from '@services/api/client';

const REFRESH_INDICATOR_DURATION_MS = 800;

const formatQueryError = (e: unknown) => {
  if (e && typeof e === 'object' && 'message' in e) {
    return String((e as ApiError).message);
  }
  return 'Unable to load events';
};

const FavouritesScreen = () => {
  const dispatch = useAppDispatch();
  const authToken = useAppSelector(s => s.common.authToken);
  const favouriteEventIds = useAppSelector(state => state.common.favouriteEventIds);
  const hasHydratedFavourites = useAppSelector(
    state => state.common.hasHydratedFavourites,
  );
  const {
    data: apiEvents = [],
    isLoading,
    isError,
    error,
    isSuccess,
  } = useGetEventsQuery(undefined, {skip: !authToken});

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!authToken) {
      setErrorMessage('Please login first to load favourites');
      return;
    }
    if (isError) {
      setErrorMessage(formatQueryError(error));
    } else {
      setErrorMessage('');
    }
  }, [authToken, isError, error]);

  useEffect(() => {
    if (!isSuccess) {
      return;
    }
    const eventsResponse = apiEvents;
    void (async () => {
      const storedFavouriteIds = await getFavouriteEventIds();
      const apiFavouriteIds = eventsResponse
        .filter(event => event.isFavorite === 1)
        .map(event => event.event_date_id);
      const mergedFavouriteIds = Array.from(
        new Set([...storedFavouriteIds, ...apiFavouriteIds]),
      );
      dispatch(hydrateFavouriteEventIds(mergedFavouriteIds));
    })();
  }, [isSuccess, apiEvents, dispatch]);

  useEffect(() => {
    if (!hasHydratedFavourites) {
      return;
    }
    void setFavouriteEventIds(favouriteEventIds);
  }, [favouriteEventIds, hasHydratedFavourites]);

  const events = useMemo<EventCardItem[]>(
    () => apiEvents.map(event => mapEventToCardItem(event, favouriteEventIds)),
    [apiEvents, favouriteEventIds],
  );

  const toggleFavourite = (id: string) => {
    const selectedEvent = events.find(event => event.id === id);
    if (!selectedEvent) {
      return;
    }
    dispatch(toggleFavouriteEventId(selectedEvent.eventDateId));
  };

  const favourites = useMemo(
    () => events.filter(event => event.isFavourited),
    [events],
  );

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, REFRESH_INDICATOR_DURATION_MS);
  }, []);

  const listData: EventCardItem[] | {id: string}[] = isLoading
    ? favouritesScreenSkeletonKeys
    : favourites;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello Renzo!</Text>
        <Text style={styles.subtitle}>Are you ready to dance?</Text>
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      </View>
      <FlatList
        data={listData}
        keyExtractor={item => item.id}
        renderItem={({item}) =>
          isLoading ? (
            <EventCardSkeleton />
          ) : (
            <EventCard item={item as EventCardItem} onToggleFavourite={toggleFavourite} />
          )
        }
        ListEmptyComponent={
          isLoading ? null : (
            <View style={styles.emptyWrap}>
              <Text style={styles.emptyTitle}>No favourites yet</Text>
              <Text style={styles.emptySubtitle}>
                Tap the heart icon on any event to save it here
              </Text>
            </View>
          )
        }
        contentContainerStyle={styles.listContent}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        refreshing={isRefreshing && !isLoading}
        onRefresh={onRefresh}
      />
    </SafeAreaView>
  );
};

export default FavouritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: ds(16),
    paddingBottom: ds(24),
    flexGrow: 1,
  },
  header: {
    paddingTop: ds(20),
    paddingBottom: ds(16),
    paddingHorizontal: ds(16),
  },
  greeting: {
    fontSize: fs(24),
    fontWeight: '700',
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: fs(13),
    color: '#9CA3AF',
    marginTop: ds(4),
  },
  errorText: {
    marginTop: ds(10),
    fontSize: fs(12),
    color: '#EF4444',
  },
  emptyWrap: {
    paddingTop: ds(60),
    alignItems: 'center',
    paddingHorizontal: ds(24),
  },
  emptyTitle: {
    fontSize: fs(16),
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: ds(8),
  },
  emptySubtitle: {
    fontSize: fs(13),
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: fs(20),
  },
});
