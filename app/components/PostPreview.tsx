import Link from "next/link";
import Avatar from "./Avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./DateFormatter";
import { getImageUrl } from "../model/image";
import { Blog } from "../model/types";

type Props = {
  title: string|null|undefined;
  coverImage: Blog['thumbnail'];
  date: Date|null|undefined;
  excerpt: string|null|undefined;
  author?: {name:string,picture:string};
  slug: string|null|undefined;
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={getImageUrl(coverImage)} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter date={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      {author?<Avatar name={author.name} picture={author.picture} />:null}
    </div>
  );
}
