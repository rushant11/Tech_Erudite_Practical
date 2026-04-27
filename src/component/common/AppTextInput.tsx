import React, {forwardRef} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  type StyleProp,
  type TextInputProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import {ds, fs} from '@utils/responsive';
import {colors} from '@theme/colors';
import AppText from './AppText';

export type AppTextInputProps = TextInputProps & {
  label?: string;
  error?: string;
  rightAccessory?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
};

const AppTextInput = forwardRef<TextInput, AppTextInputProps>(
  (
    {label, error, rightAccessory, containerStyle, inputStyle, style, editable, ...rest},
    ref,
  ) => {
    const disabled = editable === false;

    return (
      <View style={containerStyle}>
        {label ? (
          <AppText variant="label" style={styles.label}>
            {label}
          </AppText>
        ) : null}
        <View style={styles.inputShell}>
          <TextInput
            ref={ref}
            placeholderTextColor={colors.textPlaceholder}
            allowFontScaling={false}
            editable={editable}
            style={[
              styles.input,
              rightAccessory ? styles.inputWithAccessory : null,
              error ? styles.inputError : null,
              disabled ? styles.inputDisabled : null,
              inputStyle,
              style,
            ]}
            {...rest}
          />
          {rightAccessory ? <View style={styles.accessory}>{rightAccessory}</View> : null}
        </View>
        {error ? (
          <AppText variant="error" style={styles.errorText}>
            {error}
          </AppText>
        ) : null}
      </View>
    );
  },
);

AppTextInput.displayName = 'AppTextInput';

const styles = StyleSheet.create({
  label: {
    marginBottom: ds(7),
  },
  inputShell: {
    position: 'relative',
  },
  input: {
    height: ds(48),
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: ds(8),
    paddingHorizontal: ds(14),
    fontSize: fs(14),
    color: colors.textPrimary,
    backgroundColor: colors.background,
  },
  inputWithAccessory: {
    paddingRight: ds(48),
  },
  inputError: {
    borderColor: colors.error,
  },
  inputDisabled: {
    opacity: 0.6,
  },
  accessory: {
    position: 'absolute',
    right: ds(14),
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  errorText: {
    marginTop: ds(6),
  },
});

export default AppTextInput;
