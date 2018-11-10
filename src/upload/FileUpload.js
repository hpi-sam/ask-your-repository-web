// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import FileDropzone from './FileDropzone';
import Message from '../utility/Message';
import ErrorMessage from '../utility/ErrorMessage';
import fetchUploadImage from '../requests/imageRequests';
import { setImage } from '../state/image/image.actionCreators';
import './FileUpload.scss';

type Props = {
  dispatch: Function,
};

type State = {
  imageId: ?number,
  isUploading: boolean,
  hasUploaded: boolean,
  uploadError: ?string,
};

class FileUpload extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      imageId: null,
      isUploading: false,
      hasUploaded: false,
      uploadError: null,
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

    this.setState({
      isUploading: true,
      uploadError: null,
    });

    await fetchUploadImage(formData)
      .then(({ data }) => {
        this.setState({
          hasUploaded: true,
          imageId: data.id,
        });
      })
      .catch((error) => {
        if (error.response) {
          this.setState({ uploadError: error.response.message });
        } else {
          this.setState({ uploadError: 'Our server seems to be unavailable at the moment.' });
        }
      });

    this.setState({ isUploading: false });
  }

  render() {
    const {
      isUploading,
      uploadError,
    } = this.state;

    return (
      <div className="FileUpload">
        {isUploading && (
          <Message>
            Your image is being uploaded...
          </Message>
        )}
        {uploadError && (
          <ErrorMessage>{uploadError}</ErrorMessage>
        )}
        <FileDropzone onDrop={this.handleImageDrop} />
      </div>
    );
  }
}

export default connect()(FileUpload);
