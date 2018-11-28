// @flow
import api from '../config/api';
import { receiveImages } from '../state/images/images.actionCreators';

class ImageService {
  static list = (offset: number, limit: number) => async (dispatch: Function) => {
    const params = { offset, limit };

    try {
      const response = await api.get('/images', { params });
      const { images } = response.data;
      await dispatch(receiveImages(images));
      return images;
    } catch (error) {
      // Handle error response
      return Promise.reject(error);
    }
  };
}

export default ImageService;
