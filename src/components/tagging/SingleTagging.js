// @flow
import React, { Component } from 'react';
import Tagging from './Tagging';
import TagSelector from './form/TagSelector';
import type { TaggableImage } from '../../hooks/useTaggableImage';
import './Tagging.scss';

type Props = {
  image: TaggableImage,
};

class SingleTagging extends Component<Props> {
  createSingleTagSelector() {
    const { image } = this.props;

    return (
      <TagSelector
        tags={image.userTags}
        addTag={image.addTag}
        removeTag={image.removeTag}
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
