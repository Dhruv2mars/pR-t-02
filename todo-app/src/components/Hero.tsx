import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Hero() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simple Offline To-Do App</Text>
      <Text style={styles.subtitle}>
        Manage your tasks efficiently with our minimalist, offline-first to-do application
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 80,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 400,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Inter',
  },
  subtitle: {
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
    maxWidth: 600,
    lineHeight: 28,
    fontFamily: 'Inter',
  },
});