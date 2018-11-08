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
      multiple={false}
      className="Dropzone"
      activeClassName="Dropzone--active"
      acceptClassName="Dropzone--accept"
      disabledClassName="Dropzone--disabled"
      onDrop={onDrop}
    >
      Place your file here
    </Dropzone>
  );
}

export default FileDropzone;
