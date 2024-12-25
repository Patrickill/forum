import { User, UserType } from '@/types/support/user';
import { GET, POST, PUT } from '../utils/request';

export const getUserByIdArr = (data: { userIds: number[] }) =>
  POST<UserType[]>('/api/user/batch-get', data);

export const getUserInfo = () => GET<UserType>('/api/user/info');

export const updateUserInfo = (data: User) => PUT('/api/user/info', data);
