// @flow
import React, { Fragment } from 'react';
import { FiSave } from 'react-icons/fi';
import type { DropFilesEventHandler } from 'react-dropzone';
import type { Tag as TagType } from '../../models/Tag';
import type { Upload } from '../../models/Upload';
import { SaveButton } from '../utility/buttons';
import MultiTagging from '../tagging/desktop/MultiTagging';
import UploadList from './UploadList';
import ActivityIndicator from '../utility/ActivityIndicator';

type Props = {
  multiTags: Array<TagType>,
  addMultiTag: (tag: TagType) => void,
  removeMultiTag: (tag: TagType) => void,
  uploads: Array<Upload>,
  selectedUpload: Upload,
  setSelectedUpload: (uploadId: string) => void,
  onFileDrop: DropFilesEventHandler,
  onSubmit: () => Promise<void>,
};

function UploadMultiTagging(props: Props) {
  const {
    multiTags,
    addMultiTag,
    removeMultiTag,
    selectedUpload,
    setSelectedUpload,
    uploads,
    onFileDrop,
    onSubmit,
  } = props;

  function isSaveable() {
    const areAllImagesUploaded = uploads.every(upload => !!upload.image);

    const areAllImagesTagged = uploads.every(upload => (
      upload.image && upload.image.userTags.length > 0
    ));

    return areAllImagesUploaded && areAllImagesTagged;
  }

  return (
    <Fragment>
      <div className="Upload__tagging">
        {selectedUpload && (
          <Fragment>
            {selectedUpload.status === 'ongoing' && (
              <ActivityIndicator
                text="Uploading"
                centered
              />
            )}
            {selectedUpload.image && (
              <MultiTagging
                image={selectedUpload.image}
                multiTags={multiTags}
                addMultiTag={addMultiTag}
                removeMultiTag={removeMultiTag}
              />
            )}
          </Fragment>
        )}
      </div>
      <div className="Upload__uploads">
        <UploadList
          onDrop={onFileDrop}
          uploads={uploads}
          onItemClick={setSelectedUpload}
          selectedUploadId={selectedUpload && selectedUpload.id}
        />
        {!isSaveable() && (
          <div className="Upload__save-disabled-hint">
            Add at least one tag to your image(s).
          </div>
        )}
        <SaveButton
          onClick={onSubmit}
          className="Upload__save-button"
          disabled={!isSaveable()}
        >
          <FiSave className="Upload__save-button__icon" />
          <span className="Upload__save-button__text">
            Finish
          </span>
        </SaveButton>
      </div>
    </Fragment>
  );
}

export default UploadMultiTagging;
