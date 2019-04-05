// @flow
import React, { Component } from 'react';
import Tagging from './Tagging';
import TagSelector from '../shared/TagSelector';
import Tag from '../../utility/Tag';
import type { TaggableImage } from '../../../models/Image';
import type { Tag as TagType } from '../../../models/Tag';
import './Tagging.scss';

type Props = {
  image: TaggableImage,
};

class SingleTagging extends Component<Props> {
  createSingleTag = (tag: TagType) => {
    const { image } = this.props;

    return (
      <Tag
        key={`${image.id}-${tag}`}
        className="TagSelector__tag"
        caption={tag}
        removable
        onRemove={image.removeTag}
        data-cy="tag-selector-tag"
      />
    );
  };

  createSingleTagSelector() {
    const { image } = this.props;

    return (
      <TagSelector
        tags={image.userTags}
        addTag={image.addTag}
        removeTag={image.removeTag}
        renderTag={this.createSingleTag}
      />
    );
  }

  render() {
    const { image } = this.props;

    return (
      <Tagging
        image={image}
        addTag={image.addTag}
        removeTag={image.removeTag}
        tagSelector={this.createSingleTagSelector()}
      />
    );
  }
}

export default SingleTagging;
