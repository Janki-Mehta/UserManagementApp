import { StyleSheet } from "react-native";
import { FontSize, FontWeight, Spacing } from "../../../constants/theme";
import { Colors } from "../../../constants/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  content: {
    padding: Spacing.lg,
  },

  // Avatar Section
  avatarContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    marginBottom: Spacing.sm,
  },

  userName: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },

  // Card
  detailsCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: Spacing.lg,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },

  sectionTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    marginBottom: Spacing.sm,
    marginTop: Spacing.md,
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },

  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  icon: {
    fontSize: 18,
    marginRight: Spacing.sm,
  },

  label: {
    fontSize: FontSize.md,
    color: Colors.text,
  },

  value: {
    fontSize: FontSize.md,
    color: '#6B7280',
  },

  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },

  buttonContainer: {
    marginTop: Spacing.lg,
  },

  editButton: {
    paddingVertical: Spacing.md,
    borderRadius: 12,
  },
});
