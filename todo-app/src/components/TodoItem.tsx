import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { router } from 'expo-router';
import { Todo } from '../db/database';
import { useTodoStore } from '../store/todoStore';

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const { deleteTodo, toggleTodoStatus } = useTodoStore();

  const handleEdit = () => {
    router.push(`/add-edit/${todo.id}`);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => deleteTodo(todo.id)
        },
      ]
    );
  };

  const handleToggleStatus = () => {
    toggleTodoStatus(todo.id);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.content} onPress={handleEdit}>
        <View style={styles.header}>
          <Text style={[
            styles.title,
            todo.status === 'completed' && styles.completedTitle
          ]}>
            {todo.title}
          </Text>
          <View style={styles.actions}>
            <Pressable 
              style={[
                styles.statusButton,
                todo.status === 'completed' ? styles.completedButton : styles.pendingButton
              ]}
              onPress={handleToggleStatus}
            >
              <Text style={[
                styles.statusText,
                todo.status === 'completed' ? styles.completedText : styles.pendingText
              ]}>
                {todo.status === 'completed' ? '✓' : '○'}
              </Text>
            </Pressable>
            <Pressable style={styles.deleteButton} onPress={handleDelete}>
              <Text style={styles.deleteText}>×</Text>
            </Pressable>
          </View>
        </View>
        
        {todo.description && (
          <Text style={[
            styles.description,
            todo.status === 'completed' && styles.completedDescription
          ]}>
            {todo.description}
          </Text>
        )}
        
        <View style={styles.footer}>
          {todo.due_date && (
            <Text style={styles.dueDate}>
              Due: {formatDate(todo.due_date)}
            </Text>
          )}
          <Text style={styles.createdDate}>
            Created: {formatDate(todo.created_at)}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    flex: 1,
    marginRight: 12,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#999999',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  statusButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  pendingButton: {
    borderColor: '#007AFF',
    backgroundColor: '#FFFFFF',
  },
  completedButton: {
    borderColor: '#34C759',
    backgroundColor: '#34C759',
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pendingText: {
    color: '#007AFF',
  },
  completedText: {
    color: '#FFFFFF',
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF3B30',
  },
  deleteText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
    lineHeight: 20,
  },
  completedDescription: {
    textDecorationLine: 'line-through',
    color: '#999999',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dueDate: {
    fontSize: 12,
    color: '#FF9500',
    fontWeight: '500',
  },
  createdDate: {
    fontSize: 12,
    color: '#999999',
  },
});