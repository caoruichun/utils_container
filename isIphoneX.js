const phoneModel = () => {
  let ua = window.navigator.userAgent,
    width = window.screen.width,
    height = window.screen.height,
    ratio = window.devicePixelRatio;
  if (/iphone/gi.test(ua)) {
    if (/iphone/gi.test(ua) && ratio === 3 && width === 375 && height === 812) {
      return true;
      // return "iPhone X,iPhone XS";
    }
    if (/iphone/gi.test(ua) && ratio === 3 && width === 414 && height === 896) {
      return true;
      // return "iPhone XS Max";
    }
    if (/iphone/gi.test(ua) && ratio === 2 && width === 414 && height === 896) {
      return true;
      // return "iPhone XR";
    }
  }
  return false;
};

export default phoneModel;
