// @flow
import faker from 'faker';
import ImageService from './ImageService';
import api from '../config/api';

jest.mock('../config/api', () => ({
  get: jest.fn(() => Promise.resolve({ data: { images: [] } })),
}));

describe('ImageService', () => {
  describe('list', () => {
    const teamId = faker.random.uuid();
    const limit = 5;
    const offset = 0;

    beforeEach(async () => {
      await ImageService.list({ teamId, offset, limit });
    });

    it('should send a GET request to /images', async () => {
      expect(api.get).toHaveBeenCalledWith(
        '/images',
        { params: { team_id: teamId, offset, limit } },
      );
    });
  });
});
