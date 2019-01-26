// @flow
import React, { Component } from 'react';
import { IoIosMore } from 'react-icons/io';
import shortid from 'shortid';
import Tag from '../utility/Tag';
import type { Image } from '../../models/Image';
import './Gallery.scss';

const maxTags = 5;

type Props = {
  images: Array<Image>,
};

class Gallery extends Component<Props> {
  renderImage = (image: Image) => {
    const { url } = image;

    const tags = image.tags || [];
    const displayedTags = tags.slice(0, maxTags);
    const showEllipses = tags.length >= maxTags;

    return (
      <div key={image.id} className="Gallery__item">
        <img
          className="Gallery__item__image"
          src={url}
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
      </div>
    );
  };

  render() {
    const { images } = this.props;

    return (
      <div className="Gallery">
        {images.map(this.renderImage)}
      </div>
    );
  }
}

export default Gallery;
