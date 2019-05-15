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
    const image: any = humps.camelizeKeys(response.data);
    return image;
  }

  static async list(params: ListParams): Promise<Image[]> {
    const response = await api.get('/images', {
      params: humps.decamelizeKeys(params),
    });
    const images: any = humps.camelizeKeys(response.data.images);
    return images;
  }

  static async related(id: string, limit: number = 5) {
    const response = await api.get(`/images/${id}/related`, {
      params: { limit },
    });
    const images: any = humps.camelizeKeys(response.data.images);
    return images;
  }

  static async create(formData: FormData): Promise<Image> {
    const headers = { 'Content-Type': 'multipart/form-data' };
    const response = await api.post('/images', formData, { headers });
    const image: any = humps.camelizeKeys(response.data);
    return image;
  }

  static async addTags(imageId: string, tags: Array<Tag>): Promise<Image> {
    const response = await api.post(`/images/${imageId}/tags`, { tags });
    const image: any = humps.camelizeKeys(response.data);
    return image;
  }

  static async patch(imageId: string, data: Object) {
    await api.patch(`/images/${imageId}`, data);
  }

  static async delete(imageId: string) {
    await api.delete(`images/${imageId}`);
  }

  static async patchMany(images: Array<{ id: string, tags: Array<Tag> }>) {
    await api.patch('/images', { artifacts: images });
  }
}

export default ImageService;
