import { TagType } from '@/types/core/post';
import { GET, POST } from '../utils/request';

export const addTag = (data: { name: string }) => POST('/api/post/tag/add', data);

export const getTagList = (data: { q: string }) => GET<TagType[]>('/api/search/tag', data);
