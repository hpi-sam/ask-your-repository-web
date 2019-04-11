// @flow
import React, { useState, useEffect } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import { IoIosCloudUpload } from 'react-icons/io';
import './UploadActionButton.scss';

type Props = {
  location: { pathname: string },
};

function UploadActionButton(props: Props) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    return () => setFiles([]);
  }, []);

  function onDrop(inputFiles: File[]) {
    setFiles(inputFiles);
  }

  if (props.location.pathname === '/upload') {
    return null;
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
      />
    </div>
  );
}

export default withRouter(UploadActionButton);
