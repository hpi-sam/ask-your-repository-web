// @flow
import type { ImageState } from './image/image.reducer';
import type { ImagesState } from './images/images.reducer';

export type AppState = {
  image: ImageState,
  images: ImagesState,
};
