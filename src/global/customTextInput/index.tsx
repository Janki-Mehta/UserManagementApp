import React, { Ref, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
  Image,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { FontSize, FontWeight, BorderRadius, Spacing, Shadows } from '../../constants/theme';
import { images } from '../../constants/images';

interface CustomTextInputProps extends TextInputProps {
  label?: string;
  error?: string | null;
  reference?: Ref<TextInput>;
  isPasswordField?: boolean;
  onPressEye?: () => void;
  isLastField?: boolean;
  containerStyle?: object;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  label,
  error,
  reference,
  isPasswordField,
  onPressEye,
  secureTextEntry,
  isLastField,
  containerStyle,
  style,
  editable = true,
  placeholder,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const getBorderColor = () => {
    if (error) return Colors.error;
    if (isFocused) return Colors.primary;
    return Colors.border;
  };

  const getBackgroundColor = () => {
    if (!editable) return Colors.surfaceSecondary;
    if (isFocused) return Colors.inputBgFocused;
    return Colors.inputBg;
  };

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputContainer,
          {
            borderColor: getBorderColor(),
            backgroundColor: getBackgroundColor(),
          },
          isFocused && styles.inputContainerFocused,
          !!error && styles.inputContainerError,
        ]}
      >
        <TextInput
          ref={reference}
          style={[styles.input, !editable && styles.inputDisabled, style]}
          placeholder={placeholder || ''}
          placeholderTextColor={Colors.textMuted}
          secureTextEntry={secureTextEntry}
          returnKeyType={isLastField ? 'done' : 'next'}
          blurOnSubmit={isLastField}
          editable={editable}
          autoCorrect={false}
          spellCheck={false}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          selectionColor={Colors.primary}
          cursorColor={Colors.primary}
          {...rest}
        />

        {isPasswordField && (
          <TouchableOpacity
            onPress={onPressEye}
            style={styles.eyeButton}
            activeOpacity={0.6}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Image
              source={secureTextEntry ? images.closeEye : images.openEye}
              style={styles.eyeIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>

      {!!error && (
        <View style={styles.errorRow}>
          <Text style={styles.errorDot}>{'●'}</Text>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
    letterSpacing: 0.3,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.lg,
    minHeight: 52,
    ...Shadows.xs,
  },
  inputContainerFocused: {
    ...Shadows.sm,
  },
  inputContainerError: {
    backgroundColor: Colors.errorLight,
  },
  input: {
    flex: 1,
    fontSize: FontSize.md,
    color: Colors.text,
    fontWeight: FontWeight.regular,
    paddingVertical: Spacing.sm,
  },
  inputDisabled: {
    color: Colors.textLight,
  },
  eyeButton: {
    padding: Spacing.xs,
    marginLeft: Spacing.sm,
  },
  eyeIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.textLight,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.xs,
    gap: Spacing.xs,
  },
  errorDot: {
    fontSize: 8,
    color: Colors.error,
  },
  errorText: {
    fontSize: FontSize.xs,
    color: Colors.error,
    fontWeight: FontWeight.medium,
    flex: 1,
  },
});

export default CustomTextInput;
