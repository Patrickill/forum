import { POST } from '../utils/request';

export const uploadFile = (data: FormData): Promise<string> =>
  POST('/api/oss/upload', data, {
    headers: {
      'Content-Type': 'multipart/form-data; charset=utf-8',
    },
  });
