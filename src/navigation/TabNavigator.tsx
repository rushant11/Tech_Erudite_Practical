import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CalendarDays, Heart, Search, UserRound} from 'lucide-react-native';
import SearchScreen from '@screens/Search';
import EventsScreen from '@screens/Events';
import FavouritesScreen from '@screens/Favourites';
import ProfileScreen from '@screens/Profile';
import {SCREEN_NAMES} from './screenNames';
import {ds, fs} from '@utils/responsive';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={SCREEN_NAMES.Events}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: '#111111',
        tabBarInactiveTintColor: '#A0A0A0',
        tabBarStyle: {
          height: ds(90),
          paddingTop: ds(10),
          paddingBottom: ds(10),
          borderTopColor: '#EAEAEA',
          borderTopWidth: 1,
          backgroundColor: '#FFFFFF',
        },
        tabBarLabelStyle: {
          fontSize: fs(12),
          marginTop: ds(2),
        },
        tabBarIcon: ({color, size}) => {
          const iconSize = Math.max(size - 1, ds(17));
          if (route.name === SCREEN_NAMES.Search) {
            return <Search size={iconSize} color={color} />;
          }
          if (route.name === SCREEN_NAMES.Events) {
            return <CalendarDays size={iconSize} color={color} />;
          }
          if (route.name === SCREEN_NAMES.Favourites) {
            return <Heart size={iconSize} color={color} />;
          }
          return <UserRound size={iconSize} color={color} />;
        },
      })}>
      <Tab.Screen name={SCREEN_NAMES.Search} component={SearchScreen} />
      <Tab.Screen name={SCREEN_NAMES.Events} component={EventsScreen} />
      <Tab.Screen name={SCREEN_NAMES.Favourites} component={FavouritesScreen} />
      <Tab.Screen name={SCREEN_NAMES.Profile} component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
