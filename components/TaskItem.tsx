'use client';

import React, { useState } from 'react';
import { useTasks, Task } from '@/lib/context/TaskContext';
import { ChevronRight, ChevronDown, Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface TaskItemProps {
  task: Task;
  level: number;
  onAddSubtask: (parentId: string) => void;
  onEditTask: (task: Task) => void;
}

export function TaskItem({
  task,
  level,
  onAddSubtask,
  onEditTask,
}: TaskItemProps) {
  const { tasks, toggleComplete, deleteTask } = useTasks();
  const [isExpanded, setIsExpanded] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const childTasks = tasks.filter((t) => t.parentId === task.id);
  const hasChildren = childTasks.length > 0;

  const handleDelete = () => {
    deleteTask(task.id);
    setShowDeleteDialog(false);
  };

  return (
    <div className="bg-slate-100 rounded-md">
      <div
        className={`task-item group flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-200 hover:bg-slate-200 ${
          task.completed ? 'opacity-60' : ''
        }`}
        style={{ marginLeft: `${level * 24}px` }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {hasChildren ? (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center w-5 h-5 rounded hover:bg-slate-200 transition-colors"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-slate-600" />
            ) : (
              <ChevronRight className="w-4 h-4 text-slate-600" />
            )}
          </button>
        ) : (
          <div className="w-5" />
        )}

        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
          className="w-4 h-4 rounded border-slate-300 text-slate-800 focus:ring-2 focus:ring-slate-400 focus:ring-offset-0 cursor-pointer transition-all"
        />

        <span
          className={`flex-1 text-sm transition-all duration-300 ${
            task.completed
              ? 'line-through text-slate-400'
              : 'text-slate-700'
          }`}
        >
          {task.title}
        </span>

        <div
          className={`flex items-center gap-1 transition-opacity duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-slate-500 hover:text-slate-700 hover:bg-slate-200"
            onClick={() => onAddSubtask(task.id)}
          >
            <Plus className="w-3.5 h-3.5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-slate-500 hover:text-slate-700 hover:bg-slate-200"
            onClick={() => onEditTask(task)}
          >
            <Edit2 className="w-3.5 h-3.5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-slate-500 hover:text-red-600 hover:bg-red-50"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div className="children-container">
          {childTasks.map((childTask) => (
            <TaskItem
              key={childTask.id}
              task={childTask}
              level={level + 1}
              onAddSubtask={onAddSubtask}
              onEditTask={onEditTask}
            />
          ))}
        </div>
      )}

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Task</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this task?
              {hasChildren &&
                ' This will also delete all subtasks permanently.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
