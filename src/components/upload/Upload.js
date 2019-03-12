// @flow
import React, { Component, Fragment, useState } from 'react';
import uuidv4 from 'uuid/v4';
import { useMedia } from 'react-use';
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
import useUploads from '../../hooks/useUploads';
import MobileTagging from '../tagging/MobileTagging';
import MobileUploadMultiTagging from '../tagging/MobileUploadMultiTagging';

type Props = {
  dispatch: Function,
  activeTeam: ?Team,
};

function Upload(props: Props) {
  const {
    uploads,
    getUploadOfImage,
    getSelectedUpload,
    hasSelectedUpload,
    setSelectedUpload,
    updateUpload,
    addUploads,
    getSuccessfulImages,
  } = useUploads(props.activeTeam);
  const isMobile = useMedia('(max-width: 600px)');

  function handleFileDrop(files: File[]) {
    if (files.length === 0) return;

    const newUploads = files.map(file => ({
      file,
      status: 'ready',
      id: uuidv4(),
      image: null,
    }));

    if (!hasSelectedUpload()) {
      setSelectedUpload(newUploads[0].id);
    }

    addUploads(newUploads);
  }

  async function handleSubmitClick() {
    const patchData = getSuccessfulImages()
      .map(image => ({
        id: image.id,
        tags: image.userTags,
      }));

    await ImageService.patchMany(patchData);
    props.dispatch(push('/images'));
  }

  function handleImageTagsChange(imageId: string, userTags: Array<Tag>) {
    const upload = getUploadOfImage(imageId);
    if (!upload) return;
    updateUpload(upload.id, { image: { ...upload.image, userTags } });
  }

  function isFormSaveable() {
    const images = getSuccessfulImages();
    return images.every(image => image.userTags.length !== 0);
  }

  const selectedUpload = getSelectedUpload();

  return (
    <div className="Upload">
      <UploadKeyboardListener
        uploads={uploads}
        selectedUploadId={selectedUpload && selectedUpload.id}
        onSelectedChange={setSelectedUpload}
      />
      {uploads.length > 0 ? (
        <Fragment>
          {isMobile && selectedUpload ? (
            <MobileUploadMultiTagging
              selectedUpload={selectedUpload}
              setSelectedUpload={setSelectedUpload}
              uploads={uploads}
              onSubmit={handleSubmitClick}
              onFileDrop={handleFileDrop}
            />
          ) : (
            <Fragment>
              <div className="Upload__tagging">
                {selectedUpload && selectedUpload.image && (
                  <MultiTagging
                    selectedImageId={selectedUpload.image.id}
                    onImageTagsChange={handleImageTagsChange}
                    images={getSuccessfulImages()}
                  />
                )}
              </div>
              <div className="Upload__uploads">
                <UploadList
                  onDrop={handleFileDrop}
                  uploads={uploads}
                  onItemClick={setSelectedUpload}
                  selectedUploadId={selectedUpload && selectedUpload.id}
                />
                {!isFormSaveable && (
                  <div className="Upload__save-disabled-hint">
                    Add at least one tag to your image(s).
                  </div>
                )}
                <SaveButton
                  onClick={handleSubmitClick}
                  className="Upload__save-button"
                  disabled={!isFormSaveable()}
                >
                  <FiSave className="Upload__save-button__icon" />
                  <span className="Upload__save-button__text">
                    Finish
                  </span>
                </SaveButton>
              </div>
            </Fragment>
          )}
        </Fragment>
      ) : (
        <FileDropzone onDrop={handleFileDrop} />
      )}
    </div>
  );
}

const mapStateToProps = (state: AppState) => ({
  activeTeam: state.activeTeam,
});

export default connect(mapStateToProps)(Upload);
