import {Dimensions, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const isTab = DeviceInfo.isTablet();

const {width, height} = Dimensions.get('window');
const STANDARD_WIDTH = 375;
const USE_FOR_BIGGER_SIZE = true;
export const CURRENT_WIDTH = width;
export const CURRENT_HEIGHT = height;
const PHONE_SCALE_FACTOR =
  CURRENT_WIDTH / (Platform.OS === 'android' ? 400 : 390);

const TABLET_SCALE_FACTOR = PHONE_SCALE_FACTOR * 0.75;

export function dynamicSize(size: number) {
  if (isTab) {
    return size * TABLET_SCALE_FACTOR;
  } else {
    return size * PHONE_SCALE_FACTOR;
  }
}

export function getFontSize(size: number) {
  if (USE_FOR_BIGGER_SIZE || CURRENT_WIDTH < STANDARD_WIDTH) {
    const newSize = dynamicSize(size);
    return newSize;
  }
  return size;
}

export const ds = (size: number) => dynamicSize(size);
export const fs = (size: number) => getFontSize(size);
