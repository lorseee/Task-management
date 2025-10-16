// src/features/tasks/TaskList.tsx
import React, { useEffect, useState } from "react";
import { Table, Button, Space, Tag, Popconfirm, message } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchTasks, deleteTask, addTask, updateTask } from "./tasksSlice";
import type { Task } from "./tasksSlice";
import TaskForm from "./TaskForm";

const TaskList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tasks, loading } = useAppSelector((state) => state.tasks);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAddOrUpdate = async (values: Omit<Task, "id">) => {
    if (editingTask) {
      await dispatch(updateTask({ ...editingTask, ...values }));
      message.success("Task updated!");
    } else {
      await dispatch(addTask(values));
      message.success("Task added!");
    }
    setEditingTask(null);
  };

  const handleDelete = async (id: string) => {
    await dispatch(deleteTask(id));
    message.success("Task deleted!");
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "completed" ? "green" : "orange"}>{status}</Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Task) => (
        <Space>
          <Button type="link" onClick={() => setEditingTask(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete this task?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger type="link">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md">
      <TaskForm onSubmit={handleAddOrUpdate} editingTask={editingTask} />
      <Table
        dataSource={tasks}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={false}
        className="mt-6"
      />
    </div>
  );
};

export default TaskList;