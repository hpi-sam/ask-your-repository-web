// @flow
import React from 'react';
import shortid from 'shortid';
import { IoIosMore } from 'react-icons/io';
import { Link } from 'react-router-dom';
import Tag from '../utility/Tag';
import type { Image } from '../../models/Image';
import './Gallery.scss';

const maxTags = 5;

type Props = {
  image: Image,
};

function GalleryItem(props: Props) {
  const { image } = props;
  const tags = image.tags || [];
  const displayedTags = tags.slice(0, maxTags);
  const showEllipses = tags.length >= maxTags;

  return (
    <Link to={`/images/${image.id}`} className="Gallery__item">
      <img
        className="Gallery__item__image"
        src={image.url}
        alt={displayedTags.join(', ')}
      />
      <div className="Gallery__item__overlay">
        {displayedTags.map(tag => (
          <Tag
            key={shortid.generate()}
            caption={tag}
          />
        ))}
        {showEllipses && (
          <div className="Gallery__item__ellipses">
            <IoIosMore />
          </div>
        )}
      </div>
    </Link>
  );
}

export default GalleryItem;
