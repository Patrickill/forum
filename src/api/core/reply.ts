import { CreateReplyType, ReplyDataType } from '@/types/core/reply';
import { DELETE, GET, POST } from '../utils/request';
import { PaginationResponse } from '@/types/support/request';

export const getReplyByPostId = (data: { postId: number }) =>
  GET<PaginationResponse<ReplyDataType>>('/api/post/reply/list', data);

export const createReply = (data: CreateReplyType) => POST('/api/post/reply', data);

export const upvoteReply = (data: { id: number }) => POST('/api/post/reply/upvote', data);

export const downvoteReply = (data: { id: number }) => POST('/api/post/reply/downvote', data);

export const delReply = (data: { replyId: number }) => DELETE(`/api/post/reply/${data.replyId}`);
