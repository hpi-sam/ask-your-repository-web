// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import type { Image } from './ImageDecorator';
import GalleryItemOverlay from './GalleryItemOverlay';
import './Gallery.scss';

const maxTags = 5;

type Props = {
  image: Image,
};

function GalleryItem(props: Props) {
  const { image } = props;
  const tags = image.tags || [];
  const displayedTags = tags.slice(0, maxTags);

  return (
    <Link to={`/images/${image.id}`} className="Gallery__item">
      <img
        className="Gallery__item__image"
        src={image.url}
        alt={displayedTags.join(', ')}
      />
      <GalleryItemOverlay image={image} maxTags={maxTags} />
    </Link>
  );
}

export default GalleryItem;
