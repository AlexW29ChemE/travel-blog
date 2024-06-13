// import { MDXRemote } from 'next-mdx-remote/rsc'
 
// export default async function RemoteMdxPage() {
//   // MDX text - can be from a local file, database, CMS, fetch, anywhere...
//   const res = await fetch('')
//   const markdown = await res.text()
//   return <MDXRemote source={markdown} />
// }


import type { MDXComponents } from "mdx/types";

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    // h1: ({ children }) => <h1 style={{ fontSize: "100px" }}>{children}</h1>,
    ...components,
  };
}
