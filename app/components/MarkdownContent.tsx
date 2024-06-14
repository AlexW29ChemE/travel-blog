import { MDXRemote } from "next-mdx-remote/rsc";

export default async function MarkdownContent({
  content,
}: {
  content: string;
}) {
  // MDX text - can be from a local file, database, CMS, fetch, anywhere...
  //   const res = await fetch("");
  //   const markdown = await res.text();
  return <MDXRemote source={content} />;
}
