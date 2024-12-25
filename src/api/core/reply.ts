import { CreateReplyType, ReplyDataType } from '@/types/core/reply';
import { GET, POST } from '../utils/request';

export const getReplyByPostId = (data: { postId: number }) =>
  GET<ReplyDataType[]>('/api/post/reply/get', data);

export const createReply = (data: CreateReplyType) => POST('/api/post/reply/add', data);

export const starReply = (data: { replyId: number }) => POST('/api/post/reply/star', data);

export const delReply = (data: { replyId: number }) => POST('/api/post/reply/del', data);
