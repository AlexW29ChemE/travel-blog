import Link from "next/link";
import db from "./model/db";
import BlogEntrySnippet from "./components/BlogEntrySnippet";

async function getRecentBlogs() {
  return db.Blog.find().sort({ createdAt: -1 }).limit(3); // Fetch the 3 most recent blogs
}

const HomePage = async () => {
  const recentBlogs = await getRecentBlogs();

  return (
    <div>
      <header>
        <div>
          <h1>Welcome to My Travel Blog</h1>
          <p>
            Explore my adventures around the world and discover exciting places
            and stories.
          </p>
          <Link href="/travel">View Travel Entries</Link>
        </div>
      </header>
      <section>
        <h2>Recent Entries</h2>
        <div>
          {recentBlogs.map((blog) => (
            <BlogEntrySnippet key={blog.id} blog={blog} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
