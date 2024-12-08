import { RequestPaging } from '@/types/request';
import { GET, POST } from './utils/request';

export type postType = {
  categoryId: number;
  ip: string;
  ipLoc: string;
  title: string;
  visibility: number;
};

export const createPost = (data: postType) => POST('/api/post/add', data);

export const getPostListByTopic = (data: { categoryId: string } & RequestPaging) =>
  GET('/api/post/list/category', data);

export const getPostById = (data: { postId: string }) => GET('/api/post/single/get', data);

export const createPostContent = () => {};
