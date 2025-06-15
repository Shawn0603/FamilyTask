// src/store/useTaskStore.ts
import { create } from 'zustand';
import type { Task } from '../types/task';

interface TaskStore {
  tasks: Task[];
  addTask: (text: string) => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  restoreTask: (id: number) => void;
  permanentlyDeleteTask: (id: number) => void;
  updateTask: (id: number, updates: Partial<Task>) => void;
  setTasks: (tasks: Task[]) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),

  addTask: (text) => set((state) => {
    const newTask: Task = {
      id: Date.now(),
      text,
      completed: false,
      deleted: false,
      createdAt: new Date().toISOString(),
    };
    const updated = [newTask, ...state.tasks];
    localStorage.setItem('tasks', JSON.stringify(updated));
    return { tasks: updated };
  }),

  toggleTask: (id) => set((state) => {
    const updated = state.tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    localStorage.setItem('tasks', JSON.stringify(updated));
    return { tasks: updated };
  }),

  deleteTask: (id) => set((state) => {
    const updated = state.tasks.map(task =>
      task.id === id ? { ...task, deleted: true } : task
    );
    localStorage.setItem('tasks', JSON.stringify(updated));
    return { tasks: updated };
  }),

  restoreTask: (id) => set((state) => {
    const updated = state.tasks.map(task =>
      task.id === id ? { ...task, deleted: false } : task
    );
    localStorage.setItem('tasks', JSON.stringify(updated));
    return { tasks: updated };
  }),

  permanentlyDeleteTask: (id) => set((state) => {
    const updated = state.tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(updated));
    return { tasks: updated };
  }),

  updateTask: (id, updates) => set((state) => {
    const updated = state.tasks.map(task =>
      task.id === id ? { ...task, ...updates } : task
    );
    localStorage.setItem('tasks', JSON.stringify(updated));
    return { tasks: updated };
  }),

  setTasks: (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    set({ tasks });
  }
}));
