export interface ReplyDataType {
  content: string;
  createdOn: string;
  deletedOn: null;
  id: number;
  ip: string;
  ipLoc: string;
  isEssence: boolean;
  modifiedOn: string;
  parent: number;
  postId: number;
  replyCount: number;
  root: number;
  thumbsDownCount: number;
  thumbsUpCount: number;
  userId: number;
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
