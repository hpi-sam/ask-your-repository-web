// @flow
import React from 'react';
import { IoIosRepeat } from 'react-icons/io';
import type { DropFilesEventHandler } from 'react-dropzone';
import { Button } from '../../utility/buttons';
import Tag from '../../utility/Tag';
import MobileTaggingImagesPreview from './MobileTaggingImagesPreview';
import ActivityIndicator from '../../utility/ActivityIndicator';
import MobileTaggingHeader from './MobileTaggingHeader';
import type { Tag as TagType } from '../../../models/Tag';
import type { Upload } from '../../../models/Upload';
import MobileTaggingImage from './MobileTaggingImage';
import './MobileTagging.scss';

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

function MobileUploadMultiTagging(props: Props) {
  const {
    multiTags,
    addMultiTag,
    removeMultiTag,
    selectedUpload,
    uploads,
    onSubmit,
  } = props;

  const { image, status } = selectedUpload;

  function prev() {
    const currentIndex = uploads.findIndex(({ id }) => id === selectedUpload.id);
    const prevIndex = (((currentIndex - 1) % uploads.length) + uploads.length) % uploads.length;
    props.setSelectedUpload(uploads[prevIndex].id);
  }

  function next() {
    const currentIndex = uploads.findIndex(({ id }) => id === selectedUpload.id);
    const nextIndex = (currentIndex + 1) % uploads.length;
    props.setSelectedUpload(uploads[nextIndex].id);
  }

  function handleRemoveTag(tag: TagType) {
    if (image) image.removeTag(tag);
    if (multiTags.includes(tag)) removeMultiTag(tag);
  }

  function isSaveable() {
    const areAllImagesUploaded = uploads.every(upload => !!upload.image);

    const areAllImagesTagged = uploads.every(upload => (
      upload.image && upload.image.userTags.length > 0
    ));

    return areAllImagesUploaded && areAllImagesTagged;
  }

  return (
    <div className="MobileTagging">
      <MobileTaggingHeader image={selectedUpload.image} />
      <MobileTaggingImagesPreview
        uploads={uploads}
        selectedUpload={selectedUpload}
        setSelectedUpload={props.setSelectedUpload}
        onDrop={props.onFileDrop}
      />
      <div className="MobileTagging__image-container">
        {status === 'ongoing' && (
          <div className="MobileTagging__info MobileTagging__loading">
            <ActivityIndicator />
            <span>Uploading</span>
          </div>
        )}
        {status === 'failed' && (
          <div className="MobileTagging__info MobileTagging__failed">
            <span>
              Your image failed to upload.
              <br />
              Please try again.
            </span>
            <Button onClick={selectedUpload.retry}>
              <IoIosRepeat />
              <span>Retry</span>
            </Button>
          </div>
        )}
        {status === 'succeeded' && image && (
          <MobileTaggingImage
            onSwipeLeft={prev}
            onSwipeRight={next}
            onSubmit={onSubmit}
            isSaveable={isSaveable()}
            image={image}
            renderTag={(tag: TagType) => (
              <Tag
                key={tag}
                caption={tag}
                removable
                onRemove={handleRemoveTag}
                clickable
                isMultiTag={multiTags.includes(tag)}
                onClick={multiTags.includes(tag) ? removeMultiTag : addMultiTag}
              />
            )}
          />
        )}
      </div>
    </div>
  );
}

export default MobileUploadMultiTagging;
