import React, { Component } from 'react';
import UploadDropzone from './UploadDropzone';
import './FileUpload.scss';
import Message from '../utility/Message';
import ErrorMessage from '../utility/ErrorMessage';
import SuccessMessage from '../utility/SuccessMessage';
import fetchUploadImage from '../requests/imageRequests';

class FileUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedImage: null,
      isUploading: false,
      hasUploaded: false,
      uploadError: null,
    };
  }

  handleFileReaderLoad = (e) => {
    const { result } = e.target;
    this.setState({ selectedImage: result });
  };

  handleImageDrop = async (files) => {
    if (files && files[0]) {
      const image = files[0];
      await this.submitImage(image);

      if (this.state.hasUploaded) {
        const reader = new FileReader();
        reader.onload = this.handleFileReaderLoad;
        reader.readAsDataURL(image);
      }
    }
  };

  async submitImage(image) {
    const formData = new FormData();
    formData.append('image', image);

    this.setState({ isUploading: true });

    fetchUploadImage(formData)
      .then(() => this.setState({ hasUploaded: true }))
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
      selectedImage,
      isUploading,
      hasUploaded,
      uploadError,
    } = this.state;

    return (
      <div className="FileUpload">
        {isUploading && (
          <Message>
            Your image is being uploaded...
          </Message>
        )}
        {hasUploaded && (
          <SuccessMessage>
            Your image has uploaded successfully!
          </SuccessMessage>
        )}
        {uploadError && (
          <ErrorMessage>{uploadError}</ErrorMessage>
        )}
        {selectedImage ? (
          <img
            src={selectedImage}
            alt=""
            className="FileUpload__image-preview"
          />
        ) : (
          <UploadDropzone onDrop={this.handleImageDrop} />
        )}
      </div>
    );
  }
}

export default FileUpload;
