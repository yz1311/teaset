// Theme.js

'use strict';

import {Platform, Dimensions, DeviceInfo, StatusBar, PixelRatio} from 'react-native';

import ThemeDefault from './ThemeDefault';
import ThemeBlack from './ThemeBlack';
import ThemeViolet from './ThemeViolet';

// See https://mydevice.io/devices/ for device dimensions
const X_WIDTH = 375;
const X_HEIGHT = 812;
const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;
const PAD_WIDTH = 768;
const PAD_HEIGHT = 1024;
const IPHONE12_WIDTH = 390;
const IPHONE12_HEIGHT = 844;
const IPHONE12MAX_WIDTH = 428;
const IPHONE12MAX_HEIGHT = 926;
const IPHONE12MINI_WIDTH = 360;
const IPHONE12MINI_HEIGHT = 780;
const IPHONE14PRO_HEIGHT = 780;

const {width: D_WIDTH, height: D_HEIGHT} = Dimensions.get('window');


const isIPhoneX = (() => {
  if (Platform.OS === 'web') return false;
  const { height, width } = Dimensions.get("window");
  return (
    Platform.OS === 'ios' &&
    (height === 780 ||
        width === 780 ||
        height === 812 ||
        width === 812 ||
        height === 844 ||
        width === 844 ||
        height === 852 ||
        width === 852 ||
        height === 896 ||
        width === 896 ||
        height === 926 ||
        width === 926 ||
        height === 932 ||
        width === 932)
  );
})();

const isIPad = (() => {
  if (Platform.OS !== 'ios' || isIPhoneX) return false;

  // if portrait and width is smaller than iPad width
  if (D_HEIGHT > D_WIDTH && D_WIDTH < PAD_WIDTH) {
    return false;
  }

  // if landscape and height is smaller that iPad height
  if (D_WIDTH > D_HEIGHT && D_HEIGHT < PAD_WIDTH) {
    return false;
  }

  return true;
})();

//不会改变，只需执行一次
const isAndroid = Platform.OS === 'android';

//不会改变，只需执行一次
const isIOS = Platform.OS === 'ios';

const Theme = {

  themes: {
    default: ThemeDefault,
    black: ThemeBlack,
    violet: ThemeViolet,
  },

  set: function(theme) {
    Object.assign(this, theme);
  },

  isPad: isIPad,

  get isIPhoneX() {
    if (Platform.OS === 'web') return false;
    const { height, width } = Dimensions.get("window");
    return (
        Platform.OS === 'ios' &&
        (height === 780 ||
            width === 780 ||
            height === 812 ||
            width === 812 ||
            height === 844 ||
            width === 844 ||
            height === 852 ||
            width === 852 ||
            height === 896 ||
            width === 896 ||
            height === 926 ||
            width === 926 ||
            height === 932 ||
            width === 932 ||
            height === 874 ||
            width === 874 ||
            height === 956 ||
            width === 956)
    )
  },

  fitIPhoneX: true,

  isAndroid: isAndroid,

  isIOS: isIOS,

  get isLandscape() {
    return Dimensions.get('window').width > Dimensions.get('window').height;
  },

  get statusBarHeight() {
    if (Platform.OS === 'ios') {
      if (this.isIPhoneX) return this.isLandscape ? 0 : (this.fitIPhoneX ? 44 : 20);
      if (this.isPad) return 20;
    } else if (Platform.OS === 'android') {
      if (Platform.Version > 20) return StatusBar.currentHeight; //translucent StatusBar is required
      return 0;
    }
    return this.isLandscape ? 0 : 20;
  },

  get screenInset() {
    let isLandscape = this.isLandscape;
    let isIPhoneX = this.isIPhoneX;
    let fitIPhoneX = this.fitIPhoneX;
    return ({
      left: isLandscape && isIPhoneX && fitIPhoneX ? 44 : 0,
      right: isLandscape && isIPhoneX && fitIPhoneX ? 44 : 0,
      top: this.statusBarHeight,
      bottom: isIPhoneX && fitIPhoneX ? (isLandscape ? 24 : 34) : 0,
    });
  },

  //设计宽度 1X
  get designWidth () {
    return 750;
  },
  //设计高度 1X
  get designHeight () {
    return 1334;
  },

  get deviceWidth() {
    return Dimensions.get('window').width;
  },

  get deviceHeight() {
    return Dimensions.get('window').height;
  },

  px2dp(w) {
    return Dimensions.get('window').width / Theme.designWidth * w;
  },

  get onePix() {
    return 1 / PixelRatio.get();
  },

  fontSizeAndColor(size, color) {
    return {
      fontSize: Theme.px2dp(size),
      color: color
    };
  },
  fontSizeColor(size, color) {
    return {
      fontSize: Theme.px2dp(size),
      color: color
    };
  },
  fontSizeColorWeight(size, color, weight) {
    return {
      fontSize: Theme.px2dp(size),
      color: color,
      fontWeight: weight
    };
  },
  widthHeight(width, height) {
    return {
      width: Theme.px2dp(width),
      height: Theme.px2dp(height)
    }
  }
};

Theme.set(ThemeDefault);

module.exports = Theme;
