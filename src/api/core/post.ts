import { PaginationProps, PagingData, RequestPaging } from '@/types/support/request';
import { DELETE, GET, POST } from '../utils/request';
import { createPostType, postDetailType, postListType, TagType } from '@/types/core/post';
import { data } from 'react-router-dom';

export const createPost = (data: createPostType) => POST('/api/post', data);

export const getPostListByTopic = (data: { categoryId: string } & RequestPaging) =>
  GET<PagingData<postListType>>(`/api/post/list/category/${data.categoryId}`, data);

export const getPostById = (data: { postId: string }) =>
  GET<postDetailType>(`/api/post/${data.postId}`);

export const getHotPostList = ({ pageNum = 1, pageSize = 10 }: PaginationProps) =>
  GET<PagingData<postListType>>('/api/post/hot/day', {
    pageNum,
    pageSize,
  });

export const getStaredPostList = (data: RequestPaging) =>
  GET<PagingData<postDetailType>>('/api/post/upvote/list', data);

export const getCollectPostList = (data: RequestPaging) =>
  GET<PagingData<postDetailType>>('/api/post/collect/list', data);

export const starPost = (data: { id: number }) => POST('/api/post/upvote', data);

export const collectPost = (data: { id: number }) => POST('/api/post/collect', data);

export const CancelStarPost = (data: { id: number }) => POST('/api/post/downvote', data);

export const CancelCollectPost = (data: { id: number }) => POST('/api/post/uncollect', data);

export const searchPost = (data: { q: string } & RequestPaging) =>
  GET<PagingData<postListType>>('/api/search/post', data);

export const getMyPostList = (data: RequestPaging & { authorId: string }) =>
  GET<PagingData<postListType>>(`/api/post/list/user/${data.authorId}`, data);

export const delPost = (data: { id: number }) => DELETE(`/api/post/${data.id}`);

export const getPostByTag = (data: { tagId: string } & RequestPaging) =>
  GET<PagingData<postListType>>(`/api/post/list/tag/${data.tagId}`, data);
