import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '@screens/Splash';
import LoginScreen from '@screens/Login';
import TabNavigator from './TabNavigator';
import {SCREEN_NAMES} from './screenNames';
import {getAuthToken} from '@utils/asyncStorage';
import {useAppDispatch} from '@redux/hooks';
import {setAuthToken} from '@redux/reducer/commonReducer';
import type {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  const dispatch = useAppDispatch();
  const [initialRouteName, setInitialRouteName] = useState<keyof RootStackParamList | null>(
    null,
  );

  useEffect(() => {
    let isMounted = true;
    const checkToken = async () => {
      const token = await getAuthToken();
      if (isMounted && token) {
        dispatch(setAuthToken(token));
      }
      setTimeout(() => {
        if (!isMounted) {
          return;
        }
        setInitialRouteName(token ? SCREEN_NAMES.MainTabs : SCREEN_NAMES.Login);
      }, 1000);
    };
    checkToken();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  if (!initialRouteName) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{headerShown: false}}>
      <Stack.Screen name={SCREEN_NAMES.Login} component={LoginScreen} />
      <Stack.Screen name={SCREEN_NAMES.MainTabs} component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
