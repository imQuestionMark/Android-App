/* eslint-env node */

const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);
config.server = {
  port: 8888,
};

module.exports = withNativeWind(config, { input: './global.css' });
