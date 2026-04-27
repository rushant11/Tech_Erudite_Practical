import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ds, fs} from '@utils/responsive';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>TechErudite</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: fs(44),
    fontWeight: '800',
    color: '#1A1A1A',
    letterSpacing: ds(0.8),
  },
});
