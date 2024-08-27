import React, { useState } from 'react';
import { Post } from '../types';

interface PostItemProps {
  post: Post;
  onDelete: (id: number) => void;
  onEdit: (post: Post) => void;
  onViewMore: (post: Post) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onDelete, onEdit, onViewMore }) => {
  
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    
    <div className='w-full p-4 border border-gray-300 bg-gray-800 rounded'>
      <h2 className='text-xl font-bold'>{post.title}</h2>
      <div
        className={`text-white ${isExpanded ? 'max-h-screen' : 'max-h-20'} max-h-20 overflow-hidden text-ellipsis`}>{post.content}</div>
      <div className=''>  
        <button
          className='bg-red-500 text-white rounded border border-black p-2 mt-2 mr-4'
          onClick={() => onDelete(post.id)}
        >
          Deletar
        </button>
        <button
          className='bg-green-500 text-white rounded border border-black p-2 mt-2'
          onClick={() => onEdit(post)}
        >
          Editar
        </button>
        <button
          className='bg-blue-500 text-white rounded border border-black p-2 mt-2 ml-4'
          onClick={() => onViewMore(post)}
        >
          Ver mais
        </button>
      </div>
    </div>
  );
};

export default PostItem;
