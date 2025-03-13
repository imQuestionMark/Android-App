/* eslint-env node */

const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const {
  wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config');

const config = getDefaultConfig(__dirname);
config.server = {
  port: 8888,
};

module.exports = withNativeWind(wrapWithReanimatedMetroConfig(config), {
  input: './global.css',
});
