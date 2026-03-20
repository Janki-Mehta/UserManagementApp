import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  TouchableOpacityProps,
} from 'react-native';
import { BorderRadius, FontSize, FontWeight, Spacing, Shadows } from '../../constants/theme';
import { Colors } from '../../constants/colors';

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  loading = false,
  variant = 'primary',
  size = 'md',
  style,
  disabled,
  ...props
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary': return styles.buttonSecondary;
      case 'danger':    return styles.buttonDanger;
      case 'ghost':     return styles.buttonGhost;
      case 'outline':   return styles.buttonOutline;
      default:          return styles.buttonPrimary;
    }
  };

  const getTextStyle = () => {
    if (variant === 'ghost' || variant === 'outline') return styles.textPrimary;
    return styles.textLight;
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'sm': return styles.sizeSm;
      case 'lg': return styles.sizeLg;
      default:   return styles.sizeMd;
    }
  };

  const getSpinnerColor = () => {
    if (variant === 'ghost' || variant === 'outline') return Colors.primary;
    return Colors.white;
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        getSizeStyle(),
        (disabled || loading) && styles.buttonDisabled,
        style,
      ]}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={getSpinnerColor()} size="small" />
      ) : (
        <Text style={[styles.text, getTextStyle()]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.sm,
  },
  // Variants
  buttonPrimary: {
    backgroundColor: Colors.primary,
  },
  buttonSecondary: {
    backgroundColor: Colors.secondary,
  },
  buttonDanger: {
    backgroundColor: Colors.error,
  },
  buttonGhost: {
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
    elevation: 0,
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.primary,
    shadowColor: 'transparent',
    elevation: 0,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  // Sizes
  sizeSm: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.md,
    minHeight: 36,
  },
  sizeMd: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    minHeight: 50,
  },
  sizeLg: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    minHeight: 56,
  },
  text: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    letterSpacing: 0.3,
  },
  textLight: {
    color: Colors.white,
  },
  textPrimary: {
    color: Colors.primary,
  },
});

export default CustomButton;
