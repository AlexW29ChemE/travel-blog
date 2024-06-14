import BlogForm from "../../../components/BlogEditForm";
import db from "../../../model/db";

// Under Admin routes we want to include private content
async function getBlogWithPrivateData(id: string) {
  const blog = await db.Blog.findById(id).select("+privateContent");
  return blog?.toObject();
}

export default async function EditPage({
  params,
}: {
  params: { blogId: string };
}) {
  const blog = await getBlogWithPrivateData(params.blogId);
  return <BlogForm blog={blog} />;
}
