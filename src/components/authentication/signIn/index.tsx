import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Ref,
} from 'react-native';
import CustomTextInput from '../../../global/customTextInput';
import CustomButton from '../../../global/customButton';
import { Colors } from '../../../constants/colors';
import { FontSize, FontWeight, Spacing, BorderRadius, Shadows } from '../../../constants/theme';

interface SignInScreenProps {
  email: string;
  emailRef: Ref<TextInput>;
  password: string;
  passwordRef: Ref<TextInput>;
  emailError?: string | null;
  passwordError?: string | null;
  onEmailChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  onSignIn: () => void;
  loading: boolean;
  isPasswordVisible: boolean;
  togglePasswordVisibility: () => void;
}

const SignInComponent = (props: SignInScreenProps) => {
  const {
    email, emailRef,
    password, passwordRef,
    emailError, passwordError,
    onEmailChange, onPasswordChange,
    onSignIn, loading,
    isPasswordVisible, togglePasswordVisibility,
  } = props;

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Logo / Branding */}
        <View style={styles.hero}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoText}>UM</Text>
          </View>
          <Text style={styles.appName}>UserManager</Text>
          <Text style={styles.tagline}>Manage your team, seamlessly</Text>
        </View>

        {/* Form Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sign in to your account</Text>

          <View style={styles.formBody}>
            <CustomTextInput
              label="Email Address"
              placeholder="you@example.com"
              value={email}
              onChangeText={onEmailChange}
              error={emailError}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
              reference={emailRef}
              onSubmitEditing={() => (passwordRef as any)?.current?.focus()}
              returnKeyType="next"
            />

            <CustomTextInput
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={onPasswordChange}
              error={passwordError}
              editable={!loading}
              reference={passwordRef}
              secureTextEntry={!isPasswordVisible}
              onPressEye={togglePasswordVisibility}
              isPasswordField
              isLastField
            />

            <CustomButton
              title="Sign In"
              onPress={onSignIn}
              loading={loading}
              disabled={loading}
              size="lg"
              style={styles.signInBtn}
            />
          </View>
        </View>

        {/* Demo credentials — plain styled text, no emoji */}
        <View style={styles.hintCard}>
          <Text style={styles.hintTitle}>Demo Credentials</Text>
          <View style={styles.hintDivider} />
          <View style={styles.hintRow}>
            <Text style={styles.hintLabel}>Email</Text>
            <Text style={styles.hintValue}>demo@example.com</Text>
          </View>
          <View style={styles.hintRow}>
            <Text style={styles.hintLabel}>Password</Text>
            <Text style={styles.hintValue}>demo123</Text>
          </View>
        </View>
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
  contentContainer: {
    flexGrow: 1,
    padding: Spacing.xl,
    paddingBottom: Spacing['4xl'],
  },

  // Hero / Branding
  hero: {
    alignItems: 'center',
    paddingTop: Spacing['4xl'],
    paddingBottom: Spacing['4xl'],
  },
  logoBadge: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
    ...Shadows.lg,
  },
  logoText: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.white,
    letterSpacing: 2,
  },
  appName: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.text,
    letterSpacing: -0.5,
    marginBottom: Spacing.xs,
  },
  tagline: {
    fontSize: FontSize.md,
    color: Colors.textLight,
  },

  // Card
  card: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Shadows.md,
  },
  cardTitle: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.xl,
  },
  formBody: {
    gap: Spacing.xs,
  },
  signInBtn: {
    marginTop: Spacing.sm,
    borderRadius: BorderRadius.lg,
  },

  // Hint card
  hintCard: {
    backgroundColor: Colors.primarySurface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.primaryLight,
  },
  hintTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
    marginBottom: Spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  hintDivider: {
    height: 1,
    backgroundColor: Colors.primaryLight,
    marginBottom: Spacing.sm,
    opacity: 0.4,
  },
  hintRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
  hintLabel: {
    fontSize: FontSize.xs,
    color: Colors.textLight,
    fontWeight: FontWeight.medium,
  },
  hintValue: {
    fontSize: FontSize.xs,
    color: Colors.text,
    fontWeight: FontWeight.semibold,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
});

export default SignInComponent;