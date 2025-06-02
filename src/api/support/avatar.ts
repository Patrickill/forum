import axios from 'axios';
import { POST } from '../utils/request';
import { data } from 'react-router-dom';

const instance = axios.create({
  timeout: 60000,
  headers: {
    'content-type': 'application/json',
  },
});

export const getAIAvatar = async ({ value }: { value: string }): Promise<string> => {
  try {
    console.log('value', value);
    const { data } = (await instance.post('/ai/train-image', { value })) as any;

    if (data.status !== 'success') {
      throw new Error('Training failed');
    }

    const { data: res } = (await instance.get('/ai/use-existing-image')) as any;
    console.log('res', res);
    if (!res.image) {
      throw new Error('Image not found');
    }

    return Promise.resolve(res.image);
  } catch (error) {
    console.error('Error fetching AI avatar:', error);
    throw error; // 直接抛出错误，调用者可以处理
  }
};
