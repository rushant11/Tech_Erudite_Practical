import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ds} from '@utils/responsive';

const boneColor = '#E5E7EB';
const boneRadius = ds(4);

const EventCardSkeleton = () => {
  return (
    <View style={styles.card} accessibilityRole="none" accessibilityState={{busy: true}}>
      <View style={styles.thumb} />
      <View style={styles.body}>
        <View style={styles.titleRow}>
          <View style={styles.titleBar} />
          <View style={styles.arrowBlock} />
        </View>
        <View style={styles.metaRow}>
          <View style={styles.dateBar} />
          <View style={styles.locationBar} />
        </View>
        <View style={styles.priceBar} />
        <View style={styles.footerRow}>
          <View style={styles.tagsWrap}>
            <View style={styles.tag} />
            <View style={styles.tag} />
            <View style={styles.tag} />
          </View>
          <View style={styles.actions}>
            <View style={styles.iconDot} />
            <View style={styles.iconDot} />
          </View>
        </View>
      </View>
    </View>
  );
};

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
    backgroundColor: boneColor,
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
  titleBar: {
    flex: 1,
    height: ds(14),
    borderRadius: boneRadius,
    backgroundColor: boneColor,
    marginRight: ds(8),
  },
  arrowBlock: {
    width: ds(18),
    height: ds(18),
    borderRadius: boneRadius,
    backgroundColor: boneColor,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: ds(6),
  },
  dateBar: {
    flex: 1,
    height: ds(10),
    borderRadius: boneRadius,
    backgroundColor: boneColor,
    marginRight: ds(6),
    maxWidth: ds(120),
  },
  locationBar: {
    width: ds(78),
    height: ds(10),
    borderRadius: boneRadius,
    backgroundColor: boneColor,
  },
  priceBar: {
    width: ds(52),
    height: ds(12),
    borderRadius: boneRadius,
    backgroundColor: boneColor,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tagsWrap: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: ds(6),
    marginRight: ds(10),
  },
  tag: {
    width: ds(48),
    height: ds(20),
    borderRadius: ds(13),
    backgroundColor: boneColor,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ds(12),
  },
  iconDot: {
    width: ds(18),
    height: ds(18),
    borderRadius: ds(4),
    backgroundColor: boneColor,
  },
});

export default EventCardSkeleton;
