// @flow
import React, { Fragment, useEffect } from 'react';
import uuidv4 from 'uuid/v4';
import { useMedia } from 'react-use';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import FileDropzone from './FileDropzone';
import ImageService from '../../services/ImageService';
import UploadKeyboardListener from './UploadKeyboardHandler';
import type { Team } from '../../models/Team';
import type { AppState } from '../../state/AppState';
import MobileUploadMultiTagging from '../tagging/mobile/MobileUploadMultiTagging';
import useTaggableUploads from '../tagging/useTaggableUploads';
import UploadMultiTagging from './UploadMultiTagging';
import './Upload.scss';

type Props = {
  dispatch: Function,
  activeTeam: ?Team,
  location: {
    state: {
      files?: Array<File>,
    },
  }
};

function Upload(props: Props) {
  const {
    uploads,
    getSelectedUpload,
    hasSelectedUpload,
    setSelectedUpload,
    addUploads,
    getSuccessfulImages,
    multiTags,
    addMultiTag,
    removeMultiTag,
  } = useTaggableUploads(props.activeTeam);
  const isMobile = useMedia('(max-width: 600px)');

  function handleFileDrop(files: File[]) {
    if (files.length === 0) return;

    const newUploads = files.map(file => ({
      file,
      status: 'ready',
      id: uuidv4(),
      image: null,
      retry: () => {},
    }));

    if (!hasSelectedUpload()) {
      setSelectedUpload(newUploads[0].id);
    }

    addUploads(newUploads);
  }

  useEffect(() => {
    const { files } = props.location.state;
    if (files) handleFileDrop(files);
  }, []);

  async function handleSubmitClick() {
    const patchData = getSuccessfulImages()
      .map(image => ({
        id: image.id,
        tags: image.userTags,
      }));

    await ImageService.patchMany(patchData);
    props.dispatch(push('/images'));
  }

  const selectedUpload = getSelectedUpload();
  const TaggingComponent = isMobile ? MobileUploadMultiTagging : UploadMultiTagging;

  return (
    <div className="Upload">
      <UploadKeyboardListener
        uploads={uploads}
        selectedUploadId={selectedUpload && selectedUpload.id}
        onSelectedChange={setSelectedUpload}
      />
      {uploads.length > 0 ? (
        <Fragment>
          {selectedUpload && (
            <Fragment>
              {selectedUpload && (
                <TaggingComponent
                  multiTags={multiTags}
                  addMultiTag={addMultiTag}
                  removeMultiTag={removeMultiTag}
                  selectedUpload={selectedUpload}
                  setSelectedUpload={setSelectedUpload}
                  uploads={uploads}
                  onSubmit={handleSubmitClick}
                  onFileDrop={handleFileDrop}
                />
              )}
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
