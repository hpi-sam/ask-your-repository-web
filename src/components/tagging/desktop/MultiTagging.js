// @flow
import React, { Component } from 'react';
import Tagging from './Tagging';
import TagSelector from './TagSelector';
import Tag from '../../utility/tags/Tag';
import type { Tag as TagType } from '../../../models/Tag';
import type { TaggableImage } from '../../../models/Image';

type Props = {
  image: TaggableImage,
  multiTags: Array<TagType>,
  removeMultiTag: (tag: TagType) => void,
  addMultiTag: (tag: TagType) => void,
};

class MultiTagging extends Component<Props> {
  handleRemoveTag = (tag: TagType) => {
    const { image, multiTags, removeMultiTag } = this.props;

    if (image) image.removeTag(tag);
    if (multiTags.includes(tag)) removeMultiTag(tag);
  };

  createMultiTag = (tag: TagType) => {
    const {
      image, multiTags, addMultiTag, removeMultiTag,
    } = this.props;

    return (
      <Tag
        key={`${image.id}-${tag}`}
        className="TagSelector__tag"
        caption={tag}
        clickable
        removable
        onRemove={this.handleRemoveTag}
        isMultiTag={multiTags.includes(tag)}
        onClick={multiTags.includes(tag) ? removeMultiTag : addMultiTag}
        data-cy="tag-selector-tag"
      />
    );
  };

  createMultiTagSelector() {
    const { image } = this.props;

    return (
      <TagSelector
        addTag={image.addTag}
        removeTag={image.removeTag}
        tags={image.userTags}
        renderTag={this.createMultiTag}
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
        tagSelector={this.createMultiTagSelector()}
      />
    );
  }
}

export default MultiTagging;
