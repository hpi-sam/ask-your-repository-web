// @flow
import ImageService from '../../../services/ImageService';
import type { Image as APIImage } from '../../../models/Image';

export type Image = APIImage & {
    delete: () => void,
  };

class ImageDecorator {
  static decorateImage(image: APIImage, deleteCallback: (id: string)=> void = () => {}): Image {
    return {
      ...image,
      delete: () => {
        ImageService.delete(image.id);
        deleteCallback(image.id);
      },
    };
  }
}

export default ImageDecorator;
