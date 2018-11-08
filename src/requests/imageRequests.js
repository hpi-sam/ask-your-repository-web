// @flow
import api from '../config/api';

function fetchUploadImage(formData: FormData): Promise<any> {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };

  return api.post('/images', formData, { headers });
}

export default fetchUploadImage;
