import { POST } from '../utils/request';

type FileResType = {
  fileUrl: string;
};

export const uploadFile = (data: FormData): Promise<FileResType> =>
  POST('/api/oss/upload', data, {
    headers: {
      'Content-Type': 'multipart/form-data; charset=utf-8',
    },
  });
