// @flow
import React from 'react';
import GalleryItem from './GalleryItem';
import type { Image } from './ImageDecorator';
import './Gallery.scss';

type Props = {
  images: Array<Image>,
};

function Gallery(props: Props) {
  const { images } = props;

  return (
    <div className="Gallery">
      {images.map(image => (
        <GalleryItem key={image.id} image={image} />
      ))}
    </div>
  );
}

export default Gallery;
