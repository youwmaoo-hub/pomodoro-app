import { useState, useEffect, useCallback } from 'react';
import { Task } from '../types';
import { storage } from '../utils/storage';
import { STORAGE_KEYS } from '../constants';
import { generateId } from '../utils/helpers';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const savedTasks = await storage.getItem<Task[]>(STORAGE_KEYS.TASKS);
    if (savedTasks) {
      setTasks(savedTasks);
    }
    setLoading(false);
  };

  const saveTasks = async (updatedTasks: Task[]) => {
    await storage.setItem(STORAGE_KEYS.TASKS, updatedTasks);
    setTasks(updatedTasks);
  };

  const addTask = useCallback(async (title: string, estimatedPomodoros?: number) => {
    const newTask: Task = {
      id: generateId(),
      title,
      completed: false,
      createdAt: Date.now(),
      pomodoroCount: 0,
      estimatedPomodoros,
    };
    const updatedTasks = [newTask, ...tasks];
    await saveTasks(updatedTasks);
  }, [tasks]);

  const updateTask = useCallback(async (taskId: string, updates: Partial<Task>) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, ...updates } : task
    );
    await saveTasks(updatedTasks);
  }, [tasks]);

  const deleteTask = useCallback(async (taskId: string) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    await saveTasks(updatedTasks);
  }, [tasks]);

  const toggleTask = useCallback(async (taskId: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed,
          completedAt: !task.completed ? Date.now() : undefined,
        };
      }
      return task;
    });
    await saveTasks(updatedTasks);
  }, [tasks]);

  const incrementPomodoroCount = useCallback(async (taskId: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, pomodoroCount: task.pomodoroCount + 1 };
      }
      return task;
    });
    await saveTasks(updatedTasks);
  }, [tasks]);

  return {
    tasks,
    loading,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    incrementPomodoroCount,
  };
};
