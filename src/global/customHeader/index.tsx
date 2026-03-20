import { View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { activityOpacity } from '../../constants/Gconstants';
import { useStyles } from './styles';
import { images } from '../../constants/images';

interface PropsType {
  title?: string;
  onPressGoBack?: () => void;
  isBack?: boolean;
  isTitle?: boolean;
  isLastBtn?: boolean;
  // Close button
  isClose?: boolean;
  isMore?: boolean;
  onPressMore?: () => void;
  moreImg?: any;
  isBackWithTitle?: boolean;
  isTitleOnly?: boolean;
  centerTitle?: string;
  isSortBy?: boolean;
  onPressSortBy?: () => void;
  isFilterBy?: boolean;
  onPressFilterBy?: () => void;
}

const CustomHeader = (props: PropsType) => {
  const insets = useSafeAreaInsets();
  const styles = useStyles();
  return (
    <View
      style={[
        styles.vwMain,
        {
          paddingTop: Platform.OS == 'ios' ? insets.top + 15 : insets.top + 20,
        },
      ]}
    >
      {props.isBackWithTitle && (
        <View style={{ flexDirection: 'row',justifyContent:'space-between' }}>
          <View style={styles.vWBackWithHeader}>
            {props.isBack && (
              <TouchableOpacity
                activeOpacity={activityOpacity}
                onPress={props.onPressGoBack}
                style={styles.btnBack}
              >
                <Image
                  source={images.backArrow}
                  style={styles.imgBack}
                />
              </TouchableOpacity>
            )}
            {props.isTitle && (
              <Text style={styles.lblTitle}>
                {props.title}
              </Text>
            )}
            </View>
        </View>
      )}
      {props.isTitleOnly && (
        <Text style={styles.centerTitle}>
          {props.centerTitle}
        </Text>
      )}
    </View>
  );
};
export default CustomHeader;
