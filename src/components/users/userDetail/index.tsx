import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../../../constants/colors';
import { BorderRadius, FontSize, Spacing, FontWeight, Shadows } from '../../../constants/theme';
import { User } from '../../../store/usersStore';

interface UserDetailScreenProps {
  user: User | null;
  onEditPress: () => void;
}

const getAvatarColor = (name: string): string => {
  const palette = [
    Colors.primary, Colors.secondary, Colors.accent,
    Colors.success, '#F59E0B', '#EC4899',
  ];
  return palette[name.charCodeAt(0) % palette.length];
};

interface DetailRowProps {
  label: string;
  value: string;
}

const DetailRow: React.FC<DetailRowProps> = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue} numberOfLines={2}>{value}</Text>
  </View>
);

const UserDetailComponent = ({ user, onEditPress }: UserDetailScreenProps) => {
  if (!user) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>User not found</Text>
        <Text style={styles.errorSubtitle}>This user may have been removed.</Text>
      </View>
    );
  }

  const avatarColor = getAvatarColor(user.firstName);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Hero */}
      <View style={styles.profileHero}>
        <View style={[styles.avatarOuter, { borderColor: avatarColor + '40' }]}>
          {user.image ? (
            <Image source={{ uri: user.image }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
              <Text style={styles.avatarInitials}>
                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.profileName}>{user.firstName} {user.lastName}</Text>
        <View style={styles.activeBadge}>
          <View style={styles.activeDot} />
          <Text style={styles.activeBadgeText}>Active</Text>
        </View>
        <Text style={styles.profileId}>ID #{user.id}</Text>
      </View>

      {/* Personal Info Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Personal Information</Text>
        <View style={styles.cardBody}>
          <DetailRow label="First Name" value={user.firstName} />
          <View style={styles.divider} />
          <DetailRow label="Last Name" value={user.lastName} />
        </View>
      </View>

      {/* Contact Info Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Contact Information</Text>
        <View style={styles.cardBody}>
          <DetailRow label="Email" value={user.email} />
          <View style={styles.divider} />
          <DetailRow label="Phone" value={user.phone} />
        </View>
      </View>

      {/* Edit Button — uses real editProfile.png asset */}
      <TouchableOpacity style={styles.editBtn} onPress={onEditPress} activeOpacity={0.8}>
        <Text style={styles.editBtnText}>Edit User</Text>
      </TouchableOpacity>

      <View style={{ height: Spacing['4xl'] }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.lg,
  },

  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.background,
  },
  errorTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  errorSubtitle: {
    fontSize: FontSize.md,
    color: Colors.textLight,
  },

  profileHero: {
    alignItems: 'center',
    paddingVertical: Spacing['4xl'],
  },
  avatarOuter: {
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
    ...Shadows.lg,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontSize: FontSize.xxxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.white,
  },
  profileName: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.extrabold,
    color: Colors.text,
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.successLight,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.pill,
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.success,
  },
  activeBadgeText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: Colors.success,
  },
  profileId: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },

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
    paddingHorizontal: Spacing.lg,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
  },

  detailRow: {
    paddingVertical: Spacing.lg,
  },
  detailLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: Colors.textMuted,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  detailValue: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
    color: Colors.text,
  },

  editBtn: {
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
  editIcon: {
    width: 18,
    height: 18,
    tintColor: Colors.white,
  },
  editBtnText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.white,
    letterSpacing: 0.3,
  },
});

export default UserDetailComponent;