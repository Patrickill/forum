import { UserType } from '../support/user';

export interface ReplyDataType {
  content: string;
  createdOn: string;
  id: number;
  ip: string;
  ipLoc: string;
  isEssence: boolean;
  isUpvote: boolean;
  parent: number;
  postId: number;
  replyCount: number;
  root: number;

  upvoteCount: number;
  user: UserType;
}

export interface ReplyDetailType extends ReplyDataType {}

export interface CreateReplyType {
  content: string;
  parent: number;
  postId: number;
  root: number;
}

export interface ReplyType extends ReplyDetailType {
  children: ReplyDetailType[];
}
