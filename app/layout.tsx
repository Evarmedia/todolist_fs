import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { TaskProvider } from '@/lib/context/TaskContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ToDo List - Organize Your Tasks',
  description: 'A modern task management app with nested subtasks',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TaskProvider>{children}</TaskProvider>
      </body>
    </html>
  );
}
