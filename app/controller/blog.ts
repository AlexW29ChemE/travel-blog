import db from "../model/db";


export async function getRecentPosts(limit=1000) {
  return db.Blog.find({published:true}).sort({ createdAt: -1 }).limit(limit); // Fetch the 3 most recent blogs
}


export async function getPostById(id: string) {
  console.log(id);
  const blog = await db.Blog.findById(id);
  return blog?.toObject();
}
