# Task Management Application

A modern, hierarchical task management application built with Next.js, TypeScript, and Tailwind CSS. This application allows users to create, organize, and manage tasks with nested subtasks, providing an intuitive interface for personal task management.

## Features

- Hierarchical task organization with unlimited nesting
- Real-time task updates with localStorage persistence
- Responsive design that works across all devices
- Clean, modern UI with Tailwind CSS
- Interactive hover states and smooth transitions

## Technology Stack

- **Frontend Framework**: Next.js 13
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **UI Components**: Custom components with shadcn/ui
- **Icons**: Lucide React
- **Storage**: Browser LocalStorage - Temporary

## Getting Started

### Prerequisites

- Node.js 16.8.0 or newer
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone [https://github.com/Evarmedia/todolist_fs.git]
cd todolist_fs
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Usage

### Creating Tasks
- Click the "Add Task" button to create a new top-level task
- Use the "+" button next to any task to create a subtask

### Managing Tasks
- Toggle task completion with the checkbox
- Expand/collapse subtasks using the chevron icon
- Edit tasks using the pencil icon
- Delete tasks using the trash icon

### Task Organization
- Tasks can be nested indefinitely
- Parent tasks show a summary of subtask completion
- Tasks maintain their hierarchy even after page refresh

## Project Structure

```
todolist_fs/
├── app/                 # Next.js app directory
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   ├── AddTaskForm.tsx
│   ├── TaskItem.tsx
│   └── TutorialPrompt.tsx
├── lib/               # Utilities and contexts
│   ├── context/       # React contexts
│   └── utils.ts       # Helper functions
└── public/            # Static assets
```

## Data Persistence

The application uses browser localStorage temporarily for data persistence. Tasks are automatically saved and retrieved from localStorage, ensuring your tasks remain available between sessions.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- UI Components inspired by [shadcn/ui](https://ui.shadcn.com/)
- Icons provided by [Lucide](https://lucide.dev/)
- Built with [Next.js](https://nextjs.org/)