import {Dimensions} from 'react-native';
 
export const ScreenDimensions = {
  windowWidth: Dimensions.get('window').width,
  windowHeight: Dimensions.get('window').height,
  screenWidth: Dimensions.get('screen').width,
  screenHeight: Dimensions.get('screen').height,
};
 
export function getWidth(size: number) {
  return (size / 375) * ScreenDimensions.screenWidth;
}
export function getHeight(size: number) {
  return (size / 812) * ScreenDimensions.screenHeight;
}