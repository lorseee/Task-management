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
    <AntLayout className="min-h-screen bg-gray-100 transition-colors duration-500">
      {/* Header */}
      <Header
        className="flex items-center justify-center relative px-8"
        style={{
          background: "linear-gradient(90deg, #325dd2ff, #182b49ff)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
        }}
      >
        {/* Centered Title */}
        <h1 className="text-white text-2xl font-semibold tracking-wide absolute left-1/2 transform -translate-x-1/2">
          Task Manager
        </h1>

        {/* Logout Button on the right */}
        <div className="absolute right-4">
          <Button
            onClick={handleLogout}
            type="default"
            style={{
              backgroundColor: "white",
              color: "#1e3a8a",
              borderRadius: "8px",
              fontWeight: 500,
              boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
              marginLeft: "175vh",
            }}
          >
            Logout
          </Button>
        </div>
      </Header>

      {/* Content */}
      <Content className="p-6 transition-colors duration-500">{children}</Content>
    </AntLayout>
  );
};

export default Layout;
