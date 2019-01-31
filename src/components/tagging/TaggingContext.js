// @flow
import React from 'react';
import type { Tag } from '../../models/Tag';
import type { Image } from '../../models/Image';

export type UploadContextValue = {
  image: ?Image,
  addTag: (imageId: string, tag: Tag) => void,
  removeTag: (imageId: string, tag: Tag) => void,
};

const UploadContext = React.createContext<UploadContextValue>({
  image: null,
  addTag: () => {},
  removeTag: () => {},
});

export default UploadContext;
