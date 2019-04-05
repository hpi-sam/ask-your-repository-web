// @flow
import React from 'react';
import type { Image } from '../../../models/Image';
import './TaggingImagePreview.scss';

type Props = {
  image: Image,
};

function TaggingImagePreview({ image }: Props) {
  return (
    <div className="TaggingImagePreview">
      <img
        className="TaggingImagePreview__image"
        src={image.url}
        alt=""
      />
    </div>
  );
}

export default TaggingImagePreview;
