import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { database } from '../db/database';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function AppNavigator() {
  useEffect(() => {
    const initializeApp = async () => {
      try {
        await database.init();
        await SplashScreen.hideAsync();
      } catch (error) {
        console.error('Failed to initialize app:', error);
        await SplashScreen.hideAsync();
      }
    };

    initializeApp();
  }, []);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontFamily: 'Inter',
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
  );
}