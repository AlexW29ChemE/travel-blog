import { getImageUrl } from "../model/image";
import { Blog } from "../model/types";
import Avatar from "./Avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./DateFormatter";
import Gallery from "./Gallery";
import GoogleMap from "./GoogleMap";
import { PostTitle } from "./PostTitle";

type Props = {
  title?: string | null;
  coverImage: Blog['thumbnail'];
  date: Date | null | undefined;
  location: Blog['location'];
  author?: { name: string, picture: string };
  galleryImages: Blog['images'];
};

export function PostHeader({ title, coverImage, location, date, author,galleryImages }: Props) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        {author ? <Avatar name={author.name} picture={author.picture} /> : null}
      </div>
      <div className="flex flex-col lg:flex-row items-center lg:justify-between mb-8 md:mb-16 sm:mx-0">
        <div className="lg:w-1/2">
          <CoverImage title={title} src={getImageUrl(coverImage)} />
        </div>
        <div className="lg:w-1/2 mt-8 lg:mt-0 w-full lg:ml-8 flex justify-center lg:justify-end">
          <GoogleMap location={location?.name ?? "Australia"} />
        </div>
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          {author ? <Avatar name={author.name} picture={author.picture} /> : null}
        </div>
        <div className="mb-6 text-lg">
          <DateFormatter date={date} />
        </div>
        <div className="max-w-4xl mx-auto mt-12">
        <Gallery images={galleryImages} />
      </div>
      </div>
    </>
  );
}
