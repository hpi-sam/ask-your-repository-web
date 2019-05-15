// @flow
import React from 'react';
import MobileTaggingHeader from './MobileTaggingHeader';
import MobileTaggingImage from './MobileTaggingImage';
import Tag from '../../utility/tags/Tag';
import type { TaggableImage } from '../../../models/Image';
import type { Tag as TagType } from '../../../models/Tag';
import './MobileTagging.scss';

type Props = {
  image: TaggableImage,
  onDiscard: () => any,
  onSubmit: () => Promise<void>,
};

function MobileTagging(props: Props) {
  const { image, onDiscard, onSubmit } = props;

  return (
    <div className="MobileTagging">
      <MobileTaggingHeader
        image={image}
        onDiscard={onDiscard}
      />
      <div className="MobileTagging__image-container">
        <MobileTaggingImage
          image={image}
          onSubmit={onSubmit}
          isSaveable={image.userTags.length > 0}
          renderTag={(tag: TagType) => (
            <Tag
              key={tag}
              caption={tag}
              removable
              onRemove={image.removeTag}
            />
          )}
        />
      </div>
    </div>
  );
}

export default MobileTagging;
