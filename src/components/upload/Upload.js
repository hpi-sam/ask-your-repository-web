// @flow
import React, { Component, Fragment } from 'react';
import uuidv4 from 'uuid/v4';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { FiSave } from 'react-icons/fi';
import FileDropzone from './FileDropzone';
import ImageService from '../../services/ImageService';
import { SaveButton } from '../utility/buttons';
import UploadList from './UploadList';
import UploadKeyboardListener from './UploadKeyboardHandler';
import MultiTagging from '../tagging/MultiTagging';
import type { Image } from '../../models/Image';
import type { Team } from '../../models/Team';
import type { Tag } from '../../models/Tag';
import type { Upload as UploadType } from '../../models/Upload';
import type { AppState } from '../../state/AppState';
import './Upload.scss';

type Props = {
  dispatch: Function,
  activeTeam: ?Team,
};

type State = {
  uploads: Array<UploadType>,
  selectedUploadId: ?string,
};

class Upload extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      uploads: [],
      selectedUploadId: null,
    };
  }

  getImages(): Array<?Image> {
    return this.state.uploads.map(upload => upload.image);
  }

  getSuccessfulImages(): Array<Image> {
    return (this.getImages().filter(image => !!image): Array<any>);
  }

  getUploadOfImage(imageId: string): ?UploadType {
    return this.state.uploads
      .find(upload => upload.image && upload.image.id === imageId);
  }

  addUploads = (uploads: UploadType[]) => {
    this.setState(state => ({
      uploads: [...state.uploads, ...uploads],
    }));
  };

  updateUpload = (id: string, updateData: Object) => {
    const { uploads } = this.state;
    const index = uploads.findIndex(upload => upload.id === id);
    uploads[index] = { ...uploads[index], ...updateData };

    this.setState({ uploads });
  };

  getSelectedUpload = (): ?UploadType => {
    const { uploads, selectedUploadId } = this.state;
    return uploads.find(upload => upload.id === selectedUploadId);
  };

  setSelectedUpload = (selectedUploadId: string) => {
    this.setState({ selectedUploadId });
  };

  hasSelectedUpload = () => !!this.state.selectedUploadId;

  handleFileDrop = (files: File[]) => {
    if (files.length === 0) return;

    const newUploads = files.map(file => ({
      file,
      status: 'ongoing',
      id: uuidv4(),
      image: null,
    }));

    if (!this.hasSelectedUpload()) {
      this.setSelectedUpload(newUploads[0].id);
    }

    this.addUploads(newUploads);

    newUploads.forEach((upload) => {
      this.submitImage(upload.file)
        .then(image => this.updateUpload(upload.id, {
          status: 'succeeded',
          image,
        }))
        .catch(() => this.updateUpload(upload.id, {
          status: 'failed',
        }));
    });
  };

  handleSubmitClick = async () => {
    const patchData = this.getSuccessfulImages()
      .map(image => ({
        id: image.id,
        tags: image.tags,
      }));

    await ImageService.patchMany(patchData);
    this.props.dispatch(push('/images'));
  };

  handleImageTagsChange = (imageId: string, tags: Array<Tag>) => {
    const upload = this.getUploadOfImage(imageId);
    if (!upload) return;

    this.updateUpload(upload.id, {
      image: { ...upload.image, tags },
    });
  };

  submitImage(file: File): Promise<Image> {
    const { activeTeam } = this.props;

    if (!activeTeam) throw Error('Missing active team.');

    const formData = new FormData();
    formData.append('image', file);
    formData.append('team_id', activeTeam.id);

    return ImageService.create(formData);
  }

  isFormSaveable() {
    const images = this.getSuccessfulImages();
    return images.every(image => image.tags.length !== 0);
  }

  render() {
    const { uploads, selectedUploadId } = this.state;
    const selectedUpload = this.getSelectedUpload();

    const isFormSaveable = this.isFormSaveable();

    return (
      <div className="Upload">
        <UploadKeyboardListener
          uploads={uploads}
          selectedUploadId={selectedUploadId}
          onSelectedChange={this.setSelectedUpload}
        />
        {uploads.length > 0 ? (
          <Fragment>
            <div className="Upload__tagging">
              {selectedUpload && selectedUpload.image && (
                <MultiTagging
                  selectedImageId={selectedUpload.image.id}
                  onImageTagsChange={this.handleImageTagsChange}
                  images={this.getSuccessfulImages()}
                />
              )}
            </div>
            <div className="Upload__uploads">
              <UploadList
                onDrop={this.handleFileDrop}
                uploads={uploads}
                onItemClick={this.setSelectedUpload}
                selectedUploadId={selectedUploadId}
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
