import { CreateReplyType, ReplyDataType } from '@/types/core/reply';
import { GET, POST } from '../utils/request';
import { PaginationResponse } from '@/types/support/request';

export const getReplyByPostId = (data: { postId: number }) =>
  GET<PaginationResponse<ReplyDataType>>('/api/post/reply/get', data);

export const createReply = (data: CreateReplyType) => POST('/api/post/reply/add', data);

export const upvoteReply = (data: { replyId: number }) => POST('/api/post/reply/upvote', data);

export const downvoteReply = (data: { replyId: number }) => POST('/api/post/reply/downvote', data);

export const delReply = (data: { replyId: number }) => POST('/api/post/reply/del', data);
