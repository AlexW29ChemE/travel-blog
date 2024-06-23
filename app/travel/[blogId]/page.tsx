import CommentsContainer from "../../components/CommentContainer";
import GoogleMap from "../../components/GoogleMap";
import MarkdownContent from "../../components/MarkdownContent";
import { getPostById } from "../../controller/blog";

type BlogEntryProps = { params: { blogId: string } };

async function BlogEntryPage({ params }: BlogEntryProps) {
  const { blogId } = params;
  const blog = await getPostById(blogId);
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
