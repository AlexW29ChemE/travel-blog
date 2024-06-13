import React from 'react';

type CommentProps = {username:string,content:React.ReactNode,time:string}
const Comment = ({ username, content, time }:CommentProps) => {
  return (
    <div className="comment">
      <p><strong>{username}</strong> <em>({new Date(time).toLocaleString()})</em></p>
      <p>{content}</p>
    </div>
  );
};

export default Comment;
