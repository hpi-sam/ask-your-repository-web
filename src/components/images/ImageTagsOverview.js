// @flow
import React from 'react';
import SmallTag from '../utility/tags/SmallTag';
import type { Image } from '../../models/Image';

type Props = {
  image: Image,
};

function ImageTagsOverview(props: Props) {
  const { image } = props;

  const sortedLabelTags = image.labeledWith.sort((a, b) => (
    b.confidence - a.confidence
  ));

  return (
    <div className="ImageDetailsModal__tags">
      <h3>
        Manual tags
        {' '}
        ({image.userTags.length})
      </h3>
      <div>
        {image.userTags.map(tag => (
          <SmallTag caption={tag} />
        ))}
      </div>
      <h3>
        Image recognition
        {' '}
        ({image.labeledWith.length})
      </h3>
      <div>
        {sortedLabelTags.map(tag => (
          <SmallTag caption={`${tag.name} (${(tag.confidence * 100).toFixed(2)}%)`} />
        ))}
      </div>
      <h3>
        Text recognition
        {' '}
        ({image.textTags.length})
      </h3>
      <div>
        {image.textTags.map(tag => (
          <SmallTag caption={tag} />
        ))}
      </div>
    </div>
  );
}

export default ImageTagsOverview;
