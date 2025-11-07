'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTasks, Task } from '@/lib/context/TaskContext';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AddTaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  parentId?: string | null;
  editTask?: Task | null;
}

export function AddTaskForm({
  isOpen,
  onClose,
  parentId = null,
  editTask = null,
}: AddTaskFormProps) {
  const { addTask, updateTask } = useTasks();
  const [title, setTitle] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      if (editTask) {
        setTitle(editTask.title);
      } else {
        setTitle('');
      }
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen, editTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      if (editTask) {
        updateTask(editTask.id, title.trim());
      } else {
        addTask(title.trim(), parentId);
      }
      setTitle('');
      handleClose();
    }
  };

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setTitle('');
      onClose();
    }, 200);
  };

  if (!isOpen && !isAnimating) return null;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-200 ${
          isAnimating ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={handleClose}
      />
      <div
        className={`fixed top-1/2 left-1/2 w-full max-w-md z-50 transition-all duration-300 ${
          isAnimating
            ? 'opacity-100 scale-100 -translate-x-1/2 -translate-y-1/2'
            : 'opacity-0 scale-95 -translate-x-1/2 -translate-y-1/2 pointer-events-none'
        }`}
      >
        <div className="bg-white rounded-xl shadow-2xl p-6 mx-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800">
              {editTask ? 'Edit Task' : parentId ? 'Add Subtask' : 'Add Task'}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-8 w-8 text-slate-500 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Enter task title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
            />

            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="px-4"
              >
                Cancel
              </Button>
              <Button type="submit" className="px-4">
                {editTask ? 'Update' : 'Add'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
