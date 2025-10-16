// src/features/auth/Login.tsx
import React, { useEffect, useState } from "react";
import { Button, Form, Input, Card, Typography, Switch, message } from "antd";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { loginUser } from "./authSlice";
import { useNavigate } from "react-router-dom";
import "antd/dist/reset.css";

const { Title, Text } = Typography;

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { token, loading, error } = useAppSelector((state) => state.auth);
  const [darkMode, setDarkMode] = useState(false);

  const onFinish = (values: { username: string; password: string }) => {
    dispatch(loginUser(values));
  };

  useEffect(() => {
    if (token) {
      message.success("Login successful!");
      navigate("/dashboard");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
         background: darkMode
          ? "linear-gradient(135deg, #161478ff, #1c0f31ff, #2c201dff)"
          : "linear-gradient(135deg, #83abcdff, #414f63ff)",
        fontFamily: "'Poppins', sans-serif",
        transition: "all 0.5s ease",
      }}
    >
      <Card
        style={{
          width: 400,
          padding: 30,
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
          borderRadius: 20,
          background: darkMode ? "#1e1e1e" : "#ffffff",
          color: darkMode ? "#f5f5f5" : "#000000",
          transition: "all 0.5s ease",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <Title
            level={2}
            style={{
              color: darkMode ? "#ffffff" : "#1f1f1f",
              fontWeight: 700,
              marginBottom: 15,
            }}
          >
            Task Manager
          </Title>
          <Text
            style={{
              fontSize: 12,
              color: darkMode ? "#b5b5b5" : "#555",
            }}
          >
            Enter your login credentials
          </Text>
          <div style={{ marginTop: 10 }}>
            <Switch
              checkedChildren="🌙"
              unCheckedChildren="☀️"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          </div>
        </div>

        <Form layout="vertical" onFinish={onFinish}>
          <div
            style={{
              background: darkMode ? "#2e2e2e" : "#f9f9f9",
              borderRadius: 12,
              padding: 20,
              boxShadow: "inset 0 2px 6px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
            }}
          >
            <Form.Item
              label={<span style={{ color: darkMode ? "#fff" : "#333" }}>Username</span>}
              name="username"
              rules={[{ required: true, message: "Please enter your username" }]}
            >
              <Input
                placeholder="Enter username"
                style={{
                  background: darkMode ? "#3a3a3a" : "#fff",
                  color: darkMode ? "#f5f5f5" : "#000",
                }}
              />
            </Form.Item>

            <Form.Item
              label={<span style={{ color: darkMode ? "#fff" : "#333" }}>Password</span>}
              name="password"
              rules={[{ required: true, message: "Please enter your password" }]}
            >
              <Input.Password
                placeholder="Enter password"
                style={{
                  background: darkMode ? "#3a3a3a" : "#fff",
                  color: darkMode ? "#f5f5f5" : "#000",
                }}
              />
            </Form.Item>
          </div>

          {/* Small text for test credentials */}
          <div style={{ textAlign: "center", marginTop: 15 }}>
            <Text
              style={{
                fontSize: 10,
                color: darkMode ? "#a1a1a1" : "#777",
                fontStyle: "italic",
              }}
            >
              test / test123
            </Text>
          </div>

          <Form.Item style={{ marginTop: 10 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              style={{
                height: 45,
                borderRadius: 12,
                background: darkMode
                  ? "linear-gradient(90deg, #434343, #000000)"
                  : "linear-gradient(90deg, #667eea, #764ba2)",
                fontWeight: 600,
                border: "none",
              }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
