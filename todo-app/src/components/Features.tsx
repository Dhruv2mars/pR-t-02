import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Features() {
  const features = [
    {
      title: 'Create & Manage Tasks',
      description: 'Add to-do items with title, description, and due dates',
    },
    {
      title: 'Update & Edit',
      description: 'Easily modify your tasks and mark them as completed',
    },
    {
      title: 'Delete Tasks',
      description: 'Remove completed or unwanted tasks with confirmation',
    },
    {
      title: 'Offline Support',
      description: 'Works completely offline with local SQLite storage',
    },
    {
      title: 'Minimalist Design',
      description: 'Clean, distraction-free interface focused on productivity',
    },
    {
      title: 'Filter & Organize',
      description: 'View all tasks, pending only, or completed tasks',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Features</Text>
      <View style={styles.grid}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureCard}>
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureDescription}>{feature.description}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FA',
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 40,
    fontFamily: 'Inter',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 1200,
    gap: 20,
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    padding: 30,
    borderRadius: 12,
    width: 350,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 12,
    fontFamily: 'Inter',
  },
  featureDescription: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    fontFamily: 'Inter',
  },
});