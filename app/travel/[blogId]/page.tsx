import CommentsContainer from "../../components/CommentContainer";
import GoogleMap from "../../components/GoogleMap";
import MarkdownContent from "../../components/MarkdownContent";
import db from "../../model/db";

async function getBlog(id: string) {
  console.log(id);
  const blog = await db.Blog.findById(id);
  return blog?.toObject();
}

type BlogEntryProps = { params: { blogId: string } };

async function BlogEntryPage({ params }: BlogEntryProps) {
  const { blogId } = params;
  const blog = await getBlog(blogId);
  console.log(blog);
  if (!blog) {
    return <div>Not Found</div>;
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <GoogleMap location={blog.location?.name ?? "Australia"} />
      <MarkdownContent content={blog.markdownContent || ""}></MarkdownContent>
      <CommentsContainer blogId={blogId} />
    </div>
  );
}

export default BlogEntryPage;
