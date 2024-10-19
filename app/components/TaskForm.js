'use client';
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, message } from 'antd';

const { Option } = Select;

const TaskForm = ({ addTask, updateTask, editingTask, setEditingTask }) => {
  const [form] = Form.useForm();
  const [initialValues, setInitialValues] = useState({ title: '', description: '', priority: 'medium' });

  useEffect(() => {
    if (editingTask) {
      setInitialValues(editingTask);
      form.setFieldsValue(editingTask); // Populate the form with editingTask data
    }
  }, [editingTask, form]);

  const onFinish = (values) => {
    if (editingTask) {
      updateTask({ ...editingTask, ...values });
      message.success('Task updated successfully!');
    } else {
      addTask({ id: Date.now(), ...values, completed: false });
      message.success('Task added successfully!');
    }
    form.resetFields();
    setEditingTask(null); // Close the editing form
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      className="mt-5 grid grid-cols-1 gap-1 md:grid-cols-4"
    >
      <Form.Item
        name="title"
        rules={[{ required: true, message: 'Title is required!' }]}
        className="md:col-span-1 w-full"
      >
        <Input placeholder="Task Title" className="w-full" />
      </Form.Item>
      <Form.Item
        name="description"
        rules={[{ required: true, message: 'Description is required!' }]}
        className="md:col-span-1 w-full"
      >
        <Input placeholder="Task Description" className="w-full" />
      </Form.Item>
      <Form.Item
        name="priority"
        rules={[{ required: true, message: 'Priority is required!' }]}
        className="md:col-span-1 w-full"
      >
        <Select placeholder="Select Priority" className="w-full">
          <Option value="high">High</Option>
          <Option value="medium">Medium</Option>
          <Option value="low">Low</Option>
        </Select>
      </Form.Item>
      <Form.Item className="md:col-span-1 w-full">
        <Button type="primary" htmlType="submit" className="w-full md:w-auto">
          {editingTask ? 'Update Task' : 'Add Task'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
