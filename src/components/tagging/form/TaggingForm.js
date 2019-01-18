// @flow
import React, { Component } from 'react';
import TagSelector from './TagSelector';
import TagSuggestions from './TagSuggestions';
import UploadContext from '../../upload/context/UploadContext';
import type { Image } from '../../../models/Image';
import type { Tag } from '../../../models/Tag';
import './TaggingForm.scss';

type Props = {
  image: Image,
};

class TaggingForm extends Component<Props> {
  static contextType = UploadContext;

  addTag = (tag: Tag) => {
    this.context.addTag(this.props.image.id, tag);
  };

  removeTag = (tag: Tag) => {
    this.context.removeTag(this.props.image.id, tag);
  };

  removeMultiTag = (tag: Tag) => {
    this.context.removeMultiTag(tag, this.props.image.id);
  };

  render() {
    const { image } = this.props;

    return (
      <div className="TaggingForm">
        <div className="TaggingForm__title">
          Tag your image!
        </div>
        <div className="TaggingForm__info">
          Suggestions - Type number to add
        </div>
        <TagSuggestions
          tags={image.tags}
          addTag={this.addTag}
        />
        <div className="TaggingForm__info">
          Type in a tag - Hit enter &#9166; - Repeat
        </div>
        <TagSelector
          tags={image.tags}
          addTag={this.addTag}
          removeTag={this.removeTag}
          multiTags={this.context.multiTags}
          addMultiTag={this.context.addMultiTag}
          removeMultiTag={this.removeMultiTag}
        />
        <div className="TaggingForm__tip">
          <div className="TaggingForm__tip__title">
            Multi-Tagging
          </div>
          You can press a tag to apply the tag
          <br />
          to all your uploaded images at once.
          <br />
          Multi tags will be highlighted with an extra border.
        </div>
      </div>
    );
  }
}

export default TaggingForm;
