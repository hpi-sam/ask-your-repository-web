// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { flashErrorMessage } from 'redux-flash';
import { Redirect } from 'react-router-dom';
import FileDropzone from './FileDropzone';
import ActivityIndicator from '../utility/ActivityIndicator';
import ImageService from '../../services/ImageService';
import { setImage } from '../../state/image/image.actionCreators';
import type { Team } from '../../models/Team';
import type { AppState } from '../../state/AppState';
import './FileUpload.scss';
import { active } from 'glamor';

type Props = {
  dispatch: Function,
  activeTeam: ?Team,
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

  async submitImage(imageData: Blob) {
    const { dispatch, activeTeam } = this.props;

    if (!activeTeam) return;

    const formData = new FormData();
    formData.append('image', imageData);
    formData.append('team_id', activeTeam.id);

    this.setState({ isUploading: true });

    try {
      const image = await ImageService.create(formData);
      dispatch(setImage(image));
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

const mapStateToProps = (state: AppState) => ({
  activeTeam: state.activeTeam,
});

export default connect(mapStateToProps)(FileUpload);
