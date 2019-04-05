// @flow
import { useEffect } from 'react';
import _ from 'lodash';
import useMultiTags from './useMultiTags';
import useUploads from '../upload/useUploads';
import type { Tag } from '../../models/Tag';
import type { Upload } from '../../models/Upload';
import type { Team } from '../../models/Team';

function useTaggableUploads(team: ?Team) {
  const {
    uploads,
    getImages,
    getSuccessfulImages,
    getUploadOfImage,
    addUploads,
    updateUpload,
    selectedUploadId,
    hasSelectedUpload,
    setSelectedUpload,
  } = useUploads(team);

  function addTag(upload: Upload, tag: Tag) {
    if (!upload.image || upload.image.userTags.includes(tag)) return;

    updateUpload(upload.id, {
      image: {
        ...upload.image,
        userTags: [...upload.image.userTags, tag],
      },
    });
  }

  function removeTag(upload: Upload, tag: Tag) {
    if (!upload.image) return;

    updateUpload(upload.id, {
      image: {
        ...upload.image,
        userTags: upload.image.userTags.filter(existingTag => existingTag !== tag),
      },
    });
  }

  function onAddMultiTag(multiTag: Tag) {
    uploads.forEach((upload) => {
      addTag(upload, multiTag);
    });
  }

  function onRemoveMultiTag(multiTag: Tag) {
    uploads.forEach((upload) => {
      if (upload.id === selectedUploadId) return;
      removeTag(upload, multiTag);
    });
  }

  const {
    multiTags,
    addMultiTag,
    removeMultiTag,
  } = useMultiTags(onAddMultiTag, onRemoveMultiTag);

  useEffect(() => {
    const uploadsMissingMultiTags = uploads.filter((upload) => {
      if (!upload.image) return false;
      const { userTags } = upload.image;
      return multiTags.some(tag => !userTags.includes(tag));
    });

    uploadsMissingMultiTags.forEach((upload) => {
      if (!upload.image) return;

      updateUpload(upload.id, {
        image: {
          ...upload.image,
          userTags: _.union(upload.image.userTags, multiTags),
        },
      });
    });
  }, [uploads]);

  const decoratedUploads = uploads.map<Upload>(upload => ({
    ...upload,
    image: upload.image && {
      ...upload.image,
      addTag: (tag: Tag) => { addTag(upload, tag); },
      removeTag: (tag: Tag) => { removeTag(upload, tag); },
    },
  }));

  function getSelectedUpload(): ?Upload {
    return decoratedUploads.find(upload => upload.id === selectedUploadId);
  }

  return {
    uploads: decoratedUploads,
    getImages,
    getSuccessfulImages,
    getUploadOfImage,
    addUploads,
    updateUpload,
    getSelectedUpload,
    hasSelectedUpload,
    setSelectedUpload,
    multiTags,
    addMultiTag,
    removeMultiTag,
  };
}

export default useTaggableUploads;
