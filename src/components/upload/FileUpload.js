// @flow
import React, { Component } from 'react';
import { blobToDataURL } from 'blob-util';
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
  isUploading: boolean,
  hasUploaded: boolean,
};

class FileUpload extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isUploading: false,
      hasUploaded: false,
    };
  }

  handleImageDrop = (files: Blob[]) => {
    if (files && files[0]) {
      const image = files[0];
      this.submitImage(image);
    }
  };

  async submitImage(image: Blob) {
    const { dispatch } = this.props;
    const formData = new FormData();
    formData.append('image', image);
    this.setState({ isUploading: true });

    try {
      const { data } = await fetchUploadImage(formData);
      const imageDataUri = await blobToDataURL(image);
      dispatch(setImage(data.id, imageDataUri));
      this.setState({ hasUploaded: true });
    } catch (error) {
      const message = error.response
        ? error.response.message
        : 'Our server seems to be unavailable at the moment.';
      dispatch(flashErrorMessage(message));
    }

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
