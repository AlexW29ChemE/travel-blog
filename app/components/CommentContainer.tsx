import Comment from "./Comment";
import db from "../model/db";

function getComments(blogId: string) {
  return db.Comment.find({ blogId });
}

async function CommentsContainer({ blogId }: { blogId: string }) {
  const comments = await getComments(blogId);

  return (
    <div className="comments-container">
      <h2>Comments</h2>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default CommentsContainer;
