// @flow
import _ from 'lodash';
import React, { Component } from 'react';
import Tagging from './Tagging';
import type { Image } from '../../models/Image';
import TagSelector from './form/TagSelector';
import type { Tag } from '../../models/Tag';

type Props = {
  images: Array<Image>,
  selectedImageId: string,
  onImageTagsChange: (imageId: string, tags: Array<Tag>) => void,
};

type State = {
  multiTags: Array<Tag>,
};

class MultiTagging extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      multiTags: [],
    };
  }

  getSelectedImage(): Image {
    return this.props.images.find(image => image.id === this.props.selectedImageId);
  }

  addTagToSelected = (tag: Tag) => {
    this.addTagToImage(this.getSelectedImage(), tag);
  };

  removeTagFromSelected = (tag: Tag) => {
    this.removeTagFromImage(this.getSelectedImage(), tag);
  };

  addMultiTag = (multiTag: Tag) => {
    this.setState(state => ({ multiTags: [...state.multiTags, multiTag] }));

    this.props.images.forEach((image) => {
      this.addTagToImage(image, multiTag);
    });
  };

  removeMultiTag = (multiTag: Tag) => {
    this.setState(state => ({
      multiTags: state.multiTags.filter(existingMultiTag => existingMultiTag !== multiTag),
    }));

    this.props.images.forEach((image) => {
      this.removeTagFromImage(image, multiTag);
    });
  };

  addTagToImage(image: Image, tag: Tag) {
    this.props.onImageTagsChange(image.id, _.uniq([...image.tags, tag]));
  }

  removeTagFromImage(image: Image, tag: Tag) {
    this.props.onImageTagsChange(image.id, image.tags.filter(existingTag => existingTag !== tag));
  }

  render() {
    const image = this.getSelectedImage();

    return (
      <Tagging
        image={image}
        addTag={this.addTagToSelected}
        removeTag={this.removeTagFromSelected}
        tagSelector={(
          <TagSelector
            multiTags={this.state.multiTags}
            addMultiTag={this.addMultiTag}
            removeMultiTag={this.removeMultiTag}
            addTag={this.addTagToSelected}
            removeTag={this.removeTagFromSelected}
            tags={image.tags}
          />
        )}
      />
    );
  }
}

export default MultiTagging;
