// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { flashErrorMessage } from 'redux-flash';
import { Redirect } from 'react-router-dom';
import FileDropzone from './FileDropzone';
import ActivityIndicator from '../utility/ActivityIndicator';
import fetchUploadImage from '../../requests/imageRequests';
import { setImage } from '../../state/image/image.actionCreators';
import './FileUpload.scss';

type Props = {
  dispatch: Function,
};

type State = {
  imageId: ?number,
  isUploading: boolean,
  hasUploaded: boolean,
};

class FileUpload extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      imageId: null,
      isUploading: false,
      hasUploaded: false,
    };
  }

  setImageState(dataUri: string) {
    const { imageId } = this.state;
    if (!imageId) return;

    this.props.dispatch(setImage(imageId, dataUri));
  }

  handleImageDrop = async (files: Blob[]) => {
    if (files && files[0]) {
      const image = files[0];
      await this.submitImage(image);

      if (this.state.hasUploaded) {
        const reader = new FileReader();
        reader.onload = ({ target }) => this.setImageState(target.result);
        reader.readAsDataURL(image);
      }
    }
  };

  async submitImage(image: Blob) {
    const formData = new FormData();
    formData.append('image', image);

    this.setState({ isUploading: true });

    await fetchUploadImage(formData)
      .then(({ data }) => {
        this.setState({
          hasUploaded: true,
          imageId: data.id,
        });
      })
      .catch((error) => {
        const message = error.response
          ? error.response.message
          : 'Our server seems to be unavailable at the moment.';
        this.props.dispatch(flashErrorMessage(message));
      });

    this.setState({ isUploading: false });
  }

  render() {
    if (this.state.hasUploaded) {
      return <Redirect to="/tagging" />;
    }

    const { isUploading } = this.state;

    return (
      <div className="FileUpload">
        <div className="FileUpload__inner">
          {isUploading ? (
            <ActivityIndicator text="Uploading" />
          ) : (
            <FileDropzone onDrop={this.handleImageDrop} />
          )}
        </div>
      </div>
    );
  }
}

export default connect()(FileUpload);
