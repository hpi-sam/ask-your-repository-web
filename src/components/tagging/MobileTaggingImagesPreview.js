// @flow
import React from 'react';
import Dropzone from 'react-dropzone';
import type { DropFilesEventHandler } from 'react-dropzone';
import { IoIosAdd } from 'react-icons/io';
import type { Upload } from '../../models/Upload';
import MobileTaggingImagesPreviewItem from './MobileTaggingImagesPreviewItem';
import './MobileTaggingImagesPreview.scss';

type Props = {
  uploads: Array<Upload>,
  selectedUpload: Upload,
  onDrop: DropFilesEventHandler,
  setSelectedUpload: (uploadId: string) => void,
};

function MobileTaggingImagesPreview(props: Props) {
  return (
    <div className="MobileTaggingImagesPreview">
      <div className="MobileTaggingImagesPreview__list">
        {props.uploads.map(upload => (
          <MobileTaggingImagesPreviewItem
            key={upload.id}
            upload={upload}
            isActive={props.selectedUpload.id === upload.id}
            setSelectedUpload={props.setSelectedUpload}
          />
        ))}
      </div>
      <Dropzone
        className="MobileTaggingImagesPreview__add-button"
        onDrop={props.onDrop}
      >
        <IoIosAdd />
      </Dropzone>
    </div>
  );
}

export default MobileTaggingImagesPreview;
