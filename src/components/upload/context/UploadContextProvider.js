// @flow
import React, { Component } from 'react';
import type { Node } from 'react';
import UploadContext from './UploadContext';
import type { Tag } from '../../../models/Tag';
import type { Upload } from '../../../models/Upload';
import type { UploadContextValue } from './UploadContext';

type Props = {
  children: Node,
};

type State = UploadContextValue;

class UploadContextProvider extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      uploads: [],
      addUploads: this.addUploads,
      updateUpload: this.updateUpload,
      setSelectedUpload: this.setSelectedUpload,
      getSelectedUpload: this.getSelectedUpload,
      hasSelectedUpload: this.hasSelectedUpload,
      getSuccessfulImages: this.getSuccessfulImages,
      selectedUploadId: null,
      addTag: this.addTag,
      removeTag: this.removeTag,
      multiTags: [],
      addMultiTag: this.addMultiTag,
      removeMultiTag: this.removeMultiTag,
    };
  }

  getSuccessfulImages = () => {
    const images = this.state.uploads.map(upload => upload.image);
    return (images.filter(image => !!image): Array<any>);
  }

  getUploadOfImage(imageId: string): ?Upload {
    return this.state.uploads
      .find(upload => upload.image && upload.image.id === imageId);
  }

  addUploads = (uploads: Upload[]) => {
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

  getSelectedUpload = (): ?Upload => {
    const { uploads, selectedUploadId } = this.state;
    return uploads.find(upload => upload.id === selectedUploadId);
  };

  setSelectedUpload = (selectedUploadId: string) => {
    this.setState({ selectedUploadId });
  };

  hasSelectedUpload = () => !!this.state.selectedUploadId;

  addTag = (imageId: string, tag: Tag) => {
    const upload = this.getUploadOfImage(imageId);
    if (!upload || !upload.image) return;

    this.updateUpload(upload.id, {
      image: {
        ...upload.image,
        tags: [...upload.image.tags, tag],
      },
    });
  };

  removeTag = (imageId: string, tag: Tag) => {
    const upload = this.getUploadOfImage(imageId);
    if (!upload || !upload.image) return;

    if (this.state.multiTags.includes(tag)) {
      this.removeMultiTag(tag);
      return;
    }

    this.updateUpload(upload.id, {
      image: upload.image && {
        ...upload.image,
        tags: upload.image.tags.filter(imageTag => imageTag !== tag),
      },
    });
  };


  addMultiTag = (tag: Tag) => {
    this.setState(state => ({
      multiTags: [...state.multiTags, tag],
    }));

    this.addTagToAllImages(tag);
  };

  removeMultiTag = (tag: Tag, keepImageId?: string) => {
    this.setState(state => ({
      multiTags: state.multiTags.filter(multiTag => multiTag !== tag),
    }));

    this.removeTagFromAllImages(tag, keepImageId);
  };

  addTagToAllImages(tag: Tag) {
    this.setState(state => ({
      uploads: state.uploads.map((upload) => {
        if (!upload.image || upload.image.tags.includes(tag)) return upload;
        upload.image.tags.push(tag);
        return upload;
      }),
    }));
  }

  removeTagFromAllImages(tag: Tag, imageExceptionId?: string) {
    this.setState(state => ({
      uploads: state.uploads.map((upload) => {
        if (
          !upload.image
          || (imageExceptionId && upload.image.id === imageExceptionId)
          || !upload.image.tags.includes(tag)
        ) return upload;

        return {
          ...upload,
          image: {
            ...upload.image,
            tags: upload.image.tags.filter(_tag => _tag !== tag),
          },
        };
      }),
    }));
  }

  render() {
    const { children } = this.props;

    return (
      <UploadContext.Provider value={{ ...this.state }}>
        {children}
      </UploadContext.Provider>
    );
  }
}

export default UploadContextProvider;
