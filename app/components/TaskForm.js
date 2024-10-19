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
      layout="inline"
      onFinish={onFinish}
      style={{ marginTop: '20px' }}
    >
      <Form.Item name="title" rules={[{ required: true, message: 'Title is required!' }]}>
        <Input placeholder="Task Title" />
      </Form.Item>
      <Form.Item name="description" rules={[{ required: true, message: 'Description is required!' }]}>
        <Input placeholder="Task Description" />
      </Form.Item>
      <Form.Item name="priority" rules={[{ required: true, message: 'Priority is required!' }]}>
        <Select placeholder="Select Priority">
          <Option value="high">High</Option>
          <Option value="medium">Medium</Option>
          <Option value="low">Low</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          {editingTask ? 'Update Task' : 'Add Task'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
