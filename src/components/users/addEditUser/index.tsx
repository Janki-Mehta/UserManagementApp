import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import CustomTextInput from '../../../global/customTextInput';
import CustomButton from '../../../global/customButton';
import { Colors } from '../../../constants/colors';
import { FontSize, FontWeight, Spacing, BorderRadius, Shadows } from '../../../constants/theme';
import { images } from '../../../constants/images';

interface AddEditUserScreenProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image?: string | null;
  firstNameError: string | null;
  lastNameError: string | null;
  emailError: string | null;
  phoneError: string | null;
  onFirstNameChange: (value: string) => void;
  onLastNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onImagePick: () => void;
  onSavePress: () => void;
  loading: boolean;
  isEditMode: boolean;
}

const AddEditUserComponent = (props: AddEditUserScreenProps) => {
  const {
    firstName, lastName, email, phone, image,
    firstNameError, lastNameError, emailError, phoneError,
    onFirstNameChange, onLastNameChange,
    onEmailChange, onPhoneChange,
    onImagePick, onSavePress,
    loading, isEditMode,
  } = props;

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar Picker */}
        <View style={styles.avatarSection}>
          <TouchableOpacity
            onPress={onImagePick}
            activeOpacity={0.8}
            style={styles.avatarTouchable}
            disabled={loading}
          >
            <View style={styles.avatarRing}>
              {image ? (
                <Image source={{ uri: image }} style={styles.avatar} />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarInitials}>
                    {firstName ? firstName.charAt(0).toUpperCase() : 'U'}
                    {lastName ? lastName.charAt(0).toUpperCase() : ''}
                  </Text>
                </View>
              )}

              {/* Camera icon — real asset */}
              <View style={styles.cameraButton}>
                <Image
                  source={images.camera}
                  style={styles.cameraIcon}
                  resizeMode="contain"
                />
              </View>
            </View>
          </TouchableOpacity>
          <Text style={styles.avatarHint}>
            {image ? 'Tap to change photo' : 'Tap to upload photo'}
          </Text>
        </View>

        {/* Personal Info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Personal Information</Text>
          <View style={styles.cardBody}>
            <View style={styles.rowInputs}>
              <View style={styles.halfInput}>
                <CustomTextInput
                  label="First Name"
                  placeholder="John"
                  value={firstName}
                  onChangeText={onFirstNameChange}
                  error={firstNameError}
                  editable={!loading}
                  autoCapitalize="words"
                />
              </View>
              <View style={styles.halfInput}>
                <CustomTextInput
                  label="Last Name"
                  placeholder="Doe"
                  value={lastName}
                  onChangeText={onLastNameChange}
                  error={lastNameError}
                  editable={!loading}
                  autoCapitalize="words"
                />
              </View>
            </View>
          </View>
        </View>

        {/* Contact Info */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Contact Information</Text>
          <View style={styles.cardBody}>
            <CustomTextInput
              label="Email Address"
              placeholder="john@example.com"
              value={email}
              onChangeText={onEmailChange}
              error={emailError}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />
            <CustomTextInput
              label="Phone Number"
              placeholder="+1 (555) 000-0000"
              value={phone}
              onChangeText={onPhoneChange}
              error={phoneError}
              keyboardType="phone-pad"
              editable={!loading}
              isLastField
            />
          </View>
        </View>

        {/* Save Button — uses editProfile.png for edit mode */}
        <TouchableOpacity
          style={[styles.saveBtn, loading && styles.saveBtnDisabled]}
          onPress={onSavePress}
          disabled={loading}
          activeOpacity={0.8}
        >
          <Text style={styles.saveBtnText}>
            {isEditMode ? 'Update User' : 'Add User'}
          </Text>
        </TouchableOpacity>

        <View style={{ height: Spacing['4xl'] }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing['6xl'],
  },

  // Avatar
  avatarSection: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
  },
  avatarTouchable: { alignItems: 'center' },
  avatarRing: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.primaryLight,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
    ...Shadows.md,
    position: 'relative',
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
  },
  avatarPlaceholder: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: Colors.primarySurface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontSize: FontSize.xxxl,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.surface,
  },
  cameraIcon: {
    // width: 14,
    // height: 14,
    // tintColor: Colors.white,
  },
  avatarHint: {
    fontSize: FontSize.xs,
    color: Colors.textLight,
    fontWeight: FontWeight.medium,
  },

  // Card
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.lg,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  cardTitle: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.textLight,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.surfaceSecondary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  cardBody: {
    padding: Spacing.lg,
  },
  rowInputs: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  halfInput: { flex: 1 },

  // Save Button
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.lg,
    gap: Spacing.sm,
    minHeight: 54,
    ...Shadows.sm,
  },
  saveBtnDisabled: {
    opacity: 0.5,
  },
  saveBtnIcon: {
  },
  saveBtnText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.white,
    letterSpacing: 0.3,
  },
});

export default AddEditUserComponent;