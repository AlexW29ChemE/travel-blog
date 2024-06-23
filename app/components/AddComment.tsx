'use client'

import React, { ReactEventHandler, useState } from 'react';
import axios from 'axios';

const CommentInput = ({ blogId }:{blogId:string}) => {
  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit:ReactEventHandler = async (e) => {
    e.preventDefault();
    // Post a new comment
    await axios.post(`/api/blogs/comments`, {
      blogId,
      username,
      content,
    });
    // Clear the input fields
    setUsername('');
    setContent('');
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
      />
      <textarea
        placeholder="Your comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        rows={4}
      ></textarea>
      <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
        Submit
      </button>
    </form>
  );
};

export default CommentInput;
