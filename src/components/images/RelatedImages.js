// @flow
import React, { useState, useEffect } from 'react';
import ImageService from '../../services/ImageService';
import RelatedImagesItem from './RelatedImagesItem';
import './RelatedImages.scss';

type Props = {
  baseImageId: string,
};

function useRelatedImages(baseImageId) {
  const [relatedImages, setRelatedImages] = useState([]);

  async function fetchRelatedImages() {
    const images = await ImageService.related(baseImageId);
    setRelatedImages(images);
  }

  useEffect(() => {
    fetchRelatedImages();
  }, [baseImageId]);

  return relatedImages;
}

function RelatedImages(props: Props) {
  const relatedImages = useRelatedImages(props.baseImageId);

  return (
    <div className="RelatedImages">
      {relatedImages.map(image => (
        <RelatedImagesItem
          key={`${props.baseImageId}-${image.id}`}
          image={image}
        />
      ))}
    </div>
  );
}

export default RelatedImages;
