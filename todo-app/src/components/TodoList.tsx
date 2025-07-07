import React, { useEffect, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, ActivityIndicator } from 'react-native';
import { useTodoStore, FilterType } from '../store/todoStore';
import TodoItem from './TodoItem';
import { Todo } from '../db/database';

export default function TodoList() {
  const { 
    todos, 
    filter, 
    isLoading, 
    error, 
    setFilter, 
    loadTodos, 
    clearError 
  } = useTodoStore();

  useEffect(() => {
    loadTodos();
  }, [filter, loadTodos]);

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      if (filter === 'all') return true;
      return todo.status === filter;
    });
  }, [todos, filter]);

  const renderFilterButton = useCallback((filterType: FilterType, label: string) => (
    <Pressable
      style={[
        styles.filterButton,
        filter === filterType && styles.activeFilterButton
      ]}
      onPress={() => setFilter(filterType)}
    >
      <Text style={[
        styles.filterButtonText,
        filter === filterType && styles.activeFilterButtonText
      ]}>
        {label}
      </Text>
    </Pressable>
  ), [filter, setFilter]);

  const renderTodo = useCallback(({ item }: { item: Todo }) => (
    <TodoItem todo={item} />
  ), []);

  const keyExtractor = useCallback((item: Todo) => item.id, []);

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateText}>
        {filter === 'all' 
          ? 'No tasks yet. Add your first task!' 
          : filter === 'pending'
          ? 'No pending tasks. Great job!'
          : 'No completed tasks yet.'
        }
      </Text>
    </View>
  );

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.retryButton} onPress={() => { clearError(); loadTodos(); }}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        {renderFilterButton('all', 'All')}
        {renderFilterButton('pending', 'Pending')}
        {renderFilterButton('completed', 'Completed')}
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading tasks...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredTodos}
          renderItem={renderTodo}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyState}
          removeClippedSubviews={true}
          maxToRenderPerBatch={10}
          windowSize={10}
          initialNumToRender={10}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E7',
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    borderWidth: 1,
    borderColor: '#E5E5E7',
  },
  activeFilterButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  activeFilterButtonText: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingVertical: 8,
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 64,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  loadingText: {
    fontSize: 16,
    color: '#666666',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 16,
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});