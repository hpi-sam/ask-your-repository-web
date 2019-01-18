// @flow
import React from 'react';
import type { Tag } from '../../../models/Tag';
import type { Upload } from '../../../models/Upload';
import type { Image } from '../../../models/Image';

export type UploadContextValue = {
  uploads: Array<Upload>,
  addUploads: (upload: Array<Upload>) => void,
  updateUpload: (id: string, updateData: Object) => void,
  setSelectedUpload: (id: string) => void,
  getSelectedUpload: () => ?Upload,
  hasSelectedUpload: () => boolean,
  selectedUploadId: ?string,
  getSuccessfulImages: () => Array<Image>,
  addTag: (imageId: string, tag: Tag) => void,
  removeTag: (imageId: string, tag: Tag) => void,
  multiTags: Array<Tag>,
  addMultiTag: (tag: Tag) => void,
  removeMultiTag: (tag: Tag, keepImageId: string) => void,
};

const UploadContext = React.createContext<UploadContextValue>({
  uploads: [],
  addUploads: () => {},
  updateUpload: () => {},
  setSelectedUpload: () => {},
  getSelectedUpload: () => null,
  hasSelectedUpload: () => false,
  selectedUploadId: null,
  getSuccessfulImages: () => [],
  addTag: () => {},
  removeTag: () => {},
  multiTags: [],
  addMultiTag: () => {},
  removeMultiTag: () => {},
});

export default UploadContext;
