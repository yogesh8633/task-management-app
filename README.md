# Task Management App

## Description

The Task Management App is a simple and responsive web application designed to help users manage their tasks effectively. Users can add, edit, delete, and mark tasks as completed. Each task can be assigned a priority level (high, medium, or low) which is visually represented using color coding.

### Features
- **Add New Tasks**: Users can create tasks with a title, description, and priority level.
- **Edit Tasks**: Existing tasks can be modified to update their details.
- **Mark Tasks as Completed**: Toggle the completion status of tasks.
- **Delete Tasks**: Remove tasks from the list with a confirmation prompt.
- **Sort Tasks by Priority**: Tasks are sorted dynamically, with high-priority tasks displayed at the top.
- **Search Functionality**: Users can filter tasks by title or description.

## Technology Stack
- **Frontend**: React.js
- **UI Library**: Ant Design
- **State Management**: React hooks for local state management
- **Data Storage**: Local Storage for persistent task management

## Setup Instructions

To set up and run the Task Management App locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yogesh8633/task-management-app.git
   cd task-management-app
   ```
2. **Install Dependencies**:
    ```bash
    npm install
    ```
3. **Start the Development Server**:
    ```bash
    npm run dev
    ```
    Open your browser and navigate to http://localhost:3000 to view the application.
    

## Sorting Tasks by Priority

Tasks are sorted dynamically based on their priority using a simple data structure. The sorting mechanism is implemented in the `sortTasksByPriority` function found in the `utils/taskUtils.js` file.

### Sorting Logic
- A mapping of priority levels to numeric values is created, with `high` mapped to 1, `medium` to 2, and `low` to 3. This allows us to easily compare tasks and sort them accordingly.
- The `sort` function is used to arrange the tasks based on these numeric values, ensuring that high-priority tasks appear at the top of the list.

### Example Sorting Function

Here’s a brief overview of the sorting function:

```javascript
export const sortTasksByPriority = (tasks) => {
  const priorityOrder = { high: 1, medium: 2, low: 3 };
  return tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
};
