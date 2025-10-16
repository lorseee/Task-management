// src/pages/Dashboard.tsx
import React from "react";
import TaskList from "../features/tasks/TaskList";

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
      <TaskList />
    </div>
  );
};

export default Dashboard;
