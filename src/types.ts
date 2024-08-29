export interface Post {
    id: number;
    title: string;
    content: string;
    userId: number;
    createdAt?: string;
  }

export interface User {
  id: number;
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  status: number;
  data: string;
}