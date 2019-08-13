// @flow
import React from 'react';
import GalleryItem from './GalleryItem';
import type { DeletableImage } from '../../../models/Image';
import ActivityIndicator from '../../utility/ActivityIndicator';
import './Gallery.scss';

type Props = {
  images: Array<DeletableImage>,
  isLoading: boolean,
};

const Gallery = ({ images, isLoading }: Props) => (
  <>
    <div className="Gallery">
      {images.map(image => (
        <GalleryItem key={image.id} image={image} />
      ))}
    </div>
    {isLoading && (
      <div className="Gallery__loading">
        <ActivityIndicator />
      </div>
    )}
  </>
);

export default Gallery;
