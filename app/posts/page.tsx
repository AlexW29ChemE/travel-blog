import Link from "next/link";
import BlogEntrySnippet from "../components/BlogEntrySnippet";
import { getRecentPosts } from "../controller/blog";
import Container from "../components/Container";
import { HeroPost } from "../components/HeroPost";
import {  MorePosts } from "../components/MorePosts";
import { Intro } from "../components/Intro";
import { PostsHeader } from "../components/PostsHeader";

export const revalidate = 3600

const Page = async () => {
  const posts = await getRecentPosts();

  if (posts.length===0){
    return  <div>
       <h1>Travel Entries</h1>
       <p className="error-text">No Entries found</p>
     </div>
   }
  const heroPost = posts[0];

  const morePosts = posts.slice(1);


  return (
    <main>
      <Container>
      <PostsHeader/>       
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


export default Page;
