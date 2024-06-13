import Link from "next/link";
import { Blog } from "../model/types";

type BlogEntrySnippet = { blog: Blog };

export default function BlogEntryExapandedSnippet({ blog }: BlogEntrySnippet) {
  const { title, thumbnail, description, date, id } = blog;

  return (
    <div className="blog-entry-snippet">
      <Link href={`/travel/${id}`}>
        <div className="thumbnail">
          <img src={thumbnail || ""} alt={title || ""} />
        </div>
        <div className="content">
          <h2>{title}</h2>
          <p>{description}</p>
          <p>{date.toLocaleDateString()}</p>
        </div>
      </Link>
    </div>
  );
}
