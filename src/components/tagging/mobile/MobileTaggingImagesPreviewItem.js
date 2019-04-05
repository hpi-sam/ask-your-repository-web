// @flow
import React, { useState, useEffect } from 'react';
import { blobToDataURL } from 'blob-util';
import { Bounce } from 'react-activity';
import { IoIosRepeat } from 'react-icons/io';
import classNames from 'classnames';
import { Button } from '../../utility/buttons';
import type { Upload } from '../../../models/Upload';
import './MobileTaggingImagesPreview.scss';
import 'react-activity/dist/react-activity.css';

type Props = {
  upload: Upload,
  isActive: boolean,
  setSelectedUpload: (uploadId: string) => void,
};

function MobileTaggingImagesPreview(props: Props) {
  const { upload } = props;
  const [dataURL, setDataURL] = useState(null);

  function handleClick() {
    props.setSelectedUpload(upload.id);
  }

  async function loadImageDataURL() {
    setDataURL(await blobToDataURL(upload.file));
  }

  function handleRetryClick() {
    upload.retry();
  }

  useEffect(() => {
    loadImageDataURL();
  });

  const className = classNames('MobileTaggingImagesPreview__item', `-${props.upload.status}`, {
    '-active': props.isActive,
  });

  return (
    <button
      className={className}
      onClick={handleClick}
      type="button"
    >
      <img
        src={dataURL}
        alt=""
      />
      {upload.image && (
        <div className="MobileTaggingImagesPreview__item__tag-amount">
          {upload.image.userTags.length}
        </div>
      )}
      <div className="MobileTaggingImagesPreview__item__overlay">
        {props.upload.status === 'ongoing' && (
          <Bounce
            color="#ffffff"
            size={8}
            speed={1}
            animating
          />
        )}
        {props.upload.status === 'failed' && (
          <Button
            className="MobileTaggingImagesPreview__item__retry-button"
            onClick={handleRetryClick}
          >
            <IoIosRepeat style={{ fontSize: '20px' }} />
          </Button>
        )}
      </div>
    </button>
  );
}

export default MobileTaggingImagesPreview;
