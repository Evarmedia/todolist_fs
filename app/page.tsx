'use client';

import { useState } from 'react';
import { useTasks, Task } from '@/lib/context/TaskContext';
import { TaskItem } from '@/components/TaskItem';
import { AddTaskForm } from '@/components/AddTaskForm';
import { TutorialPrompt } from '@/components/TutorialPrompt';
import { Plus, CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { tasks } = useTasks();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [parentId, setParentId] = useState<string | null>(null);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [showTutorial, setShowTutorial] = useState(true);

  const rootTasks = tasks.filter((task) => task.parentId === null);
  const shouldShowTutorial = showTutorial && rootTasks.length === 0;

  const handleAddTask = () => {
    setParentId(null);
    setEditTask(null);
    setIsFormOpen(true);
  };

  const handleAddSubtask = (parentTaskId: string) => {
    setParentId(parentTaskId);
    setEditTask(null);
    setIsFormOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditTask(task);
    setParentId(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setParentId(null);
    setEditTask(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <CheckSquare className="w-8 h-8 text-slate-700" />
            <h1 className="text-3xl font-bold text-slate-800">ToDo List</h1>
          </div>
          <p className="text-slate-600">
            Organize your tasks with nested subtasks
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-20">
          {rootTasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckSquare className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-medium text-slate-700 mb-2">
                No tasks yet
              </h3>
              <p className="text-slate-500 mb-4">
                Click to get started your first task
              </p>
              <Button onClick={handleAddTask} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Your First Task
              </Button>
            </div>
          ) : (
            <div className="space-y-1">
              {rootTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  level={0}
                  onAddSubtask={handleAddSubtask}
                  onEditTask={handleEditTask}
                />
              ))}
            </div>
          )}
        </div>

        <button
          onClick={handleAddTask}
          className="fixed bottom-8 right-8 w-14 h-14 bg-slate-800 hover:bg-slate-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group hover:scale-110 active:scale-95"
          aria-label="Add task"
        >
          <Plus className="w-6 h-6 transition-transform group-hover:rotate-90 duration-300" />
        </button>

        <AddTaskForm
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          parentId={parentId}
          editTask={editTask}
        />

        <TutorialPrompt
          isVisible={shouldShowTutorial}
          onDismiss={() => setShowTutorial(false)}
        />
      </div>
    </div>
  );
}
