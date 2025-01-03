import { TagType } from '@/types/core/post';
import { GET, POST } from '../utils/request';
import { PaginationProps, PagingData } from '@/types/support/request';
import { data } from 'react-router-dom';

export const addTag = (data: { name: string }) => POST('/api/post/tag', data);

export const getTagList = (data: { q: string }) => GET<TagType[]>('/api/search/tag', data);

export const getTagById = (data: { id: string }) => GET<TagType>(`/api/post/tag/${data.id}`);

export const getHotTagList = (data: PaginationProps) =>
  GET<PagingData<TagType>>('/api/post/tag/hot/day', data);
