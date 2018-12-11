// @flow
import api from '../config/api';
import type { Image } from '../models/Image';

type ListParams = {
  offset?: number,
  limit?: number,
  search?: string,
};

class ImageService {
  static async list(params: ListParams): Promise<Image[]> {
    const response = await api.get('/images', { params });
    return response.data.images;
  }
}

export default ImageService;
