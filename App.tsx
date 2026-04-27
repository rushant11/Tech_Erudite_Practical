import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootContainer from '@navigation/RootContainer';
import {store} from '@store/index';
import { colors } from '@theme/colors';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <RootContainer />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
