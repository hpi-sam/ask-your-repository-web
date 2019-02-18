// @flow
import React, { Component } from 'react';
import Tagging from './Tagging';
import TagSelector from './form/TagSelector';
import type { Image } from '../../models/Image';
import type { Tag } from '../../models/Tag';
import './Tagging.scss';

type Props = {
  image: Image,
  onTagsChange: (newTags: Array<Tag>) => void,
};

class SingleTagging extends Component<Props> {
  addTag = (tag: Tag) => {
    const { onTagsChange, image: { tags } } = this.props;
    onTagsChange([...tags, tag]);
  };

  removeTag = (tag: Tag) => {
    const { onTagsChange, image: { tags } } = this.props;
    onTagsChange(tags.filter(existingTag => existingTag !== tag));
  };

  createSingleTagSelector() {
    return (
      <TagSelector
        tags={this.props.image.tags}
        addTag={this.addTag}
        removeTag={this.removeTag}
      />
    );
  }

  render() {
    return (
      <Tagging
        image={this.props.image}
        addTag={this.addTag}
        removeTag={this.removeTag}
        tagSelector={this.createSingleTagSelector()}
      />
    );
  }
}

export default SingleTagging;
