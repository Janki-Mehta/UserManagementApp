import React from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import { Colors } from '../../../constants/colors';
import { FontSize, Spacing, BorderRadius, FontWeight, Shadows } from '../../../constants/theme';
import { User } from '../../../store/usersStore';
import { images } from '../../../constants/images';
import CustomButton from '../../../global/customButton';

interface UserListScreenProps {
  users: User[];
  insets: any;
  isLoading: boolean;
  error: string | null;
  isOffline: boolean;
  onEndReached: () => void;
  onUserPress: (user: User) => void;
  onAddUserPress: () => void;
  onLogoutPress: () => void;
  onRetry: () => void;
}

const AVATAR_COLORS = [
  Colors.primary,
  Colors.secondary,
  Colors.accent,
  Colors.success,
  '#F59E0B',
  '#EC4899',
];

const getAvatarColor = (name: string): string =>
  AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

const UserCard: React.FC<{ item: User; onPress: () => void }> = ({ item, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.75}>
    <View style={styles.avatarWrapper}>
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.avatar} />
      ) : (
        <View style={[styles.avatar, { backgroundColor: getAvatarColor(item.firstName) }]}>
          <Text style={styles.initials}>
            {item.firstName.charAt(0)}{item.lastName.charAt(0)}
          </Text>
        </View>
      )}
      <View style={styles.onlineDot} />
    </View>

    <View style={styles.info}>
      <Text style={styles.userName} numberOfLines={1}>
        {item.firstName} {item.lastName}
      </Text>
      <Text style={styles.userEmail} numberOfLines={1}>{item.email}</Text>
      <Text style={styles.userPhone} numberOfLines={1}>{item.phone}</Text>
    </View>

    {/* Plain text chevron — no emoji */}
    <View style={styles.chevronContainer}>
      <Text style={styles.chevronText}>{'>'}</Text>
    </View>
  </TouchableOpacity>
);

const UserListComponent: React.FC<UserListScreenProps> = ({
  users,
  insets,
  isLoading,
  error,
  isOffline,
  onEndReached,
  onUserPress,
  onAddUserPress,
  onLogoutPress,
  onRetry,
}) => {
  const renderItem = ({ item }: { item: User }) => (
    <UserCard item={item} onPress={() => onUserPress(item)} />
  );

  const renderFooter = () => {
    // Only show during pagination, not initial load
    if (!isLoading || users.length === 0) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading more users...</Text>
      </View>
    );
  };

  const renderEmpty = () => {
    // Initial load — no data yet
    if (isLoading && users.length === 0) {
      return (
        <View style={styles.emptyState}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading users...</Text>
        </View>
      );
    }

    if (error) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Something went wrong</Text>
          <Text style={styles.emptySubtitle}>{error}</Text>
          <CustomButton
            title="Retry"
            onPress={onRetry}
            size="sm"
            variant="outline"
            style={styles.retryBtn}
          />
        </View>
      );
    }

    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>No users found</Text>
        <Text style={styles.emptySubtitle}>Tap "Add User" below to get started</Text>
      </View>
    );
  };

  return (
    <View style={[styles.container,{marginTop: insets.top}]}>
      {isOffline && (
        <View style={styles.offlineBanner}>
          <Text style={styles.offlineText}>Offline — showing cached data</Text>
        </View>
      )}

      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={[
          styles.listContent,
          users.length === 0 && styles.listContentEmpty,
        ]}
        showsVerticalScrollIndicator={false}
      />

      {/* Action Bar */}
      <View style={styles.actionBar}>
        <CustomButton
          title="Add User"
          onPress={onAddUserPress}
          style={styles.actionBtn}
        />
        <TouchableOpacity style={styles.logoutBtn} onPress={onLogoutPress} activeOpacity={0.8}>
          <Image source={images.logout} style={styles.logoutIcon} resizeMode="contain" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  offlineBanner: {
    backgroundColor: Colors.warningLight,
    borderBottomWidth: 1,
    borderBottomColor: Colors.warning,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    alignItems: 'center',
  },
  offlineText: {
    fontSize: FontSize.xs,
    color: '#92400E',
    fontWeight: FontWeight.semibold,
  },

  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing['4xl'],
  },
  listContentEmpty: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: Spacing.md,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    color: Colors.white,
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
  },
  onlineDot: {
    position: 'absolute',
    right: 1,
    bottom: 1,
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: Colors.success,
    borderWidth: 2,
    borderColor: Colors.surface,
  },
  info: { flex: 1 },
  userName: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: 2,
  },
  userEmail: {
    fontSize: FontSize.sm,
    color: Colors.textLight,
    marginBottom: 2,
  },
  userPhone: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  chevronContainer: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.primarySurface,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.sm,
  },
  chevronText: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: FontWeight.bold,
  },

  footerLoader: {
    paddingVertical: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  loadingText: {
    fontSize: FontSize.sm,
    color: Colors.textLight,
  },

  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing['4xl'],
    gap: Spacing.md,
    paddingHorizontal: Spacing.xxl,
  },
  emptyTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: FontSize.md,
    color: Colors.textLight,
    textAlign: 'center',
  },
  retryBtn: { marginTop: Spacing.sm },

  actionBar: {
    flexDirection: 'row',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    ...Shadows.sm,
  },
  actionBtn: {
    flex: 1,
  },
  logoutBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.error,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
    minHeight: 50,
    ...Shadows.sm,
  },
  logoutIcon: {
    // width: 18,
    // height: 18,
  },
  logoutText: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.white,
  },
});

export default UserListComponent;
