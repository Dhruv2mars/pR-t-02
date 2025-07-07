const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Enable context modules for expo-router
config.transformer = {
  ...config.transformer,
  unstable_allowRequireContext: true,
};

// Ensure proper platform resolution with correct order
config.resolver = {
  ...config.resolver,
  platforms: ['web', 'native', 'ios', 'android'],
  alias: {
    // Ensure proper module resolution for web
    'react-native$': 'react-native-web',
  },
};

// Web-specific optimizations
config.transformer.minifierConfig = {
  ...config.transformer.minifierConfig,
  keep_fnames: true,
  mangle: {
    keep_fnames: true,
  },
};

module.exports = config;