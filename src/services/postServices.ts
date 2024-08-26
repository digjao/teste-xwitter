import { Post } from "../types";
import { Api } from "./config";




export const getPosts = async (page: number = 1, limit: number = 5) => {
    const response = await fetch(`http://localhost:3333/posts?_page=${page}&_limit=${limit}`);
    if (!response.ok) {
        throw new Error('Erro ao buscar posts');
    }
    return response.json();
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