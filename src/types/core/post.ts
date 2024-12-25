import { UserType } from '../support/user';

export interface PostLink {
  content: string;
  id: number;
  isDel: boolean;
  postId: number;
  type: number;
}
export interface postDetailType {
  collectionCount: number;
  commentCount: number;
  content: string;
  createdOn: string;
  id: number;
  ip: string;
  ipLoc: string;
  isCollect: boolean;
  isUpvote: boolean;
  postLink: PostLink[];
  shareCount: number;
  tags: TagType[];
  title: string;
  upvoteCount: number;
  user: UserType;
  viewCount: number;
  visibility: number;
}

export interface Link {
  content: string;
  type: number;
}

export interface createPostType {
  categoryId: number;
  content: string;
  ip: string;
  ipLoc: string;
  link: Link[];
  tags: number[];
  title: string;
  visibility: number;
}

export interface postListType {
  collectionCount: number;
  commentCount: number;
  content: string;
  createdOn: string;
  id: number;
  ip: string;
  ipLoc: string;
  isCollect: boolean;
  isUpvote: boolean;
  postLink: PostLink[];
  shareCount: number;
  tags: TagType[];
  title: string;
  upvoteCount: number;
  user: UserType;
  viewCount: number;
  visibility: number;
}

export interface TagType {
  id: number;
  tag: string;
}
