import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Hero from './Hero';
import Features from './Features';
import Download from './Download';
import Footer from './Footer';

export default function LandingPage() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Hero />
      <Features />
      <Download />
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flexGrow: 1,
  },
});