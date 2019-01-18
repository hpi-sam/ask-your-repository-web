// @flow
import React from 'react';
import Scrollbars from 'react-custom-scrollbars';
import Dropzone from 'react-dropzone';
import { IoIosAdd } from 'react-icons/io';
import type { DropFilesEventHandler } from 'react-dropzone';
import UploadListItem from './UploadListItem';
import UploadContext from './context/UploadContext';
import UploadKeyboardListener from './UploadKeyboardHandler';
import './UploadList.scss';

type Props = {
  onDrop: DropFilesEventHandler,
};

function UploadList(props: Props) {
  const { onDrop } = props;

  return (
    <UploadContext.Consumer>
      {state => (
        <div className="UploadList">
          <UploadKeyboardListener />
          <Dropzone
            className="UploadList__dropzone-item"
            onDrop={onDrop}
          >
            <IoIosAdd className="UploadList__dropzone-item__icon" />
            <span className="UploadList__dropzone-item__text">
              Upload more files
            </span>
          </Dropzone>
          <Scrollbars autoHide>
            <div className="UploadList__inner">
              {state.uploads.map((upload, index) => (
                <UploadListItem
                  upload={upload}
                  index={index}
                  key={upload.id}
                  onClick={state.setSelectedUpload}
                  isSelected={state.selectedUploadId === upload.id}
                />
              ))}
            </div>
          </Scrollbars>
        </div>
      )}
    </UploadContext.Consumer>
  );
}

export default UploadList;
