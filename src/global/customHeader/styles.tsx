import { StyleSheet } from 'react-native';
import {
  getHeight,
  getWidth,
  ScreenDimensions,
} from '../../constants/utils/Dimension';
import { Colors } from '../../constants/colors';
import { FontSize } from '../../constants/theme';

export const useStyles = () => {
  return StyleSheet.create({
    vwMain: {
      backgroundColor: Colors.white,
      paddingBottom: 12,
    },
    vWBackWithHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      // backgroundColor: colors.white,
      paddingHorizontal: getWidth(16),
      paddingTop: 2,
      paddingBottom: 4,
      // backgroundColor: colors.bottomTabsHeaderBg,
    },
    btnBack: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    imgBack: {
      height: getHeight(24),
      width: getWidth(24),
      resizeMode: 'contain',
    },
    lblTitle: {
      fontSize: FontSize.md,

      fontWeight: '600',
      textAlign: 'left',
      color: Colors.onboardingTitle,
    },
    centerTitle: {
      fontSize: FontSize.md,
      fontWeight: '600',
      textAlign: 'center',
      color: Colors.onboardingTitle,
    },
    btnSortBy: {
      height: getHeight(26),
      width: getWidth(26),
      marginEnd: getWidth(8),
    },
    imgSortBy: {
      height: getHeight(26),
      width: getWidth(26),
    },
    btnFilterBy: {
      height: getHeight(26),
      width: getWidth(26),
      marginEnd: getWidth(18),
    },
    imgFilterBy: {
      height: getHeight(26),
      width: getWidth(26),
    },
  });
};
