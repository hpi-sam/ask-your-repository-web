// @flow
import { useState, useEffect } from 'react';
import ImageService from '../services/ImageService';
import type { Upload } from '../models/Upload';
import type { Team } from '../models/Team';
import type { Image } from '../models/Image';
import type { Tag } from '../models/Tag';

type State<S> = [S, ((S => S) | S) => void];

function useUploads(team: ?Team) {
  const [uploads, setUploads]: State<Upload[]> = useState([]);
  const [selectedUploadId, setSelectedUpload]: State<string> = useState('');

  function submitImage(file: File): Promise<Image> {
    if (!team) throw Error('Missing team.');

    const formData = new FormData();
    formData.append('image', file);
    formData.append('team_id', team.id);

    return ImageService.create(formData);
  }

  function getImages(): Array<?Image> {
    return uploads.map(upload => upload.image);
  }

  function getSuccessfulImages(): Array<Image> {
    return (getImages().filter(image => !!image): Array<any>);
  }

  function getUploadOfImage(imageId: string): ?Upload {
    return uploads.find(upload => upload.image && upload.image.id === imageId);
  }

  function addUploads(newUploads: Upload[]) {
    setUploads([...uploads, ...newUploads]);
  }

  function updateUpload(id: string, updateData: Object) {
    const index = uploads.findIndex(upload => upload.id === id);
    const nextUploads = [...uploads];

    Object.keys(updateData).forEach((key) => {
      nextUploads[index][key] = updateData[key];
    });

    setUploads(nextUploads);
  }

  function hasSelectedUpload() {
    return !!selectedUploadId;
  }

  function createRetryHandler(upload: Upload) {
    return async () => {
      updateUpload(upload.id, { status: 'ongoing' });

      try {
        const image = await submitImage(upload.file);
        updateUpload(upload.id, {
          status: 'succeeded',
          image: {
            ...image,
            addTag: () => {},
            removeTag: () => {},
          },
        });
      } catch {
        updateUpload(upload.id, { status: 'failed' });
      }
    };
  }

  function createAddTagHandler(upload: Upload) {
    return (tag: Tag) => {
      if (!upload.image || upload.image.userTags.includes(tag)) return;

      updateUpload(upload.id, {
        image: {
          ...upload.image,
          userTags: [...upload.image.userTags, tag],
        },
      });
    };
  }

  function createRemoveTagHandler(upload: Upload) {
    return (tag: Tag) => {
      if (!upload.image) return;

      updateUpload(upload.id, {
        image: {
          ...upload.image,
          userTags: upload.image.userTags.filter(existingTag => existingTag !== tag),
        },
      });
    };
  }

  useEffect(() => {
    const readyUploads = uploads.filter(upload => upload.status === 'ready');

    readyUploads.forEach((upload) => {
      updateUpload(upload.id, { status: 'ongoing' });

      (async () => {
        try {
          const image = await submitImage(upload.file);
          updateUpload(upload.id, {
            status: 'succeeded',
            image: {
              ...image,
              addTag: () => {},
              removeTag: () => {},
            },
          });
        } catch {
          updateUpload(upload.id, { status: 'failed' });
        }
      })();
    });
  }, [uploads.length]);

  function getDecoratedUpload() {
    return uploads.map<Upload>(upload => ({
      ...upload,
      retry: createRetryHandler(upload),
      image: upload.image && {
        ...upload.image,
        addTag: createAddTagHandler(upload),
        removeTag: createRemoveTagHandler(upload),
      },
    }));
  }

  const decoratedUploads = getDecoratedUpload();

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
  };
}

export default useUploads;
