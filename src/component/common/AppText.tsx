import React from 'react';
import { Text, type StyleProp, type TextProps, type TextStyle } from 'react-native';
import { fs } from '@utils/responsive';
import { colors } from '@theme/colors';

type Variant = 'h1' | 'h2' | 'body' | 'bodySmall' | 'label' | 'caption' | 'error' | 'link';

const variantStyles: Record<Variant, TextStyle> = {
  h1: { fontSize: fs(24), fontWeight: '700', color: colors.textPrimary },
  h2: { fontSize: fs(18), fontWeight: '600', color: colors.textPrimary },
  body: { fontSize: fs(14), fontWeight: '400', color: colors.textPrimary },
  bodySmall: { fontSize: fs(13), color: colors.textSecondary },
  label: { fontSize: fs(13), fontWeight: '500', color: colors.textPrimary, marginBottom: 0 },
  caption: { fontSize: fs(12), color: colors.textMuted },
  error: { fontSize: fs(12), color: colors.error, marginTop: 0 },
  link: {
    fontSize: fs(13),
    fontWeight: '600',
    color: colors.textPrimary,
    textDecorationLine: 'underline',
  },
};

export type AppTextProps = TextProps & {
  variant?: Variant;
  color?: string;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
};

const AppText = ({ variant = 'body', color, style, children, ...rest }: AppTextProps) => {
  return (
    <Text
      allowFontScaling={false}
      style={[variantStyles[variant], color ? { color } : null, style]}
      {...rest}>
      {children}
    </Text>
  );
};

export default AppText;
