import { Post, User, LoginResponse } from "../types";
import { Api } from "./config";


export const getPosts = async (page: number = 1, limit: number = 4): Promise<Post[]> => {
    const response = await Api.get(`http://localhost:3333/posts?_sort=createdAt&_order=desc&_page=${page}&_limit=${limit}`);
    if (!response) {
        throw new Error('Erro ao buscar posts');
    }
    return response.data;
};

  export const createPost = async (post: Omit<Post, 'id'>): Promise<Post> => {

    const response = await Api.post<Post>('/posts', post);
    return response.data;
  };

  export const updatePost = async (id: number, updatedPost: Partial<Post>) => {
    const response = await Api.put(`/posts/${id}`, updatedPost);
    return response.data;
  };

  export const deletePost = async (id: number): Promise<void> => {
    await Api.delete(`/posts/${id}`);
  };

  export const registerUser = async (user: { username: string; email: string; password: string }): Promise<User> => {
      const response = await Api.post<User>('/users', user);
      return response.data;
  };
  

  export const loginUser = async (username: string, password: string): Promise<LoginResponse> => {
    const response = await Api.post<LoginResponse>('/login', { username, password });
    return response.data;
  };