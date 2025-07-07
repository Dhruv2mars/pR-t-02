import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { router } from 'expo-router';
import TodoList from '../src/components/TodoList';

export default function MainScreen() {
  const handleAddTask = () => {
    router.push('/add-edit');
  };

  return (
    <View style={styles.container}>
      <TodoList />
      
      <Pressable style={styles.fab} onPress={handleAddTask}>
        <Text style={styles.fabText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
});