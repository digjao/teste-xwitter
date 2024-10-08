import React, { useEffect, useState } from 'react';
import { getPosts, deletePost, updatePost, createPost } from '../services/postServices';
import { Post } from '../types';
import PostItem from '../components/PostItem';
import PostForm from '../components/PostForm';

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [expandedPost, setExpandedPost] = useState<Post | null>(null);
  const [page, setPage] = useState<number>(1); 
  const [limit] = useState<number>(4);

  const fetchPosts = async (page: number) => {
    try {
      const posts = await getPosts(page, limit);
      setPosts(posts);
    } catch (error) {
      console.error('Erro ao buscar posts', error);
    }
  };

  useEffect(() => {
    fetchPosts(page); 
  }, [page]);

  const handleDeletePost = async (id: number) => {
    try {
      if (confirm('Realmente deseja apagar?')) {
        await deletePost(id);
        setPosts(posts.filter(post => post.id !== id));
        fetchPosts(page);
        alert('Registro apagado com sucesso');
      }
    } catch (error) {
      console.error('Erro ao deletar post', error);
    }
  };

  const handleEditPost = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleSavePost = async (title: string, content: string, id?: number) => {
    try {
      if (id) {
        const updatedPost = { id, title, content, userId: 1, createdAt: new Date().toISOString() };
        await updatePost(id, updatedPost);
        setPosts(posts.map(post => (post.id === id ? updatedPost : post)));
      } else {
        const newPost = { title, content, userId: 1, createdAt: new Date().toISOString() };
        await createPost(newPost);
        fetchPosts(page);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Erro ao salvar post', error);
    }
  };

  const handleViewMore = (post: Post) => {
    setExpandedPost(post);
  };

  return (
    <div className='grid grid-cols-3 h-screen text-white bg-black overflow-hidden'>
      <div className='p-4 flex flex-col'>
        <h2 className='text-6xl p-4 flex justify-center'>Menu</h2>
        <div>
          <h2 className='text-2xl mb-4'>Criar Novo Post</h2>
          <button
            onClick={() => {
              setSelectedPost(null);
              setIsModalOpen(true);
            }}
            className='bg-blue-500 text-white rounded border border-black p-2'
          >
            Criar Post
          </button>
        </div>
      </div>
      <div className='col-span-1 flex flex-col items-center justify-start border border-white p-4'>
        <h1 className='text-6xl p-4'>Posts</h1>
        <div className='flex flex-wrap gap-4 justify-center w-full overflow-x-hidden'>
          {posts.map(post => (
            <PostItem
              key={post.id}
              post={post}
              onDelete={handleDeletePost}
              onEdit={handleEditPost}
              onViewMore={handleViewMore}
            />
          ))}
        </div>

        <div className='flex justify-center space-x-4 mt-4'>
          <button
            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className='bg-gray-500 text-white p-2 rounded disabled:opacity-50'
          >
            Anterior
          </button>
          <span className='text-2xl'>{page}</span>
          <button
            onClick={() => setPage(prev => prev + 1)}
            className='bg-gray-500 text-white p-2 rounded'
          >
            Próximo
          </button>
        </div>
      </div>
      <div className='p-4 border border-white'>
        {expandedPost && (
          <div>
            <div className='flex flex-col overflow-hidden'>
              <h1 className='text-6xl p-4 flex justify-center'>Posts extendidos</h1>
            </div>
            <div className='w-full p-4 border border-gray-300 bg-gray-800 rounded'>
              <h2 className='text-2xl font-bold mb-2'>{expandedPost.title}</h2>
              <p className='break-words text-ellipsis'>{expandedPost.content}</p>
            </div>
          </div>
        )}
      </div>
      {isModalOpen && (
        <PostForm
          selectedPost={selectedPost}
          onSave={handleSavePost}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default PostList;
