// @flow
import type { ImageState } from './image/image.reducer';
import type { PresentationState } from './presentation/presentation.reducer';

export type AppState = {
  image: ImageState,
  presentation: PresentationState,
};
