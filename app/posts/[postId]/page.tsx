import Link from "next/link";
import Container from "../../components/Container";
import { PostHeader } from "../../components/PostHeader";
import { getPostById } from "../../controller/blog";
import GoogleMap from "../../components/GoogleMap";
import MarkdownContent from "../../components/MarkdownContent";
import CommentsContainer from "../../components/CommentContainer";
import CommentInput from "../../components/AddComment";

type BlogEntryProps = { params: { postId: string } };

export default async function Page({ params }: BlogEntryProps) {
    const post = await getPostById(params.postId)
    return <main>
        <Container>
            {post ? <article className="mb-32">
                <PostHeader
                    title={post.title}
                    coverImage={post.thumbnail}
                    date={post.date}
                    location={post.location}
                    author={post.user as any}
                    galleryImages={post.images}
                />
                <div className="max-w-2xl mx-auto">
                    <MarkdownContent content={post.markdownContent || ""}></MarkdownContent>
                </div>
            </article> : null}
            <CommentsContainer blogId={params.postId}/>
        </Container>
    </main>

    // return (
    //     <main>
    //         {/* <Alert preview={post.preview} /> */}
    //         <Container>
    //             {post ? <article className="mb-32">
    //                 <PostHeader
    //                     title={post.}
    //                     coverImage={post.thumbnail}
    //                     date={post.date}
    //                     author={post.user as any}
    //                 />
    //                 <GoogleMap location={post.location?.name ?? "Australia"} />
    //                 <div className="max-w-2xl mx-auto">
    //                     <MarkdownContent content={post.markdownContent || ""}></MarkdownContent>
    //                 </div>
    //             </article> : <div>Post not found, See all <Link href='/posts'>Posts</Link></div>}
    //         </Container>
    //     </main>
    // );
}