// @flow
import React from 'react';
import type { Node } from 'react';
import TaggingForm from './form/TaggingForm';
import TaggingImagePreview from './TaggingImagePreview';
import type { Image } from '../../models/Image';
import type { Tag } from '../../models/Tag';
import './Tagging.scss';

type Props = {
  image: Image,
  addTag: (tag: Tag) => void,
  isMultiTaggingEnabled: boolean,
  tagSelector: Node,
};

function Tagging(props: Props) {
  const { image } = props;

  return (
    <div className="Tagging">
      <TaggingForm
        tags={image.userTags}
        addTag={props.addTag}
        isMultiTaggingEnabled={props.isMultiTaggingEnabled}
        tagSelector={props.tagSelector}
      />
      <TaggingImagePreview image={image} />
    </div>
  );
}

Tagging.defaultProps = {
  isMultiTaggingEnabled: false,
};

export default Tagging;
