// @flow
import React from 'react';
import TaggingForm from './form/TaggingForm';
import TaggingImagePreview from './TaggingImagePreview';
import type { Image } from '../../models/Image';
import './Tagging.scss';

type Props = {
  image: Image,
};

function Tagging(props: Props) {
  const { image } = props;

  return (
    <div className="Tagging">
      <TaggingForm image={image} />
      <TaggingImagePreview image={image} />
    </div>
  );
}

export default Tagging;
