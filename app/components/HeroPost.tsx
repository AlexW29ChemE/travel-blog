import Avatar from "./Avatar";
import Link from "next/link";
import DateFormatter from "./DateFormatter";
import CoverImage from "./cover-image";
import { Blog } from "../model/types";
import { getImageUrl } from "../model/image";

type Props = {
  title: string|null|undefined;
  coverImage: Blog['thumbnail'];
  date: Date|null|undefined;
  excerpt: string|null|undefined;
  author?: {name:string,picture:string};
  slug: string|null|undefined;
};

export function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} src={getImageUrl(coverImage)} slug={slug} />
      </div>
      <div className="md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-5xl leading-tight">
            <Link href={`/posts/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <DateFormatter date={date} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          {author?<Avatar name={author.name} picture={author.picture} />:null}
        </div>
      </div>
    </section>
  );
}
