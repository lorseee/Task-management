// src/features/tasks/TaskList.tsx
import React, { useEffect, useState } from "react";
import { Button, Tag, Popconfirm, message, Card, Typography, Row, Col } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchTasks, deleteTask, addTask, updateTask } from "./tasksSlice";
import type { Task } from "./tasksSlice";
import TaskForm from "./TaskForm";

const { Title, Text } = Typography;

const TaskList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tasks} = useAppSelector((state) => state.tasks);
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

  return (
    <div
      style={{
        padding: "2rem",
        background: "#f4f6fa",
        minHeight: "100vh",
      }}
    >
      {/* Page Title */}
      <Title level={2} style={{ textAlign: "center", marginBottom: 30 }}>
        Your Tasks
      </Title>

      {/* Task Form */}
      <div
        style={{
          maxWidth: 600,
          margin: "0 auto 3rem auto",
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          padding: "2rem",
        }}
      >
        <TaskForm onSubmit={handleAddOrUpdate} editingTask={editingTask} />
      </div>

      {/* Task Cards */}
      <Row gutter={[20, 20]} justify="center">
        {tasks.length === 0 ? (
          <Text type="secondary">No tasks yet. Add one above!</Text>
        ) : (
          tasks.map((task) => (
            <Col xs={24} sm={12} md={8} lg={6} key={task.id}>
              <Card
                hoverable
                style={{
                  borderRadius: 16,
                  border: "1px solid #e0e0e0",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                  textAlign: "center",
                  backgroundColor: "#ffffff",
                  transition: "all 0.3s ease",
                }}
              >
                <Title level={4} style={{ marginBottom: 8 }}>
                  {task.title}
                </Title>
                <Text type="secondary" style={{ display: "block", marginBottom: 8 }}>
                  {task.description}
                </Text>
                <Tag
                  color={task.status === "completed" ? "green" : "orange"}
                  style={{ marginBottom: 12 }}
                >
                  {task.status}
                </Tag>
                <div>
                  <Button
                    type="link"
                    onClick={() => setEditingTask(task)}
                    style={{ marginRight: 8 }}
                  >
                    Edit
                  </Button>
                  <Popconfirm
                    title="Delete this task?"
                    onConfirm={() => handleDelete(task.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="link" danger>
                      Delete
                    </Button>
                  </Popconfirm>
                </div>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default TaskList;
