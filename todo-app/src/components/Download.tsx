import React from 'react';
import { View, Text, StyleSheet, Pressable, Linking } from 'react-native';

export default function Download() {
  const handleDownload = () => {
    Linking.openURL('https://github.com/Dhruv2mars/pR-t-02/releases/download/v0.0.1/application-64978fc2-7cd0-4225-b3fb-0a6ccd9caaff.apk');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Download the App</Text>
      <Text style={styles.description}>
        Get the Android APK and start managing your tasks offline
      </Text>
      
      <Pressable style={styles.downloadButton} onPress={handleDownload}>
        <Text style={styles.downloadButtonText}>Download APK</Text>
      </Pressable>
      
      <View style={styles.instructions}>
        <Text style={styles.instructionsTitle}>Installation Instructions:</Text>
        <Text style={styles.instructionStep}>1. Download the APK file</Text>
        <Text style={styles.instructionStep}>2. Enable "Install from Unknown Sources" in your Android settings</Text>
        <Text style={styles.instructionStep}>3. Open the downloaded APK file to install</Text>
        <Text style={styles.instructionStep}>4. Launch the app and start organizing your tasks!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
    fontFamily: 'Inter',
  },
  description: {
    fontSize: 18,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 40,
    maxWidth: 600,
    fontFamily: 'Inter',
  },
  downloadButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 40,
  },
  downloadButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Inter',
  },
  instructions: {
    backgroundColor: '#F8F9FA',
    padding: 30,
    borderRadius: 12,
    maxWidth: 600,
    width: '100%',
  },
  instructionsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
    fontFamily: 'Inter',
  },
  instructionStep: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
    fontFamily: 'Inter',
  },
});