import { ABOUT_TITLE, ABOUT_INTRO, ABOUT_CONTENT } from "./text";
import aboutImage from "../../public/plane-clouds.jpg"; // Replace with your image path
import Image from "next/image";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{ABOUT_TITLE}</h1>
      <div className="flex flex-col lg:flex-row items-center mb-6">
        <div className="lg:w-1/2 lg:pr-8 mb-4 lg:mb-0">
          <p className="text-xl mb-4">{ABOUT_INTRO}</p>
          <p className="text-base leading-7">{ABOUT_CONTENT}</p>
        </div>
        <div className="lg:w-1/2">
          <Image src={aboutImage as any} alt="About Alex" className="w-full rounded-lg shadow-md" />
        </div>
      </div>
    </div>
  );
}
