// src/types.ts
export interface User {
  name: string;
  email: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
}
