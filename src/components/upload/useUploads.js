// @flow
import { useState, useEffect } from 'react';
import ImageService from '../../services/ImageService';
import type { Upload } from '../../models/Upload';
import type { Team } from '../../models/Team';
import type { Image } from '../../models/Image';

type State<S> = [S, ((S => S) | S) => void];

function useUploads(team: ?Team) {
  const [uploads, setUploads]: State<Upload[]> = useState([]);
  const [selectedUploadId, setSelectedUpload]: State<string> = useState('');

  function updateUpload(id: string, updateData: Object) {
    const index = uploads.findIndex(upload => upload.id === id);
    const nextUploads = [...uploads];

    Object.keys(updateData).forEach((key) => {
      nextUploads[index][key] = updateData[key];
    });

    setUploads(nextUploads);
  }

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

  function hasSelectedUpload() {
    return !!selectedUploadId;
  }

  async function processUpload(upload) {
    updateUpload(upload.id, { status: 'ongoing' });

    try {
      const image = await submitImage(upload.file);
      updateUpload(upload.id, {
        status: 'succeeded',
        image,
      });
    } catch {
      updateUpload(upload.id, { status: 'failed' });
    }
  }

  useEffect(() => {
    const readyUploads = uploads.filter(upload => upload.status === 'ready');

    readyUploads.forEach((upload) => {
      updateUpload(upload.id, { status: 'ongoing' });
      processUpload(upload);
    });
  }, [uploads.length]);

  return {
    uploads: uploads.map<Upload>(upload => ({
      ...upload,
      retry: () => processUpload(upload),
    })),
    getImages,
    getSuccessfulImages,
    getUploadOfImage,
    addUploads,
    updateUpload,
    selectedUploadId,
    hasSelectedUpload,
    setSelectedUpload,
  };
}

export default useUploads;
