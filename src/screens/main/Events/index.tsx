import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {View, Text, FlatList, StyleSheet, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ds, fs} from '@utils/responsive';
import {colors} from '@theme/colors';
import EventCard from '@components/common/EventCard';
import type {EventCardItem} from '@components/common/EventCard';
import {EventCardSkeleton, eventsScreenSkeletonKeys} from '@skeletons';
import {getFavouriteEventIds, setFavouriteEventIds} from '@utils/asyncStorage';
import {mapEventToCardItem} from '@utils/eventMapper';
import {useAppDispatch, useAppSelector} from '@redux/hooks';
import {
  hydrateFavouriteEventIds,
  toggleFavouriteEventId,
} from '@redux/reducer/commonReducer';
import {useGetEventsQuery} from '@services/api/plieApi';
import type {ApiError} from '@services/api/client';

const formatQueryError = (e: unknown) => {
  if (e && typeof e === 'object' && 'message' in e) {
    return String((e as ApiError).message);
  }
  return 'Unable to load events';
};

const EventsScreen = () => {
  const dispatch = useAppDispatch();
  const authToken = useAppSelector(s => s.common.authToken);
  const savedIds = useAppSelector(s => s.common.favouriteEventIds);
  const favouritesReady = useAppSelector(s => s.common.hasHydratedFavourites);
  const {
    data: fetched = [],
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
    refetch,
  } = useGetEventsQuery(undefined, {skip: !authToken});

  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    if (!authToken) {
      setErrMsg('Please login first to load events');
      return;
    }
    if (isError) {
      setErrMsg(formatQueryError(error));
    } else {
      setErrMsg('');
    }
  }, [authToken, isError, error]);

  useEffect(() => {
    if (!isSuccess) {
      return;
    }
    const list = fetched;
    void (async () => {
      const fromApi = list.filter(e => e.isFavorite === 1).map(e => e.event_date_id);
      const fromDisk = await getFavouriteEventIds();
      const combined = Array.from(new Set([...fromDisk, ...fromApi]));
      dispatch(hydrateFavouriteEventIds(combined));
    })();
  }, [isSuccess, fetched, dispatch]);

  useEffect(() => {
    if (!favouritesReady) {
      return;
    }
    void setFavouriteEventIds(savedIds);
  }, [savedIds, favouritesReady]);

  const items = useMemo(
    () => fetched.map(e => mapEventToCardItem(e, savedIds)),
    [fetched, savedIds],
  );

  const onHeart = (id: string) => {
    const row = items.find(x => x.id === id);
    if (!row) {
      return;
    }
    dispatch(toggleFavouriteEventId(row.eventDateId));
  };

  const handleRefresh = useCallback(() => {
    void refetch();
  }, [refetch]);

  const loading = isLoading;
  const data = loading ? eventsScreenSkeletonKeys : items;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello Renzo!</Text>
        <Text style={styles.subtitle}>Are you ready to dance?</Text>
        {errMsg ? <Text style={styles.errorText}>{errMsg}</Text> : null}
      </View>
      <FlatList
        data={data}
        keyExtractor={r => r.id}
        renderItem={({item}) =>
          loading ? (
            <EventCardSkeleton />
          ) : (
            <EventCard item={item as EventCardItem} onToggleFavourite={onHeart} />
          )
        }
        ListEmptyComponent={
          loading ? null : (
            <View style={styles.emptyWrap}>
              <Text style={styles.emptyText}>No events available right now</Text>
            </View>
          )
        }
        contentContainerStyle={styles.listContent}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        refreshing={isFetching && !isLoading}
        onRefresh={handleRefresh}
      />
    </SafeAreaView>
  );
};

export default EventsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: fs(13),
    color: colors.textMuted,
    marginTop: ds(4),
  },
  errorText: {
    marginTop: ds(10),
    fontSize: fs(12),
    color: colors.error,
  },
  emptyWrap: {
    paddingTop: ds(50),
    alignItems: 'center',
  },
  emptyText: {
    fontSize: fs(13),
    color: colors.textMuted,
  },
});
