import { I18nManager, StyleSheet } from 'react-native';
import { getHeight, getWidth } from '../../constants/utils/Dimension';
import { Colors } from '../../constants/colors';
import { BorderRadius, FontSize } from '../../constants/theme';

export const useStyles = () => {
  return StyleSheet.create({
    vwMain: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: getWidth(16),
      gap: getWidth(12),
      borderRadius: BorderRadius.md,
      backgroundColor: Colors.inputBg
      // flex: 1,
    },
    vwInputEye: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: getWidth(5),
      justifyContent: 'space-between',
    },
    btnCountryCode: {
      flexDirection: 'row',
      gap: getWidth(8),
      alignItems: 'center',
    },
    imgDownArrow: { height: getWidth(16), width: getWidth(16) },
    imgSearchIcon: { height: getWidth(24), width: getWidth(24) },
    input: {
      margin: 0,
      padding: 0,
      color: Colors.textInput,
      textAlign: I18nManager.isRTL ? 'right' : undefined,
      flex: 1,
    },
    lblCountryCode: {
      fontSize: FontSize.md,
      color: "#8A8A8A",
      lineHeight: getWidth(24),
    },
  });
};
