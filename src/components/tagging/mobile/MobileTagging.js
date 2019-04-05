// @flow
import React from 'react';
import Tag from '../../utility/Tag';
import MobileTaggingInput from './MobileTaggingInput';
import MobileTaggingHeader from './MobileTaggingHeader';
import type { TaggableImage } from '../../../models/Image';
import './MobileTagging.scss';

type Props = {
  image: TaggableImage,
  onSubmit: () => {},
};

function MobileTagging(props: Props) {
  const { image } = props;

  return (
    <div className="MobileTagging">
      <MobileTaggingHeader image={image} />
      <div className="MobileTagging__image-container">
        <img
          src={image.url}
          alt={image.userTags.join(' ')}
          className="MobileTagging__image"
        />
        <div className="MobileTagging__tags">
          {image.userTags.map(tag => (
            <Tag
              key={tag}
              caption={tag}
              removable
              onRemove={image.removeTag}
            />
          ))}
        </div>
        <MobileTaggingInput
          onTagSubmit={image.addTag}
          onSave={props.onSubmit}
          isSaveDisabled={image.userTags.length === 0}
        />
      </div>
    </div>
  );
}

export default MobileTagging;
