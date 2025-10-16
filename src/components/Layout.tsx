// src/components/Layout.tsx
import React from "react";
import { Layout as AntLayout, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { logout } from "../features/auth/authSlice";

const { Header, Content } = AntLayout;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <AntLayout className="min-h-screen bg-gray-100">
      <Header className="flex justify-between items-center bg-blue-600 px-6">
        <h1 className="text-white text-xl font-semibold">Task Manager</h1>
        <Button onClick={handleLogout}>Logout</Button>
      </Header>
      <Content className="p-6">{children}</Content>
    </AntLayout>
  );
};

export default Layout;
