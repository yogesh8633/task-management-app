"use client";
import { useState } from "react";
import {
  Card,
  Tag,
  Popconfirm,
  Button,
  Select,
  Input,
  Row,
  Col,
  Typography,
  message,
} from "antd";
import { DeleteOutlined, CheckOutlined, EditOutlined } from "@ant-design/icons";
import TaskForm from "./TaskForm";
import { sortTasksByPriority } from "../utils/taskUtils";

const { Option } = Select;
const { Title } = Typography;

const TaskBoard = ({ initialTasks, setTasks }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("priority");
  const [editingTask, setEditingTask] = useState(null);

  const filteredTasks = initialTasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addTask = (newTask) => {
    const updatedTasks = [...initialTasks, newTask];
    setTasks(sortTasksByPriority(updatedTasks));
  };

  const updateTask = (updatedTask) => {
    const updatedTasks = initialTasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(sortTasksByPriority(updatedTasks));
    setEditingTask(null);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = initialTasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    message.success("Task deleted successfully!");
  };

  const toggleComplete = (taskId) => {
    const updatedTasks = initialTasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(sortTasksByPriority(updatedTasks));
  };

  const getSortedTasks = () => {
    let sortedTasks = [...filteredTasks];
    if (sortOption === "name") {
      sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      sortedTasks = sortTasksByPriority(sortedTasks);
    }
    return sortedTasks;
  };

  const TaskCard = ({ task }) => (
    <Card
      title={
        <span className={task.completed ? "line-through text-gray-500" : ""}>
          {task.title}
        </span>
      }
      className={`border-l-4 ${
        task.completed
          ? "opacity-50" // Grayed-out effect for completed tasks
          : task.priority === "high"
          ? "border-red-500"
          : task.priority === "medium"
          ? "border-yellow-500"
          : "border-green-500"
      }`}
      actions={[
        <div className="flex flex-wrap gap-2 justify-between">
          <Button
            type="link"
            onClick={() => toggleComplete(task.id)}
            className="flex-1">
            {task.completed ? "Mark as Incomplete" : "Mark as Complete"}
            <CheckOutlined />
          </Button>
          <Button
            type="link"
            onClick={() => setEditingTask(task)}
            className="flex-1">
            <EditOutlined /> Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => deleteTask(task.id)}
            okText="Yes"
            cancelText="No">
            <Button type="link" danger className="flex-1">
              <DeleteOutlined /> Delete
            </Button>
          </Popconfirm>
        </div>,
      ]}>
      <p className={task.completed ? "line-through text-gray-500" : ""}>
        {task.description}
      </p>
      <Tag
        color={
          task.priority === "high"
            ? "red"
            : task.priority === "medium"
            ? "gold"
            : "green"
        }>
        {task.priority.toUpperCase()}
      </Tag>
      {task.completed && <Tag color="blue">Completed</Tag>}
    </Card>
  );

  return (
    <div className="p-5 bg-gray-100">
      {/* Header */}
      <Title level={2} className="text-center mb-5">
        Task Management Board
      </Title>

      {/* Search Bar and Sorting Option */}
      <Row justify="space-between" align="middle" className="mb-5">
        <Col>
          <Input
            placeholder="Search tasks"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-72"
          />
        </Col>
        <Col>
          <Select
            defaultValue="priority"
            className="w-52 mt-2 md:mt-0"
            onChange={(value) => setSortOption(value)}>
            <Option value="priority">Sort by Priority</Option>
            <Option value="name">Sort by Name</Option>
          </Select>
        </Col>
      </Row>
      {/* Add/Edit Task Form */}
      <TaskForm
        addTask={addTask}
        updateTask={updateTask}
        editingTask={editingTask}
        setEditingTask={setEditingTask}
      />

      {/* Task List */}
      <Row gutter={[16, 16]} className="mt-5">
        {getSortedTasks().map((task) => (
          <Col key={task.id} xs={24} sm={12} md={8}>
            <TaskCard task={task} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TaskBoard;
