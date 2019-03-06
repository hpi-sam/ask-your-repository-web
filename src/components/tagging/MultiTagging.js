// @flow
import _ from 'lodash';
import shortid from 'shortid';
import React, { Component } from 'react';
import Tagging from './Tagging';
import type { Image } from '../../models/Image';
import TagSelector from './form/TagSelector';
import Tag from '../utility/Tag';
import type { Tag as TagType } from '../../models/Tag';

type Props = {
  images: Array<Image>,
  selectedImageId: string,
  onImageTagsChange: (imageId: string, tags: Array<TagType>) => void,
};

type State = {
  multiTags: Array<TagType>,
};

class MultiTagging extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      multiTags: [],
    };
  }

  getSelectedImage(): Image {
    const { images, selectedImageId } = this.props;
    const selectedImage = images.find(image => image.id === selectedImageId);

    if (!selectedImage) {
      throw new Error('MultiTagging: Could not find selected image in given images.');
    }

    return selectedImage;
  }

  addTagToSelected = (tag: TagType) => {
    this.addTagToImage(this.getSelectedImage(), tag);
  };

  removeTagFromSelected = (tag: TagType) => {
    this.removeTagFromImage(this.getSelectedImage(), tag);
  };

  addMultiTag = (multiTag: TagType) => {
    this.setState(state => ({ multiTags: [...state.multiTags, multiTag] }));

    this.props.images.forEach((image) => {
      this.addTagToImage(image, multiTag);
    });
  };

  removeMultiTag = (multiTag: TagType) => {
    this.setState(state => ({
      multiTags: state.multiTags.filter(existingMultiTag => existingMultiTag !== multiTag),
    }));

    this.props.images.forEach((image) => {
      this.removeTagFromImage(image, multiTag);
    });
  };

  addTagToImage(image: Image, tag: TagType) {
    this.props.onImageTagsChange(image.id, _.uniq([...image.userTags, tag]));
  }

  removeTagFromImage(image: Image, tag: TagType) {
    this.props.onImageTagsChange(
      image.id, image.userTags.filter(existingTag => existingTag !== tag),
    );
  }

  createMultiTag(tag: TagType) {
    const { multiTags } = this.state;

    return (
      <Tag
        key={shortid.generate()}
        className="TagSelector__tag"
        caption={tag}
        clickable
        isMultiTag={multiTags.includes(tag)}
        onClick={multiTags.includes(tag) ? this.removeMultiTag : this.addMultiTag}
        data-cy="tag-selector-tag"
      />
    );
  }

  createMultiTagSelector() {
    return (
      <TagSelector
        addTag={this.addTagToSelected}
        removeTag={this.removeTagFromSelected}
        tags={this.getSelectedImage().userTags}
        renderTag={(tag: TagType) => this.createMultiTag(tag)}
      />
    );
  }

  render() {
    const image = this.getSelectedImage();

    return (
      <Tagging
        image={image}
        addTag={this.addTagToSelected}
        removeTag={this.removeTagFromSelected}
        tagSelector={this.createMultiTagSelector()}
      />
    );
  }
}

export default MultiTagging;
