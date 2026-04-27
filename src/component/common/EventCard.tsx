import React, {useMemo, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Share,
} from 'react-native';
import {ArrowRight, Heart, ImageIcon, Share as ShareIcon} from 'lucide-react-native';
import {ds, fs} from '@utils/responsive';

export type EventCardItem = {
  id: string;
  eventDateId: number;
  title: string;
  dateRange: string;
  location: string;
  priceRange: string;
  tags: string[];
  imageUrl: string;
  isFavourited: boolean;
};

type Props = {
  item: EventCardItem;
  onToggleFavourite?: (id: string) => void;
};

const buildShareMessage = (event: EventCardItem) => {
  const lines = [
    event.title,
    `${event.dateRange} · ${event.location}`,
    event.priceRange,
  ];
  if (event.tags.length > 0) {
    lines.push(event.tags.join(', '));
  }
  if (event.imageUrl?.trim()) {
    lines.push(event.imageUrl.trim());
  }
  return lines.join('\n');
};

const EventCard = ({item, onToggleFavourite}: Props) => {
  const [hasImageError, setHasImageError] = useState(false);
  const imageUrl = useMemo(() => item.imageUrl?.trim() ?? '', [item.imageUrl]);
  const showFallbackImage = !imageUrl || hasImageError;

  const onShare = async () => {
    try {
      const message = buildShareMessage(item);
      await Share.share({
        message,
        title: item.title,
      });
    } catch {}
  };

  return (
    <View style={styles.card}>
      {showFallbackImage ? (
        <View style={[styles.thumb, styles.thumbFallback]}>
          <ImageIcon size={ds(24)} color="#B9BDC6" strokeWidth={1.8} />
        </View>
      ) : (
        <Image
          source={{uri: imageUrl}}
          style={styles.thumb}
          resizeMode="cover"
          onError={() => setHasImageError(true)}
        />
      )}
      <View style={styles.body}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <ArrowRight size={ds(18)} color="#2B2B2B" strokeWidth={2.2} />
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.dateText} numberOfLines={1}>
            {item.dateRange}
          </Text>
          <Text style={styles.locationText} numberOfLines={1}>
            {item.location}
          </Text>
        </View>

        <Text style={styles.price}>{item.priceRange}</Text>

        <View style={styles.footerRow}>
          <View style={styles.tagsWrap}>
            {item.tags.slice(0, 4).map(tag => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
          <View style={styles.actions}>
            <TouchableOpacity
              hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}
              onPress={onShare}
              activeOpacity={0.7}>
              <ShareIcon size={ds(18)} color="#666666" strokeWidth={1.8} />
            </TouchableOpacity>
            <TouchableOpacity
              hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}
              onPress={() => onToggleFavourite?.(item.id)}>
              <Heart
                size={ds(19)}
                color={item.isFavourited ? '#28C98B' : '#A4A4A4'}
                fill={item.isFavourited ? '#3CC868' : 'none'}
                strokeWidth={1.8}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: ds(14),
    marginBottom: ds(12),
    borderWidth: 1,
    borderColor: '#ECECEC',
    paddingVertical: ds(10),
    paddingHorizontal: ds(10),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: ds(1.5)},
    shadowOpacity: 0.03,
    shadowRadius: ds(3),
    elevation: 1,
  },
  thumb: {
    width: ds(86),
    height: ds(86),
    borderRadius: ds(10),
    backgroundColor: '#E5E7EB',
  },
  thumbFallback: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF0F4',
  },
  body: {
    flex: 1,
    paddingLeft: ds(12),
    paddingRight: ds(2),
    paddingVertical: ds(2),
    justifyContent: 'space-between',
    gap: ds(4),
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
    fontSize: fs(13),
    fontWeight: '800',
    color: '#1A1A1A',
    marginRight: ds(8),
    lineHeight: fs(18),
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontSize: fs(11),
    color: '#2DB55D',
    fontWeight: '600',
    flex: 1,
    marginRight: ds(6),
  },
  locationText: {
    fontSize: fs(10.5),
    color: '#9D9D9D',
    flexShrink: 0,
  },
  price: {
    fontSize: fs(12),
    fontWeight: '500',
    color: '#787878',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tagsWrap: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    gap: ds(6),
    marginRight: ds(10),
  },
  tag: {
    backgroundColor: '#EFF0F3',
    borderRadius: ds(13),
    paddingHorizontal: ds(9),
    paddingVertical: ds(3),
  },
  tagText: {
    fontSize: fs(9.5),
    color: '#646B75',
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ds(12),
  },
});
