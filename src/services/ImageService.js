// @flow
import humps from 'humps';
import api from '../config/api';
import type { Image } from '../models/Image';
import type { Tag } from '../models/Tag';

type ListParams = {
  teamId: string,
  offset?: number,
  limit?: number,
  search?: string,
};

class ImageService {
  static async get(id: string): Promise<Image> {
    const response = await api.get(`/images/${id}`);
    return response.data;
  }

  static async list(params: ListParams): Promise<Image[]> {
    const response = await api.get('/images', {
      params: humps.decamelizeKeys(params),
    });

    return response.data.images;
  }

  static async create(formData: FormData): Promise<Image> {
    const headers = { 'Content-Type': 'multipart/form-data' };
    const response = await api.post('/images', formData, { headers });

    return response.data;
  }

  static async addTags(imageId: string, tags: Array<Tag>): Promise<Image> {
    const response = await api.post(`/images/${imageId}/tags`, { tags });

    return response.data;
  }

  static async patchMany(images: Image[]) {
    await api.patch('/images', { artifacts: images });
  }
}

export default ImageService;
