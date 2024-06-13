"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Comment from "./Comment";
import type { Comment as CommentType } from "../../model/types";

const CommentsContainer = ({ blogId }: { blogId: string }) => {
  const [comments, setComments] = useState<CommentType[]>([]);

  // useEffect(() => {
  //   // Fetch comments for the given blogId
  //   const fetchComments = async () => {
  //     const response = await axios.get(`/api/blogs/${blogId}/comments`);
  //     setComments(response.data);
  //   };

  //   fetchComments();
  // }, [blogId]);

  return (
    <div className="comments-container">
      <h2>Comments</h2>
      {comments.map((comment) => (
        <Comment key={comment._id} {...comment} />
      ))}
    </div>
  );
};

export default CommentsContainer;
