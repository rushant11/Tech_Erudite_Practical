import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch } from '@redux/hooks';
import { logoutUser } from '@redux/reducer/commonReducer';
import { SCREEN_NAMES } from '@navigation/screenNames';
import type { RootStackParamList } from '@navigation/types';
import { clearAuthToken } from '@utils/asyncStorage';
import { ds } from '@utils/responsive';
import { colors } from '@theme/colors';
import AppText from '@components/common/AppText';
import AppButton from '@components/common/AppButton';

const ProfileScreen = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onPressLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          try {
            setIsLoggingOut(true);
            await clearAuthToken();
            dispatch(logoutUser());
            navigation.getParent()?.reset({
              index: 0,
              routes: [{ name: SCREEN_NAMES.Login }],
            });
          } finally {
            setIsLoggingOut(false);
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <AppText variant="h1" style={styles.title}>
          Profile
        </AppText>
        <View style={styles.spacer} />
        <AppButton
          title="Logout"
          variant="danger"
          loading={isLoggingOut}
          onPress={onPressLogout}
          disabled={isLoggingOut}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: ds(20),
    paddingTop: ds(28),
  },
  title: {
    marginBottom: ds(8),
  },
  spacer: {
    flex: 1,
  },
});
