// @flow
import { useState, useEffect } from 'react';
import ImageService from '../services/ImageService';
import type { Image } from '../models/Image';

type State<S> = [S, ((S => S) | S) => void];

function useImage(imageId: string) {
  const [image, setImage]: State<?Image> = useState(null);

  async function loadImage() {
    const responseImage = await ImageService.get(imageId);
    setImage(responseImage);
  }

  useEffect(() => {
    loadImage();
  }, []);

  return { image, setImage };
}

export default useImage;
