import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, ScrollView, StatusBar, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Eye, EyeOff, ImageIcon} from 'lucide-react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ds, fs} from '@utils/responsive';
import {setAuthToken} from '@utils/asyncStorage';
import {useLoginMutation} from '@services/api/plieApi';
import {setAuthToken as setAuthTokenInStore, setUser} from '@redux/reducer/commonReducer';
import {useAppDispatch} from '@redux/hooks';
import type {RootStackParamList} from '@navigation/types';
import {SCREEN_NAMES} from '@navigation/screenNames';
import {colors} from '@theme/colors';
import AppText from '@components/common/AppText';
import AppTextInput from '@components/common/AppTextInput';
import AppButton from '@components/common/AppButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const [login, {isLoading: loginPending}] = useLoginMutation();
  const [email, setEmail] = useState('testpracticaluser001@mailinator.com');
  const [password, setPassword] = useState('Test@123');
  const [showPassword, setShowPassword] = useState(false);

  const onPressSignIn = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Validation', 'Please enter email and password');
      return;
    }
    try {
      const response = await login({
        email: email.trim(),
        password: password.trim(),
      }).unwrap();
      await setAuthToken(response.token);
      dispatch(setAuthTokenInStore(response.token));
      dispatch(
        setUser({
          id: response.user.usr_id,
          name: `${response.user.usr_fname} ${response.user.usr_lname}`.trim(),
          email: response.user.usr_email,
          profileImage: response.user.usr_profile_img,
        }),
      );
      navigation.reset({
        index: 0,
        routes: [{name: SCREEN_NAMES.MainTabs}],
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      Alert.alert('Login Failed', message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <AppText variant="h1" style={styles.logo}>
          Pliē
        </AppText>
        <View style={styles.imagePlaceholder}>
          <ImageIcon size={ds(40)} color={colors.textPlaceholder} strokeWidth={1.2} />
        </View>

        <View style={styles.fieldGroup}>
          <AppTextInput
            label="Email"
            placeholder="email@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.fieldGroup}>
          <AppTextInput
            label="Password"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            rightAccessory={
              <TouchableOpacity
                accessibilityRole="button"
                hitSlop={12}
                onPress={() => setShowPassword(prev => !prev)}>
                {showPassword ? (
                  <EyeOff size={ds(18)} color={colors.textPlaceholder} />
                ) : (
                  <Eye size={ds(18)} color={colors.textPlaceholder} />
                )}
              </TouchableOpacity>
            }
          />
          <TouchableOpacity style={styles.forgotWrap} activeOpacity={0.7}>
            <AppText variant="caption" style={styles.forgotText}>
              Forgot Password?
            </AppText>
          </TouchableOpacity>
        </View>

        <AppButton
          title="Sign In"
          onPress={onPressSignIn}
          loading={loginPending}
          style={styles.signInBtn}
        />

        {/* <View style={styles.signUpRow}>
          <AppText variant="bodySmall">Not a member? </AppText>
          <TouchableOpacity activeOpacity={0.7}>
            <AppText variant="link">Sign Up Here</AppText>
          </TouchableOpacity>
        </View> */}

        {/* <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <AppText variant="caption" style={styles.dividerLabel}>
            or Sign In with:
          </AppText>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
            <AppText style={[styles.socialLetter, {color: colors.socialGoogle}]}>G</AppText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
            <AppText style={[styles.socialLetter, {color: colors.socialApple}]}> </AppText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialBtn} activeOpacity={0.7}>
            <AppText style={[styles.socialLetter, {color: colors.socialFacebook}]}>f</AppText>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.guestBtn} activeOpacity={0.7}>
          <AppText variant="bodySmall" style={styles.guestText}>
            Enter as Guest
          </AppText>
        </TouchableOpacity> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: ds(28),
    paddingBottom: ds(40),
  },
  logo: {
    fontSize: fs(42),
    textAlign: 'center',
    marginTop: ds(48),
    marginBottom: ds(28),
    letterSpacing: 1.5,
  },
  imagePlaceholder: {
    width: ds(140),
    height: ds(140),
    backgroundColor: '#F5F5F5',
    borderRadius: ds(10),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: ds(36),
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  fieldGroup: {
    marginBottom: ds(16),
  },
  forgotWrap: {
    alignItems: 'flex-end',
    marginTop: ds(7),
  },
  forgotText: {
    color: colors.textSecondary,
  },
  signInBtn: {
    marginTop: ds(10),
    marginBottom: ds(16),
  },
  signUpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: ds(28),
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: ds(24),
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerLabel: {
    marginHorizontal: ds(10),
    color: colors.textMuted,
    fontSize: fs(11),
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: ds(20),
    marginBottom: ds(36),
  },
  socialBtn: {
    width: ds(52),
    height: ds(52),
    borderRadius: ds(26),
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  socialLetter: {
    fontSize: fs(20),
    fontWeight: '700',
  },
  guestBtn: {
    alignItems: 'center',
  },
  guestText: {
    color: colors.textMuted,
  },
});
