// @flow
import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import Dropzone from 'react-dropzone';
import { IoIosAdd } from 'react-icons/io';
import type { DropFilesEventHandler } from 'react-dropzone';
import UploadListItem from './UploadListItem';
import type { Upload } from '../../models/Upload';
import './UploadList.scss';

type Props = {
  uploads: Array<Upload>,
  selectedUploadId: ?string,
  onDrop: DropFilesEventHandler,
  onItemClick: (uploadId: string) => void,
};

function UploadList(props: Props) {
  return (
    <div className="UploadList">
      <Dropzone
        className="UploadList__dropzone-item"
        onDrop={props.onDrop}
      >
        <IoIosAdd className="UploadList__dropzone-item__icon" />
        <span className="UploadList__dropzone-item__text">
          Upload more files
        </span>
      </Dropzone>
      <Scrollbars autoHide autoHeight>
        <div className="UploadList__inner">
          {props.uploads.map((upload, index) => (
            <UploadListItem
              upload={upload}
              index={index}
              key={upload.id}
              onClick={props.onItemClick}
              isSelected={props.selectedUploadId === upload.id}
            />
          ))}
        </div>
      </Scrollbars>
    </div>
  );
}

export default UploadList;
