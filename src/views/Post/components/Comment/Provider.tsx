import { getReplyByPostId } from '@/api/core/reply';
import { getUserByIdArr } from '@/api/support/user';
import { useRequest2 } from '@/hooks/core/useRequest';
import { useUserStore } from '@/store/support/useUserStore';
import { ReplyDataType, ReplyDetailType, ReplyType } from '@/types/core/reply';
import { UserType } from '@/types/support/user';
import { createContext, useEffect, useState } from 'react';

type CommentProviderType = {
  replyMap: Record<number, ReplyDataType>;
  userMap: Record<number, UserType>;
  replyDataList: ReplyDataType[];
  setReplyDataList: React.Dispatch<React.SetStateAction<ReplyDataType[]>>;
  replyList: ReplyType[];
  refresh: () => void;
  postId: number;
};

export const CommentContext = createContext<CommentProviderType>({
  replyMap: {},
  userMap: {},
  replyDataList: [],
  setReplyDataList: () => {},
  refresh: () => {},
  replyList: [],
  postId: 0,
});

const Provider = ({ children, postId }: { children: React.ReactNode; postId: number }) => {
  const [replyDataList, setReplyDataList] = useState<ReplyDataType[]>([]);

  const { refresh } = useRequest2(() => getReplyByPostId({ postId }), {
    onSuccess: (res) => {
      setReplyDataList(res.list);
    },
    manual: false,
    refreshDeps: [postId],
  });

  const { userInfo } = useUserStore();

  const userMap = replyDataList?.reduce<Record<number, UserType>>((pre, cur) => {
    pre[cur.user.id] = cur.user;
    return pre;
  }, {});
  userMap[userInfo?.id || 0] = userInfo!;
  const replyMap = replyDataList?.reduce<Record<number, ReplyDataType>>((pre, cur) => {
    pre[cur.id] = cur;
    return pre;
  }, {});

  const rootReplyList =
    replyDataList && replyDataList?.filter((item) => item.root === 0 && item.parent === 0);

  const replyList =
    rootReplyList &&
    rootReplyList.map((item) => {
      return {
        ...item,
        children: replyDataList.filter((reply) => reply.root === item.id),
      };
    });

  const value: CommentProviderType = {
    replyMap,
    userMap: userMap || {},
    replyDataList,
    setReplyDataList,
    replyList,
    postId,
    refresh,
  };

  return <CommentContext.Provider value={value}>{children}</CommentContext.Provider>;
};

export default Provider;
