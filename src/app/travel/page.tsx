import BlogEntryExapandedSnippet from "../../components/BlogEntryExpanded";
import BlogEntrySnippet from "../../components/BlogEntrySnippet";
import db from "../../model/db";

async function getBlogs() {
  return db.Blog.find().sort({ createdAt: -1 }); // Fetch blogs sorted by most recent
}

async function TravelEntrySelectionPage() {
  const blogs = await getBlogs();

  const heroBlog = blogs.length > 0 ? blogs[0] : null;
  const otherBlogs = blogs.slice(1); // Exclude the first (hero) blog

  return (
    <div className="travel-entry-selection">
      {heroBlog && (
        <div className="hero-blog">
          <BlogEntryExapandedSnippet blog={heroBlog} />
        </div>
      )}
      <div className="other-blogs">
        <h2>Other Travel Entries</h2>
        <div className="blog-grid">
          {otherBlogs.map((blog) => (
            <BlogEntrySnippet key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TravelEntrySelectionPage;
