// @flow
import React, { Component, Fragment } from 'react';
import uuidv4 from 'uuid/v4';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { FiSave } from 'react-icons/fi';
import FileDropzone from './FileDropzone';
import ImageService from '../../services/ImageService';
import SaveButton from '../utility/SaveButton';
import Tagging from '../tagging/Tagging';
import UploadList from './UploadList';
import UploadContext from './context/UploadContext';
import type { Image } from '../../models/Image';
import type { Team } from '../../models/Team';
import type { AppState } from '../../state/AppState';
import './Upload.scss';

type Props = {
  dispatch: Function,
  activeTeam: ?Team,
};

class Upload extends Component<Props> {
  static contextType = UploadContext;

  handleFileDrop = (files: File[]) => {
    if (files.length === 0) return;

    const newUploads = files.map(file => ({
      file,
      status: 'ongoing',
      id: uuidv4(),
      image: null,
    }));

    if (!this.context.hasSelectedUpload()) {
      this.context.setSelectedUpload(newUploads[0].id);
    }

    this.context.addUploads(newUploads);

    newUploads.forEach((upload) => {
      this.submitImage(upload.file)
        .then(image => this.context.updateUpload(upload.id, {
          status: 'succeeded',
          image,
        }))
        .catch(() => this.context.updateUpload(upload.id, {
          status: 'failed',
        }));
    });
  };

  handleSubmitClick = async () => {
    const patchData = this.context.getSuccessfulImages()
      .map(image => ({
        id: image.id,
        tags: image.tags,
      }));

    await ImageService.patchMany(patchData);
    this.props.dispatch(push('/images'));
  };

  isFormSaveable() {
    const images = this.context.getSuccessfulImages();

    return images.every((image) => {
      if (image.tags.length === 0) {
        return false;
      }

      return true;
    });
  }

  submitImage(file: File): Promise<Image> {
    const { activeTeam } = this.props;

    if (!activeTeam) throw Error('Missing active team.');

    const formData = new FormData();
    formData.append('image', file);
    formData.append('team_id', activeTeam.id);

    return ImageService.create(formData);
  }

  render() {
    const { uploads } = this.context;
    const selectedUpload = this.context.getSelectedUpload();

    const isFormSaveable = this.isFormSaveable();

    return (
      <div className="Upload">
        {uploads.length > 0 ? (
          <Fragment>
            <div className="Upload__tagging">
              {selectedUpload && selectedUpload.image && (
                <Tagging image={selectedUpload.image} />
              )}
            </div>
            <div className="Upload__uploads">
              <UploadList
                onDrop={this.handleFileDrop}
                uploads={uploads}
              />
              {!isFormSaveable && (
                <div className="Upload__save-disabled-hint">
                  Add at least one tag to your image(s).
                </div>
              )}
              <SaveButton
                onClick={this.handleSubmitClick}
                className="Upload__save-button"
                disabled={!isFormSaveable}
              >
                <FiSave className="Upload__save-button__icon" />
                <span className="Upload__save-button__text">
                  Finish
                </span>
              </SaveButton>
            </div>
          </Fragment>
        ) : (
          <FileDropzone onDrop={this.handleFileDrop} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  activeTeam: state.activeTeam,
});

export default connect(mapStateToProps)(Upload);
