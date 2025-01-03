import { TopicType } from '@/types/core/topic';
import { DELETE, GET, POST, PUT } from '../utils/request';
import { PaginationResponse, PagingData } from '@/types/support/request';
import { PaginationProps } from '../../types/support/request';
import { data } from 'react-router-dom';

export const createTopic = ({ name, description }: TopicType) =>
  POST('/api/post/category/create', { name, description });

export const getTopics = ({ id }: { id: string }) => GET('/api/post/category/get', { id });

export const updateTopic = ({ id, name, description }: TopicType & { id: string }) =>
  PUT('/api/post/category/put', { id, name, description });

export const deleteTopic = ({ id }: { id: string }) => DELETE('/api/post/category/del', { id });

export const getTopicList = (data: PaginationProps) =>
  GET<PagingData<TopicType>>('/api/post/category/list', data);
