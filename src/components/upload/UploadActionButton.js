// @flow
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import { IoIosCloudUpload } from 'react-icons/io';
import './UploadActionButton.scss';

function UploadActionButton() {
  const [files, setFiles] = useState([]);

  function onDrop(inputFiles: File[]) {
    setFiles(inputFiles);
  }

  if (files.length > 0) {
    return <Redirect to={{ pathname: '/upload', state: { files } }} />;
  }

  return (
    <div className="UploadActionButton">
      <IoIosCloudUpload className="UploadActionButton__icon" />
      <Dropzone
        className="UploadActionButton__dropzone"
        onDrop={onDrop}
        data-testid="upload-action-button-dropzone"
      />
    </div>
  );
}

export default UploadActionButton;
