// @flow
import { useState, useEffect } from 'react';
import ImageService from '../../services/ImageService';
import type { Image } from '../../models/Image';

function useImage(imageId: string) {
  const [image, setImage] = useState<Image | null>(null);

  async function loadImage() {
    const responseImage = await ImageService.get(imageId);
    setImage(responseImage);
  }

  useEffect(() => {
    loadImage();
  }, [imageId]);

  return { image, setImage };
}

export default useImage;
