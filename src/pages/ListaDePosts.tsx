import React, { useEffect, useState } from 'react';
import { getPosts, deletePost, updatePost } from '../services/postServices';
import { Post } from '../types';

const PostList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getPosts();
        setPosts(posts);
      } catch (error) {
        console.error("Erro ao buscar posts", error);
      }
    };

    fetchPosts();
  }, []);

  const handleDeletePost = async (id: number) => {
    try {
      if (confirm("Realmente deseja apagar?")) {
        await deletePost(id);
        setPosts(posts.filter(post => post.id !== id));
        alert("Registro apagado com sucesso");
      }
    } catch (error) {
      console.error("Erro ao deletar post", error);
    }
  };

  const handleEditPost = (post: Post) => {
    setSelectedPost(post);
    setUpdatedTitle(post.title);
    setUpdatedContent(post.content);
    setIsModalOpen(true);
  };

  const handleSaveChanges = async () => {
    if (selectedPost) {
      try {
        const updatedPost = {
          ...selectedPost,
          title: updatedTitle,
          content: updatedContent
        };
        await updatePost(updatedPost.id, updatedPost);
        setPosts(posts.map(post => (post.id === updatedPost.id ? updatedPost : post)));
        setIsModalOpen(false);
      } catch (error) {
        console.error("Erro ao atualizar post", error);
      }
    }
  };

  return (
    <div className='grid grid-cols-3 h-screen text-white bg-black'>
      <div className='p-4'>
        <h2 className='text-6xl p-4'>Menu</h2>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Sair</a></li>
        </ul>
      </div>
      <div className='col-span-1 flex flex-col items-center justify-start border border-white p-4'>
        <h1 className='text-6xl p-4'>Posts</h1>
        <div className='flex flex-wrap gap-4 justify-center'>
          {posts.map(post => (
            <div key={post.id} className='w-full p-4 border border-gray-300 bg-gray-800 rounded'>
              <h2 className='text-xl font-bold'>{post.title}</h2>
              <p>{post.content}</p>
              <div className=''>
                <button className='bg-red-500 text-white rounded border border-black p-2 mt-2 mr-4' 
                    onClick={() => handleDeletePost(post.id)}>Deletar
                </button>
                <button className='bg-green-500 text-white rounded border border-black p-2 mt-2'
                    onClick={() => handleEditPost(post)}>Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='p-4'></div>

      {isModalOpen && selectedPost && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-75'>
          <div className='bg-gray-900 p-6 rounded shadow-lg w-1/3'>
            <h2 className='text-2xl mb-4'>Editar Post</h2>
            <label className='block mb-2'>
              Título:
              <input
                type='text'
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                className='block w-full p-2 mt-1 bg-gray-800 border border-gray-600 rounded'
              />
            </label>
            <label className='block mb-4'>
              Conteúdo:
              <textarea
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
                className='block w-full p-2 mt-1 bg-gray-800 border border-gray-600 rounded'
              />
            </label>
            <div className='flex justify-end'>
              <button
                onClick={handleSaveChanges}
                className='bg-green-500 text-white rounded border border-black p-2 mr-2'
              >
                Salvar
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className='bg-red-500 text-white rounded border border-black p-2'
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostList;