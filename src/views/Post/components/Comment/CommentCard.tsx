import { ReplyDetailType, ReplyType } from '@/types/core/reply';
import { formatTimeToChatItemTime, formatTimeToChatTime } from '@/utils/time';
import { Avatar, Box, Flex, Input } from '@chakra-ui/react';
import { useContextSelector } from 'use-context-selector';
import { CommentContext } from './Provider';
import MyIcon from '@/components/common/MyIcon';
import MyTooltip from '@/components/common/MyToolTip';
import { useCallback, useContext, useState } from 'react';
import { useRequest2 } from '@/hooks/core/useRequest';
import { createReply, delReply } from '@/api/core/reply';
import { useToast } from '@/hooks/support/useToast';
import { useUserStore } from '@/store/support/useUserStore';

const CommentCard = ({ reply }: { reply: ReplyType }) => {
  return (
    <Box w={'100%'}>
      <ReplyCard {...reply} />
      <Box ml={'40px'}>
        {reply.children.map((item) => (
          <ReplyCard key={item.id} {...item} />
        ))}
      </Box>
    </Box>
  );
};

const ReplyCard = ({
  content,
  createdOn,
  userId,
  parent,
  root,
  thumbsUpCount,
  replyCount,
  id,
  postId,
}: ReplyDetailType) => {
  const context = useContext(CommentContext);
  const { userMap, replyMap, setReplyDataList } = { ...context };

  const { userInfo } = useUserStore();

  const [inputValue, setValue] = useState<string>('');
  const [showCommentInput, setShowCommentInput] = useState(false);
  const { toast } = useToast();

  const { run: deleteReply } = useRequest2(delReply, {
    onSuccess: () => {
      toast({
        title: '删除成功',
        status: 'success',
      });
      setReplyDataList((pre) => pre.filter((item) => item.id !== id));
    },
  });

  const sendReply = useCallback(() => {
    if (!inputValue) return;
    createReply({
      content: inputValue,
      parent: id,
      root: root === 0 ? id : root,
      postId,
    }).then(() => {
      toast({ status: 'success', title: '回复成功' });
      setReplyDataList((pre) => {
        const res = pre.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              replyCount: item.replyCount + 1,
            };
          }
          return item;
        });
        return [
          ...res,
          {
            content: inputValue,
            createdOn: new Date().toISOString(),
            deletedOn: null,
            id: Math.floor(Math.random() * 1000000),
            ip: '',
            ipLoc: '',
            isEssence: false,
            modifiedOn: '',
            parent: id,
            postId: postId,
            replyCount: 0,
            root: root === 0 ? id : root,
            thumbsDownCount: 0,
            thumbsUpCount: 0,
            userId: userInfo?.id || 111,
          },
        ];
      });
    });
  }, [inputValue, id, root, postId, userInfo?.id, setReplyDataList, toast]);

  return (
    <Flex w={'100%'} p={2}>
      {/* <Box>{'id' + id + ' root ' + root + ' parent ' + parent}</Box> */}
      <Box>
        <Avatar mt={2} h={'30px'} w={'30px'} src={userMap[userId]?.avatar} />
      </Box>
      <Box pl={4} pos={'relative'} flex={1} pb={2}>
        <Box fontSize={'md'}>
          {root === parent
            ? userMap[userId]?.nickname
            : `${userMap[userId]?.nickname} 回复 ${userMap[replyMap[parent].userId]?.nickname}`}
        </Box>
        <Box fontSize={'large'} color={'myGray.900'}>
          {content}
        </Box>
        <Flex gap={4} w={'100%'} fontSize={'sm'} py={2}>
          <Box>{formatTimeToChatTime(new Date(createdOn))}</Box>
          <Flex align={'center'} gap={1} _hover={{ cursor: 'pointer' }}>
            <MyIcon name="like" /> {thumbsUpCount ? thumbsUpCount : '点赞'}
          </Flex>
          <Flex
            align={'center'}
            gap={1}
            onClick={() => setShowCommentInput(!showCommentInput)}
            _hover={{ cursor: 'pointer' }}
          >
            <MyIcon name="comment" /> {replyCount ? replyCount : '回复'}
          </Flex>
          <Box
            pos={'absolute'}
            right={0}
            color={'myGray.400'}
            _hover={{ color: 'red', cursor: 'pointer' }}
            onClick={() => {
              deleteReply({ replyId: id });
            }}
          >
            <MyIcon name="trash" />
          </Box>
        </Flex>

        {/* 回复 */}
        <Flex display={showCommentInput ? 'flex' : 'none'} p={2} gap={4}>
          <Input
            placeholder={'回复'}
            value={inputValue}
            onChange={(e) => setValue(e.target.value)}
          />
          <Flex alignItems={'center'}>
            {/* send and stop icon */}
            {
              <Flex
                alignItems={'center'}
                justifyContent={'center'}
                flexShrink={0}
                h={['28px', '32px']}
                w={['28px', '32px']}
                borderRadius={'md'}
                bg={'primary.500'}
                cursor={!!inputValue ? 'pointer' : 'not-allowed'}
                lineHeight={1}
                onClick={sendReply}
              >
                {
                  <MyTooltip label={'发送'}>
                    <MyIcon name={'send'} width={'18px'} height={'18px'} color={'white'} />
                  </MyTooltip>
                }
              </Flex>
            }
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default CommentCard;
