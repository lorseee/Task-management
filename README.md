 Task Manager Frontend

A simple Task Manager frontend built with React,TypeScript, Ant Design, and Redux Toolkit. It includes a mocked authentication flow for local development.

**
To start:
Make sure you have the following installed:

- Node.js
- npm or yarn
- Git
create project 
install dependencies
and to run locally npm start 
The app will run at a local server.
**

**
The project does not connect to a real backend. All API requests are mocked for development purposes.

Styling is based on Tailwind CSS and Ant Design.

The layout includes a centered header and Logout button on the right.
**

- Authentication System : Mock login/logout with JWT-style token management
- Task Management: Full CRUD operations for tasks
- Status Tracking: Track tasks as To Do, In Progress, or Completed
- Modern UI: Clean, responsive design with Tailwind CSS
-State Management: Redux Toolkit for predictable state updates
- Mocked API: Mock Service Worker for simulating backend responses
- Protected Routes: Authentication-based route protection


Technologies utilized:

- React(v18) - UI library
- TypeScript - Type safety
- Redux Toolkit - State management
- React Router - Client-side routing
- Mock Service Worker - API mocking
- Axios - HTTP client
- Tailwind CSS - Styling
- Shadcn UI - Component library
- Vite - Build tool

File Structure 

├── src/
│   ├── api/
│   │   └── axios.ts             # Axios instance (TS)
│   ├── app/
│   │   └── store.ts             # Redux store (TS)
│   ├── components/
│   │   ├── Layout.tsx           # Layout (TSX)
│   │   └── ProtectedRoute.tsx   # Route protection (TSX)
│   ├── features/
│   │   ├── auth/
│   │   │   ├── authSlice.ts     # Auth state (TS)
│   │   │   └── Login.tsx        # Login page (TSX)
│   │   └── tasks/
│   │   │   ├── tasksSlice.ts    # Tasks state (TS)
│   │   │   ├── TaskForm.tsx     # Task form (TSX)
│   │   │   └── TaskList.tsx     # Task list (TSX)
│   ├── hooks/                     # New directory
│   │     
│   ├── mocks/
│   │   ├── browser.ts           # MSW config (TS)
│   │   ├── handlers.ts          # API mock handlers (TS)
│   │   └── tasks.ts             # Tasks mock data (TS)
│   ├── pages/
│   │   └── Dashboard.tsx        # Dashboard page (TSX)
│   ├── styles/
│   │   └── index.css            # Global CSS styles
│   ├── App.tsx                  # App component (TSX)
│   ├── main.tsx                 # Entry point (TSX)
│   └── types.ts                 # TypeScript type definitions
└── package.json