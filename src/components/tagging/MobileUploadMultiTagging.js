// @flow
import React, { Fragment } from 'react';
import Swipe from 'react-easy-swipe';
import { Link } from 'react-router-dom';
import { IoIosClose, IoIosRepeat } from 'react-icons/io';
import type { DropFilesEventHandler } from 'react-dropzone';
import Tag from '../utility/Tag';
import type { Tag as TagType } from '../../models/Tag';
import TagSuggestions from './form/TagSuggestions';
import MobileTaggingInput from './MobileTaggingInput';
import MobileTaggingImagesPreview from './MobileTaggingImagesPreview';
import ActivityIndicator from '../utility/ActivityIndicator';
import type { Upload } from '../../models/Upload';
import SourceSetFactory from '../../factories/SourceSetFactory';
import './MobileTagging.scss';
import { Button } from '../utility/buttons';
import useMultiTags from '../../hooks/useMultiTags';

type Props = {
  uploads: Array<Upload>,
  selectedUpload: Upload,
  setSelectedUpload: (uploadId: string) => void,
  onFileDrop: DropFilesEventHandler,
  onSubmit: () => {},
};

function MobileUploadMultiTagging(props: Props) {
  const { selectedUpload, uploads } = props;

  function onAddMultiTag(multiTag: TagType) {
    uploads.forEach(({ image }) => {
      if (!image) return;
      image.addTag(multiTag);
    });
  }

  function onRemoveMultiTag(multiTag: TagType) {
    uploads.forEach(({ image }) => {
      if (!image || image.id === selectedUpload.image.id) return;
      image.removeTag(multiTag);
    });
  }

  const {
    multiTags,
    addMultiTag,
    removeMultiTag,
  } = useMultiTags(onAddMultiTag, onRemoveMultiTag);

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
      <header>
        <div className="MobileTagging__suggestions-container">
          <h3 className="MobileTagging__suggestions__title">
            Suggestions
            <span className="MobileTagging__suggestions__tip">
              press to apply
            </span>
          </h3>
          <div className="MobileTagging__suggestions">
            {status === 'ongoing' && (
              <span>Loading...</span>
            )}
            {status === 'succeeded' && image && (
              <TagSuggestions
                tags={image.userTags}
                onSuggestionClick={image.addTag}
              />
            )}
          </div>
        </div>
        <Link to="back" className="MobileTagging__cancel">
          <IoIosClose />
          <span>Cancel</span>
        </Link>
      </header>
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
            <Button onClick={() => { selectedUpload.retry(); }}>
              <IoIosRepeat />
              <span>Retry</span>
            </Button>
          </div>
        )}
        {status === 'succeeded' && image && (
          <Fragment>
            <Swipe
              onSwipeLeft={prev}
              onSwipeRight={next}
            >
              <img
                srcSet={SourceSetFactory.create(image.url, [320, 480])}
                src={image.url}
                alt={image.userTags.join(' ')}
                className="MobileTagging__image"
              />
              <div className="MobileTagging__tags">
                {image.userTags.map(tag => (
                  <Tag
                    key={tag}
                    caption={tag}
                    removable
                    onRemove={handleRemoveTag}
                    clickable
                    isMultiTag={multiTags.includes(tag)}
                    onClick={multiTags.includes(tag) ? removeMultiTag : addMultiTag}
                  />
                ))}
              </div>
            </Swipe>
            <MobileTaggingInput
              onTagSubmit={image.addTag}
              onSave={props.onSubmit}
              isSaveDisabled={!isSaveable()}
            />
          </Fragment>
        )}
      </div>
    </div>
  );
}

export default MobileUploadMultiTagging;
