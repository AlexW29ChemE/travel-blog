import Comment from "./Comment";
import db from "../model/db";
import CommentInput from "./AddComment";

function getComments(blogId: string) {
  return db.Comment.find({ blogId });
}

async function CommentsContainer({ blogId }: { blogId: string }) {
  const comments = await getComments(blogId);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mt-8 mb-4">Add A Comment</h2>

      <CommentInput blogId={blogId} />
      <h2 className="text-2xl font-bold mt-8 mb-4">Comments</h2>
      <div className="space-y-4">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}

export default CommentsContainer;
