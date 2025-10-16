import React, { useEffect } from "react";
import { Form, Input, Button, Select } from "antd";
import type { Task } from "./tasksSlice";

interface TaskFormProps {
  onSubmit: (values: Omit<Task, "id">) => void;
  editingTask?: Task | null;
}

interface TaskFormValues {
  title: string;
  description: string;
  status: "pending" | "completed";
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, editingTask }) => {
  const [form] = Form.useForm<TaskFormValues>();

  useEffect(() => {
    if (editingTask) {
      form.setFieldsValue(editingTask);
    } else {
      form.resetFields();
    }
  }, [editingTask, form]);

  const handleFinish = (values: TaskFormValues) => {
    onSubmit(values);
    form.resetFields();
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
        className="max-w-2xl mx-auto"
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please enter a task title" }]}
        >
          <Input placeholder="Task title" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <Input.TextArea rows={2} placeholder="Task description" />
        </Form.Item>

        <Form.Item name="status" label="Status" initialValue="pending">
          <Select
            options={[
              { value: "pending", label: "Pending" },
              { value: "completed", label: "Completed" },
            ]}
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          className="w-full bg-blue-500 hover:bg-blue-600"
        >
          {editingTask ? "Update Task" : "Add Task"}
        </Button>
      </Form>
    </div>
  );
};

export default TaskForm;
