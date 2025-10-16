// src/mocks/handlers.ts
import { http, HttpResponse } from 'msw'

const TASKS_KEY = 'mock_tasks'
const TOKEN_KEY = 'mock_token'

interface Task {
  id: string
  title: string
  description: string
  status: string
}

// Helper functions
function readTasks(): Task[] {
  const raw = localStorage.getItem(TASKS_KEY)
  if (!raw) {
    const defaultTasks: Task[] = [
      { id: '1', title: 'First task', description: 'Demo task', status: 'todo' }
    ]
    localStorage.setItem(TASKS_KEY, JSON.stringify(defaultTasks))
    return defaultTasks
  }
  return JSON.parse(raw) as Task[]
}

function writeTasks(tasks: Task[]): void {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
}

export const handlers = [
  // Login: returns fake token & user
  http.post('/api/login', async ({ request }) => {
    const body = await request.json() as { username?: string }
    const username = body.username ?? 'test'
    const token = btoa(`${username}:${Date.now()}`)
    localStorage.setItem(TOKEN_KEY, token)
    
    return HttpResponse.json(
      { token, user: { username } },
      { status: 200 }
    )
  }),

  // GET tasks
  http.get('/api/tasks', ({ request }) => {
    const auth = request.headers.get('authorization') || ''
    if (!auth.startsWith('Bearer')) {
      return HttpResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }
    const tasks = readTasks()
    return HttpResponse.json(tasks, { status: 200 })
  }),

  // POST add task
  http.post('/api/tasks', async ({ request }) => {
    const auth = request.headers.get('authorization') || ''
    if (!auth.startsWith('Bearer')) {
      return HttpResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const body = await request.json() as Partial<Task>
    const tasks = readTasks()
    const newTask: Task = {
      id: String(Date.now()),
      title: body.title || '',
      description: body.description || '',
      status: body.status || 'todo'
    }
    tasks.unshift(newTask)
    writeTasks(tasks)
    
    return HttpResponse.json(newTask, { status: 201 })
  }),

  // PUT update task
  http.put('/api/tasks/:id', async ({ request, params }) => {
    const auth = request.headers.get('authorization') || ''
    if (!auth.startsWith('Bearer')) {
      return HttpResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const { id } = params
    const body = await request.json() as Partial<Task>
    const tasks = readTasks()
    const idx = tasks.findIndex(t => t.id === id)
    
    if (idx === -1) {
      return HttpResponse.json(
        { message: 'Task not found' },
        { status: 404 }
      )
    }
    
    tasks[idx] = { ...tasks[idx], ...body }
    writeTasks(tasks)
    
    return HttpResponse.json(tasks[idx], { status: 200 })
  }),

  // DELETE
  http.delete('/api/tasks/:id', ({ request, params }) => {
    const auth = request.headers.get('authorization') || ''
    if (!auth.startsWith('Bearer')) {
      return HttpResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    const { id } = params
    let tasks = readTasks()
    tasks = tasks.filter(t => t.id !== id)
    writeTasks(tasks)
    
    return HttpResponse.json({ id }, { status: 200 })
  }),
]