// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TagSelector from './TagSelector';
import SaveButton from '../utility/SaveButton';
import type { Image } from '../../models/Image';
import type { AppState } from '../../state/AppState';
import fetchCreateTags from '../../requests/tagRequests';
import './TaggingForm.scss';

type Props = {
  image: Image,
};

class TaggingForm extends Component<Props> {
  handleSubmit = () => {
    const { image } = this.props;
    fetchCreateTags(image.id, image.tags);
  };

  render() {
    return (
      <div className="TaggingForm">
        <div className="TaggingForm__title">
          Tag your image!
        </div>
        <div className="TaggingForm__info">
          Type in a tag - Hit enter &#9166; - Repeat
        </div>
        <TagSelector />
        <SaveButton
          onClick={this.handleSubmit}
          className="TaggingForm__button"
        >
          Save
        </SaveButton>
      </div>
    );
  }
}

const mapStateToProps: Object = (state: AppState) => ({
  image: state.image,
});

export default connect(mapStateToProps)(TaggingForm);
