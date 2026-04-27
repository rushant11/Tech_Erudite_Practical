import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Search</Text>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
