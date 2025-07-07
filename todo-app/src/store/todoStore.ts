import { create } from 'zustand';
import { database, Todo } from '../db/database';

export type FilterType = 'all' | 'pending' | 'completed';

interface TodoFormData {
  title: string;
  description: string;
  due_date: string;
  status: 'pending' | 'completed';
}

interface TodoStore {
  todos: Todo[];
  filter: FilterType;
  isLoading: boolean;
  error: string | null;
  formData: TodoFormData;
  
  // Actions
  setFilter: (filter: FilterType) => void;
  setFormData: (data: Partial<TodoFormData>) => void;
  resetFormData: () => void;
  loadTodos: () => Promise<void>;
  addTodo: (todo: Omit<Todo, 'id' | 'created_at'>) => Promise<void>;
  updateTodo: (id: string, updates: Partial<Omit<Todo, 'id' | 'created_at'>>) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  toggleTodoStatus: (id: string) => Promise<void>;
  clearError: () => void;
}

const initialFormData: TodoFormData = {
  title: '',
  description: '',
  due_date: '',
  status: 'pending',
};

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  filter: 'all',
  isLoading: false,
  error: null,
  formData: initialFormData,

  setFilter: (filter) => set({ filter }),

  setFormData: (data) => set((state) => ({
    formData: { ...state.formData, ...data }
  })),

  resetFormData: () => set({ formData: initialFormData }),

  clearError: () => set({ error: null }),

  loadTodos: async () => {
    set({ isLoading: true, error: null });
    try {
      const { filter } = get();
      const statusFilter = filter === 'all' ? undefined : filter;
      const todos = await database.getTodos(statusFilter);
      set({ todos, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to load tasks',
        isLoading: false 
      });
    }
  },

  addTodo: async (todoData) => {
    set({ isLoading: true, error: null });
    try {
      const newTodo = await database.addTodo(todoData);
      set((state) => ({
        todos: [newTodo, ...state.todos],
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to add task',
        isLoading: false 
      });
      throw error;
    }
  },

  updateTodo: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      await database.updateTodo(id, updates);
      set((state) => ({
        todos: state.todos.map(todo => 
          todo.id === id ? { ...todo, ...updates } : todo
        ),
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update task',
        isLoading: false 
      });
      throw error;
    }
  },

  deleteTodo: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await database.deleteTodo(id);
      set((state) => ({
        todos: state.todos.filter(todo => todo.id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to delete task',
        isLoading: false 
      });
      throw error;
    }
  },

  toggleTodoStatus: async (id) => {
    const todo = get().todos.find(t => t.id === id);
    if (!todo) return;

    const newStatus = todo.status === 'pending' ? 'completed' : 'pending';
    await get().updateTodo(id, { status: newStatus });
  },
}));