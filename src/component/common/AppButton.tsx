import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import {ds, fs} from '@utils/responsive';
import {colors} from '@theme/colors';
import AppText from './AppText';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

const variantContainer: Record<Variant, ViewStyle> = {
  primary: {
    backgroundColor: colors.primary,
    borderWidth: 0,
  },
  secondary: {
    backgroundColor: colors.textPrimary,
    borderWidth: 0,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  danger: {
    backgroundColor: colors.error,
    borderWidth: 0,
  },
};

const labelColor: Record<Variant, string> = {
  primary: colors.onPrimary,
  secondary: colors.onPrimary,
  outline: colors.textPrimary,
  ghost: colors.textMuted,
  danger: colors.onPrimary,
};

export type AppButtonProps = {
  title: string;
  onPress: () => void;
  variant?: Variant;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  testID?: string;
};

const AppButton = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  fullWidth = true,
  style,
  textStyle,
  testID,
}: AppButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{disabled: isDisabled, busy: loading}}
      onPress={onPress}
      disabled={isDisabled}
      style={({pressed}) => [
        styles.base,
        fullWidth && styles.fullWidth,
        variantContainer[variant],
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={labelColor[variant]} />
      ) : (
        <AppText
          variant="body"
          style={[
            {fontSize: fs(15), fontWeight: '600', color: labelColor[variant]},
            textStyle,
          ]}>
          {title}
        </AppText>
      )}
    </Pressable>
  );
};

const styles: Record<string, ViewStyle | TextStyle> = {
  base: {
    height: ds(50),
    borderRadius: ds(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  disabled: {
    opacity: 0.55,
  },
  pressed: {
    opacity: 0.9,
  },
};

export default AppButton;
