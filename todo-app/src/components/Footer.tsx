import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Built with ❤️ by Team OpenCode
      </Text>
      <Text style={styles.subtext}>
        Created for the Hackathon Challenge
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333333',
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    fontFamily: 'Inter',
  },
  subtext: {
    color: '#CCCCCC',
    fontSize: 14,
    fontFamily: 'Inter',
  },
});