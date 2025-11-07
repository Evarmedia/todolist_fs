'use client';

import { ChevronRight, Lightbulb } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTasks } from '../lib/context/TaskContext';

interface TutorialPromptProps {
  isVisible: boolean;
  onDismiss: () => void;
}

export function TutorialPrompt({ isVisible, onDismiss }: TutorialPromptProps) {
  const { tasks } = useTasks();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsAnimating(true);
    }
  }, [isVisible]);

  const handleDismiss = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onDismiss();
    }, 200);
  };

  if (tasks && tasks.length > 0) return null;

  if (!isVisible && !isAnimating) return null;

  return (
    <div
      className={`fixed bottom-24 right-8 z-30 transition-all duration-200 ${
        isAnimating
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-xs">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <Lightbulb className="w-5 h-5 text-amber-500" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-800 mb-2">
              Get started with your first task
            </p>
            <p className="text-xs text-slate-600 mb-3">
              Click the plus button below to create and organize your tasks.
            </p>
            <button
              onClick={handleDismiss}
              className="text-xs text-slate-600 hover:text-slate-800 font-medium flex items-center gap-1 transition-colors"
            >
              Got it <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
        <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white rounded-sm rotate-45 shadow-lg" />
      </div>
    </div>
  );
}
