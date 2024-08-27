import React, { useState, useEffect } from 'react';
import { Post } from '../types';

interface PostFormProps {
  selectedPost?: Post | null;
  onSave: (title: string, content: string, id?: number) => void;
  onCancel: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ selectedPost, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (selectedPost) {
      setTitle(selectedPost.title);
      setContent(selectedPost.content);
    }
  }, [selectedPost]);

  const handleSubmit = () => {
    onSave(title, content, selectedPost?.id);
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-75'>
      <div className='bg-gray-900 p-6 rounded shadow-lg w-1/3'>
        <h2 className='text-2xl mb-4'>{selectedPost ? 'Editar Post' : 'Criar Post'}</h2>
        <label className='block mb-2'>
          Título:
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='block w-full p-2 mt-1 bg-gray-800 border border-gray-600 rounded'
          />
        </label>
        <label className='block mb-4'>
          Conteúdo:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='block w-full p-2 mt-1 bg-gray-800 border border-gray-600 rounded'
          />
        </label>
        <div className='flex justify-end'>
          <button
            onClick={handleSubmit}
            className='bg-green-500 text-white rounded border border-black p-2 mr-2'
          >
            Salvar
          </button>
          <button
            onClick={onCancel}
            className='bg-red-500 text-white rounded border border-black p-2'
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
