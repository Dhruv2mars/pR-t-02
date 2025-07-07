import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { database } from '../src/db/database';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';

// Enable screens for new architecture compatibility
try {
  const { enableScreens } = require('react-native-screens');
  enableScreens(true);
} catch (error) {
  console.warn('Failed to enable screens:', error);
}

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Load fonts with error handling
        try {
          await Font.loadAsync({
            Inter: Inter_400Regular,
            'Inter-Medium': Inter_500Medium,
            'Inter-SemiBold': Inter_600SemiBold,
            'Inter-Bold': Inter_700Bold,
          });
        } catch (fontError) {
          console.warn('Failed to load custom fonts, using system fonts:', fontError);
        }
        
        // Initialize database with error handling
        try {
          await database.init();
        } catch (dbError) {
          console.error('Failed to initialize database:', dbError);
          // Continue without database - app should still work
        }
        
        setAppIsReady(true);
      } catch (error) {
        console.error('Failed to initialize app:', error);
        setAppIsReady(true);
      } finally {
        try {
          await SplashScreen.hideAsync();
        } catch (splashError) {
          console.warn('Failed to hide splash screen:', splashError);
        }
      }
    };

    initializeApp();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontFamily: Platform.OS === 'ios' ? 'Inter-SemiBold' : 'Inter_600SemiBold',
          },
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ 
            title: 'To-Do App',
            headerShown: true,
          }} 
        />
        <Stack.Screen 
          name="add-edit/[id]" 
          options={{ 
            title: 'Edit Task',
            headerShown: true,
          }} 
        />
        <Stack.Screen 
          name="add-edit/index" 
          options={{ 
            title: 'Add Task',
            headerShown: true,
          }} 
        />
      </Stack>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}