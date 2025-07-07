import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useTodoStore } from '../../src/store/todoStore';
import { Todo } from '../../src/db/database';
import TodoForm from '../../src/components/TodoForm';

export default function EditTaskScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { todos } = useTodoStore();
  const [editingTodo, setEditingTodo] = useState<Todo | undefined>();

  useEffect(() => {
    if (id) {
      const todo = todos.find(t => t.id === id);
      setEditingTodo(todo);
    }
  }, [id, todos]);

  return <TodoForm editingTodo={editingTodo} />;
}