// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { flashSuccessMessage } from 'redux-flash';
import TagSelector from './TagSelector';
import SaveButton from '../utility/SaveButton';
import type { Image } from '../../models/Image';
import type { AppState } from '../../state/AppState';
import fetchCreateTags from '../../requests/tagRequests';
import './TaggingForm.scss';

type Props = {
  image: Image,
  dispatch: Function,
};

type State = {
  isSubmitted: boolean,
};

class TaggingForm extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isSubmitted: false,
    };
  }

  handleSubmit = async () => {
    const { image, dispatch } = this.props;

    try {
      await fetchCreateTags(image.id, image.tags);
      dispatch(flashSuccessMessage('Your image was sucessfully uploaded.'));
      this.setState({ isSubmitted: true });
    } catch (error) {
      // TODO: Error Handling
    }
  };

  render() {
    if (this.state.isSubmitted) {
      return <Redirect to="/upload" />;
    }

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
