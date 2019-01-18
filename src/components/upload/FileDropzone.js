// @flow
import React from 'react';
import Dropzone from 'react-dropzone';
import type { DropFilesEventHandler } from 'react-dropzone';
import './FileDropzone.scss';

type Props = {
  onDrop: DropFilesEventHandler,
};

function FileDropzone(props: Props) {
  const { onDrop } = props;

  return (
    <Dropzone
      className="FileDropzone"
      activeClassName="FileDropzone--active"
      acceptClassName="FileDropzone--accept"
      disabledClassName="FileDropzone--disabled"
      onDrop={onDrop}
      data-cy="upload-dropzone"
    >
      <span className="FileDropzone__text">
        Place your file(s) here
      </span>
    </Dropzone>
  );
}

export default FileDropzone;
