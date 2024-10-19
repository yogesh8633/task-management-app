// app/utils/taskUtils.js

export const sortTasksByPriority = (tasks) => {
  const priorityOrder = { high: 1, medium: 2, low: 3 };
  return tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
};

export const getInitialTasks = () => {
  return [
    {
      id: 1,
      title: 'Task 1',
      description: 'Description for task 1',
      priority: 'high',
      completed: false,
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'Description for task 2',
      priority: 'medium',
      completed: false,
    },
    {
      id: 3,
      title: 'Task 3',
      description: 'Description for task 3',
      priority: 'low',
      completed: false,
    },
  ];
};
