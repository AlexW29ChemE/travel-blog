'use client'

import React, { useState } from 'react';
import FsLightbox from 'fslightbox-react';
import { getImageUrl } from '../model/image';
import { Blog } from '../model/types';

type GalleryProps = {
  images: Blog['images'];
};

const Gallery = ({ images }: GalleryProps) => {
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1,
  });

  const openLightboxOnSlide = (slide:any) => {
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide,
    });
  };
  const [hoveredIndex, setHoveredIndex] = useState<null|number>(null);
  return (
    <div className="gallery grid grid-cols-2 md:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <div
          key={index}
          className={`gallery-item cursor-pointer transition-transform duration-300 ${
            hoveredIndex !== null && hoveredIndex !== index ? 'transform rotate-6 scale-95' : ''
          }`}
          onClick={() => openLightboxOnSlide(index + 1)}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <img
            src={getImageUrl(image)}
            alt={image.name || 'Gallery Image'}
            className="object-cover w-full h-48 rounded-lg shadow-md"
          />
        </div>
      ))}
      <FsLightbox
        toggler={lightboxController.toggler}
        sources={images.map((image) =>     <img
          src={getImageUrl(image)}
          alt={image.name || 'Gallery Image'}
        />)}
        slide={lightboxController.slide}
      />
    </div>
  );
};

export default Gallery;
