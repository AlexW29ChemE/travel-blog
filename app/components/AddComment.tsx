import React, { ReactEventHandler, useState } from 'react';
import axios from 'axios';

const CommentInput = ({ blogId }:{blogId:string}) => {
  const [username, setUsername] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit:ReactEventHandler = async (e) => {
    e.preventDefault();
    // Post a new comment
   
    await axios.post(`/api/${blogId}comments`, {
      blogId,
      username,
      content,
    });
    // Clear the input fields
    setUsername('');
    setContent('');
  };

  return (
    <form className="comment-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <textarea
        placeholder="Your comment"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CommentInput;
