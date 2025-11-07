'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  parentId: string | null;
  createdAt: number;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string, parentId: string | null) => void;
  updateTask: (id: string, title: string) => void;
  toggleComplete: (id: string) => void;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (title: string, parentId: string | null) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      parentId,
      createdAt: Date.now(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (id: string, title: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, title } : task))
    );
  };

  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => {
      const deleteRecursive = (taskId: string): string[] => {
        const childIds = prev
          .filter((t) => t.parentId === taskId)
          .flatMap((t) => deleteRecursive(t.id));
        return [taskId, ...childIds];
      };

      const idsToDelete = deleteRecursive(id);
      return prev.filter((task) => !idsToDelete.includes(task.id));
    });
  };

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTask, toggleComplete, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
}
