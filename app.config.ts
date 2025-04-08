/* eslint-disable max-lines-per-function */
import type { ConfigContext, ExpoConfig } from '@expo/config';
import type { AppIconBadgeConfig } from 'app-icon-badge/types';

import { ClientEnv, Env } from './env';

const appIconBadgeConfig: AppIconBadgeConfig = {
  enabled: Env.APP_ENV !== 'production' && Env.APP_ENV !== 'staging',
  badges: [
    {
      text: Env.APP_ENV,
      type: 'banner',
      color: 'white',
    },
    {
      text: Env.VERSION.toString(),
      type: 'ribbon',
      color: 'white',
    },
  ],
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: Env.NAME,
  description: `${Env.NAME} Mobile App`,
  owner: Env.EXPO_ACCOUNT_OWNER,
  scheme: Env.SCHEME,
  slug: 'banana',
  version: Env.VERSION.toString(),
  orientation: 'portrait',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  updates: {
    enabled: true,
    fallbackToCacheTimeout: 0,
    url: Env.EAS_UPDATE_URL,
  },
  runtimeVersion: {
    policy: 'appVersion',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: Env.BUNDLE_ID,
    icon: {
      dark: './assets/icons/ios-dark.png',
      light: './assets/icons/ios-light.png',
      tinted: './assets/icons/ios-tinted.png',
    },
    buildNumber: '1',
  },
  experiments: {
    typedRoutes: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/icons/adaptive-icon.png',
      monochromeImage: './assets/icons/adaptive-icon.png',
      backgroundColor: '#2800C9',
    },
    permissions: [
      'android.permission.READ_EXTERNAL_STORAGE',
      'android.permission.MANAGE_DOCUMENTS',
    ],
    package: Env.PACKAGE,
    versionCode: 1,
  },
  web: {
    favicon: './assets/icons/adaptive-icon.png',
    bundler: 'metro',
  },
  plugins: [
    [
      'expo-splash-screen',
      {
        backgroundColor: '#2800C9',
        image: './assets/icons/splash-icon-light.png',
        imageWidth: 250,
        resizeMode: 'cover',
        dark: {
          backgroundColor: '#000',
          image: './assets/icons/splash-icon-dark.png',
        },
      },
    ],
    [
      'expo-font',
      {
        fonts: [
          './assets/fonts/Poppins-Black.ttf',
          './assets/fonts/Poppins-Bold.ttf',
          './assets/fonts/Poppins-ExtraBold.ttf',
          './assets/fonts/Poppins-ExtraLight.ttf',
          './assets/fonts/Poppins-Light.ttf',
          './assets/fonts/Poppins-Medium.ttf',
          './assets/fonts/Poppins-Regular.ttf',
          './assets/fonts/Poppins-SemiBold.ttf',
          './assets/fonts/Poppins-Thin.ttf',
        ],
      },
    ],
    'expo-localization',
    'expo-router',
    'expo-secure-store',
    ['app-icon-badge', appIconBadgeConfig],
    [
      'react-native-edge-to-edge',
      {
        android: {
          parentTheme: 'Light',
          // enforceNavigationBarContrast: false,
        },
      },
    ],
    'expo-document-picker',
    [
      'expo-image-picker',
      {
        photosPermission:
          'The app accesses your photos to let you share them with your friends.',
      },
    ],
    '@config-plugins/react-native-pdf',
    '@config-plugins/react-native-blob-util',
  ],
  extra: {
    ...ClientEnv,
    eas: {
      projectId: Env.EAS_PROJECT_ID,
    },
  },
});
