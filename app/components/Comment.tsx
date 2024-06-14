import React from "react";
import type { Comment as CommentType } from "../model/types";

type CommentProps = { comment: CommentType };
const Comment = ({ comment }: CommentProps) => {
  const { blogId, content, createdAt, username, id } = comment;
  const date = createdAt ? new Date(createdAt) : new Date();
  return (
    <div className="comment">
      <p>
        <strong>{username}</strong> <em>({date.toLocaleString()})</em>
      </p>
      <p>{content}</p>
    </div>
  );
};

export default Comment;
