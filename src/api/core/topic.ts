import { TopicType } from '@/types/core/topic';
import { DELETE, GET, POST, PUT } from '../utils/request';
import { PaginationResponse } from '@/types/support/request';

export const createTopic = ({ name, description }: TopicType) =>
  POST('/api/post/category/create', { name, description });

export const getTopics = ({ id }: { id: string }) => GET('/api/post/category/get', { id });

export const updateTopic = ({ id, name, description }: TopicType & { id: string }) =>
  PUT('/api/post/category/put', { id, name, description });

export const deleteTopic = ({ id }: { id: string }) => DELETE('/api/post/category/del', { id });

export const getTopicList = () => GET<PaginationResponse<TopicType>>('/api/post/category/list');
