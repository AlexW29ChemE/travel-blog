import Link from "next/link";
import { Blog } from "../model/types";

type BlogEntrySnippet = { blog: Blog };

export default function BlogEntrySnippet({ blog }: BlogEntrySnippet) {
  const { title, thumbnail, description, date, id } = blog;

  return (
    <div className="blog-card">
      <Link href={`/travel/${id}`}>
        <div>
          {thumbnail?.key ? (
            <img
              width={200}
              height={200}
              src={`${process.env.NEXT_PUBLIC_IMAGE_BUCKET_HOST}/${thumbnail.key}`}
              alt={title || ""}
            />
          ) : null}
        </div>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
          <p className="date">{date.toLocaleDateString()}</p>
        </div>
      </Link>
    </div>
  );
}
