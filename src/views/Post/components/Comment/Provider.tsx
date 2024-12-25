import { getReplyByPostId } from '@/api/core/reply';
import { getUserByIdArr } from '@/api/support/user';
import { useRequest2 } from '@/hooks/core/useRequest';
import { ReplyDataType, ReplyDetailType, ReplyType } from '@/types/core/reply';
import { UserType } from '@/types/support/user';
import { createContext, useEffect, useState } from 'react';

type CommentProviderType = {
  replyMap: Record<number, ReplyDataType>;
  userMap: Record<number, UserType>;
  replyDataList: ReplyDataType[];
  setReplyDataList: React.Dispatch<React.SetStateAction<ReplyDataType[]>>;
  replyList: ReplyType[];
  postId: number;
};

export const CommentContext = createContext<CommentProviderType>({
  replyMap: {},
  userMap: {},
  replyDataList: [],
  setReplyDataList: () => {},
  replyList: [],
  postId: 0,
});

const Provider = ({ children, postId }: { children: React.ReactNode; postId: number }) => {
  const [replyDataList, setReplyDataList] = useState<ReplyDataType[]>([]);

  useRequest2(() => getReplyByPostId({ postId }), {
    onSuccess: (res) => {
      setReplyDataList(res);
    },
    manual: false,
    refreshDeps: [postId],
  });

  const { data: userMap } = useRequest2(
    async () => {
      const userIdList = replyDataList?.map((item) => item.userId);
      const res = await getUserByIdArr({ userIds: userIdList || [] });
      return (
        res &&
        res.reduce<Record<number, UserType>>((pre, cur) => {
          pre[cur.id] = cur;
          return pre;
        }, {})
      );
    },
    {
      manual: false,
    }
  );

  const replyMap =
    replyDataList &&
    replyDataList?.reduce<Record<number, ReplyDataType>>((pre, cur) => {
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
  };

  return <CommentContext.Provider value={value}>{children}</CommentContext.Provider>;
};

export default Provider;
