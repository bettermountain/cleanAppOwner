import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PageContainer } from '@/components/layout/page-container'
import { List, ListItem, Checkbox, ListItemText, IconButton } from '@mui/material'
import { Trash2 } from 'lucide-react'

// Dashboard page displaying an interactive TODO list
export function DashboardPage() {
  // Manage list of tasks. In real app this might come from server
  const [tasks, setTasks] = useState([
    { id: 1, text: 'レビュー対応', completed: false },
    { id: 2, text: '新規依頼の確認', completed: false },
  ])
  // Controlled input state for new task text
  const [newTask, setNewTask] = useState('')

  // Add a new task to the list
  const addTask = () => {
    if (!newTask.trim()) return
    setTasks([...tasks, { id: Date.now(), text: newTask.trim(), completed: false }])
    setNewTask('')
  }

  // Toggle completion state of a task
  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  // Remove a task from the list
  const removeTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  return (
    <PageContainer>
      {/* Page heading */}
      <h1 className="text-3xl font-bold">ダッシュボード</h1>

      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>やることリスト</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Input and button to add new tasks */}
          <div className="flex gap-2 mb-4">
            <Input
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
              placeholder="タスクを入力..."
            />
            <Button onClick={addTask}>追加</Button>
          </div>

          {/* Render task list */}
          <List>
            {tasks.map(task => (
              <ListItem
                key={task.id}
                divider
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => removeTask(task.id)}>
                    <Trash2 size={16} />
                  </IconButton>
                }
              >
                <Checkbox
                  edge="start"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <ListItemText
                  primary={task.text}
                  sx={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </PageContainer>
  )
}
