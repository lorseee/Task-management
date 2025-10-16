// src/pages/Dashboard.tsx
import React from "react";
import TaskList from "../features/tasks/TaskList";

const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto mt-6">
      
      <TaskList />
    </div>
  );
};

export default Dashboard;
