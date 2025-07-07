import { registerRootComponent } from 'expo';
import { Platform } from 'react-native';

if (Platform.OS === 'web') {
  // For web, use the landing page directly
  const LandingPage = require('./src/components/LandingPage').default;
  registerRootComponent(LandingPage);
} else {
  // For native platforms, use expo-router
  const { ExpoRoot } = require('expo-router');
  const ctx = require.context('./app', true, /\.(js|jsx|ts|tsx)$/);
  registerRootComponent(() => ExpoRoot({ context: ctx }));
}