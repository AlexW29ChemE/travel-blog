import React from "react";
import type { Comment as CommentType } from "../model/types";

type CommentProps = { comment: CommentType };

const Comment = ({ comment }: CommentProps) => {
  const { content, createdAt, username } = comment;
  const date = createdAt ? new Date(createdAt) : new Date();

  return (
    <div className="border p-4 rounded-lg shadow-md">
      <p className="font-semibold">{username} <span className="text-sm text-gray-600">({date.toLocaleString()})</span></p>
      <p className="mt-2">{content}</p>
    </div>
  );
};

export default Comment;
