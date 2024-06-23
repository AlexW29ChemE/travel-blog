import { BLOG_TITLE, BLOG_SUBTITLE } from "./text";

export function PostsHeader() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        All Posts
      </h1>
    </section>
  );
}
