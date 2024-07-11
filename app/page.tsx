import Link from "next/link";
import BlogEntrySnippet from "./components/BlogEntrySnippet";
import { getRecentPosts } from "./controller/blog";
import Container from "./components/Container";
import { Intro } from "./components/Intro";
import { HeroPost } from "./components/HeroPost";
import {  MorePosts } from "./components/MorePosts";

export const revalidate = 3600

const HomePage = async () => {
  const posts = await getRecentPosts(3);
  const heroPost = posts[0];
  const morePosts = posts.slice(1);

  if (posts.length===0){
    return  <div>
       <h1>Travel Entries</h1>
       <p className="error-text">No Entries found</p>
     </div>
   }

  return (
    <main>
      <Container>
        <Intro />
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.thumbnail}
          date={heroPost.date}
          author={heroPost.user as any}
          slug={heroPost.id}
          excerpt={heroPost.description}
        />
        {morePosts.length > 0 && <MorePosts posts={morePosts} />}
      </Container>
    </main>
  );
}

//   return (
//     <div>
//       <header>
//         <div>
//           <h1>Welcome to My Travel Blog</h1>
//           <p>
//             Explore my adventures around the world and discover exciting places
//               and stories.
//           </p>
//           <Link href="/travel">View Travel Entries</Link>
//         </div>
//       </header>
//       <section>
//         <h2>Recent Entries</h2>
//         <div>
//           {recentBlogs.map((blog) => (
//             <BlogEntrySnippet key={blog.id} blog={blog} />
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// };

export default HomePage;
