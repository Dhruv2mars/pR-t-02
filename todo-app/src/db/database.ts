import * as SQLite from 'expo-sqlite';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  due_date?: string;
  status: 'pending' | 'completed';
  created_at: string;
}

class Database {
  private db: SQLite.SQLiteDatabase | null = null;

  async init(): Promise<void> {
    try {
      this.db = await SQLite.openDatabaseAsync('todo.db');
      await this.createTables();
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Failed to initialize database:', error);
      // Try to recover by creating a new database
      try {
        this.db = await SQLite.openDatabaseAsync('todo_backup.db');
        await this.createTables();
        console.log('Database recovered with backup');
      } catch (recoveryError) {
        console.error('Failed to recover database:', recoveryError);
        throw new Error('Failed to initialize database');
      }
    }
  }

  private async createTables(): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS todos (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        due_date TEXT,
        status TEXT NOT NULL DEFAULT 'pending',
        created_at TEXT NOT NULL
      );
    `;

    try {
      await this.db.execAsync(createTableQuery);
    } catch (error) {
      console.error('Failed to create tables:', error);
      throw new Error('Failed to create tables');
    }
  }

  async addTodo(todo: Omit<Todo, 'id' | 'created_at'>): Promise<Todo> {
    if (!this.db) throw new Error('Database not initialized');

    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const created_at = new Date().toISOString();
    
    const newTodo: Todo = {
      id,
      created_at,
      ...todo,
    };

    try {
      await this.db.runAsync(
        'INSERT INTO todos (id, title, description, due_date, status, created_at) VALUES (?, ?, ?, ?, ?, ?)',
        [newTodo.id, newTodo.title, newTodo.description || null, newTodo.due_date || null, newTodo.status, newTodo.created_at]
      );
      return newTodo;
    } catch (error) {
      console.error('Failed to add todo:', error);
      throw new Error('Failed to save task');
    }
  }

  async getTodos(statusFilter?: 'pending' | 'completed'): Promise<Todo[]> {
    if (!this.db) throw new Error('Database not initialized');

    try {
      let query = 'SELECT * FROM todos ORDER BY created_at DESC';
      let params: any[] = [];

      if (statusFilter) {
        query = 'SELECT * FROM todos WHERE status = ? ORDER BY created_at DESC';
        params = [statusFilter];
      }

      const result = await this.db.getAllAsync(query, params);
      return result as Todo[];
    } catch (error) {
      console.error('Failed to get todos:', error);
      throw new Error('Failed to load tasks');
    }
  }

  async updateTodo(id: string, updates: Partial<Omit<Todo, 'id' | 'created_at'>>): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const fields = Object.keys(updates);
    const values = Object.values(updates);
    
    if (fields.length === 0) return;

    const setClause = fields.map(field => `${field} = ?`).join(', ');
    const query = `UPDATE todos SET ${setClause} WHERE id = ?`;

    try {
      await this.db.runAsync(query, [...values, id]);
    } catch (error) {
      console.error('Failed to update todo:', error);
      throw new Error('Failed to update task');
    }
  }

  async deleteTodo(id: string): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    try {
      await this.db.runAsync('DELETE FROM todos WHERE id = ?', [id]);
    } catch (error) {
      console.error('Failed to delete todo:', error);
      throw new Error('Failed to delete task');
    }
  }

  async deleteAllTodos(): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    try {
      await this.db.runAsync('DELETE FROM todos');
    } catch (error) {
      console.error('Failed to delete all todos:', error);
      throw new Error('Failed to clear all tasks');
    }
  }
}

export const database = new Database();