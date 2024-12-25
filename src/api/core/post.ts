import { PaginationProps, PagingData, RequestPaging } from '@/types/support/request';
import { GET, POST } from '../utils/request';
import { createPostType, postDetailType, postListType, TagType } from '@/types/core/post';
import { data } from 'react-router-dom';

export const createPost = (data: createPostType) => POST('/api/post/add', data);

export const getPostListByTopic = (data: { categoryId: string } & RequestPaging) =>
  GET<PagingData<postListType>>('/api/post/list/category', data);

export const getPostById = (data: { postId: string }) =>
  GET<postDetailType>('/api/post/single/get', data);

export const getHotPostList = ({ pageNum = 1, pageSize = 10 }: PaginationProps) =>
  GET<PagingData<postListType>>('/api/post/hot/day', {
    pageNum,
    pageSize,
  });

export const getStaredPostList = (data: RequestPaging) =>
  GET<PagingData<postDetailType>>('/api/post/star/get', data);

export const getCollectPostList = (data: RequestPaging) =>
  GET<PagingData<postDetailType>>('/api/post/collect/get', data);

export const starPost = (data: { postId: string }) => POST('/api/post/star/add', data);

export const collectPost = (data: { postId: string }) => POST('/api/post/collect/add', data);

export const CancelStarPost = (data: { postId: string }) => POST('/api/post/star/del', data);

export const CancelCollectPost = (data: { postId: string }) => POST('/api/post/collect/del', data);

export const searchPost = (data: { q: string } & RequestPaging) =>
  GET<PagingData<postListType>>('/api/search/post', data);
