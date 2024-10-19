'use client';
import TaskBoard from './components/TaskBoard';
import { useEffect, useState } from 'react';
import { getInitialTasks } from './utils/taskUtils';

export default function Home() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from localStorage or initialize with default tasks
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      setTasks(getInitialTasks()); // Fallback to initial tasks if no localStorage data
    }
  }, []);

  // Update localStorage whenever tasks are updated
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  return <TaskBoard initialTasks={tasks} setTasks={setTasks} />;
}
