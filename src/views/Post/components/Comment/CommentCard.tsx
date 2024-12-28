import { ReplyDetailType, ReplyType } from '@/types/core/reply';
import { formatTimeToChatItemTime, formatTimeToChatTime } from '@/utils/time';
import { Avatar, Box, Flex, Input } from '@chakra-ui/react';
import { useContextSelector } from 'use-context-selector';
import { CommentContext } from './Provider';
import MyIcon from '@/components/common/MyIcon';
import MyTooltip from '@/components/common/MyToolTip';
import { useCallback, useContext, useState } from 'react';
import { useRequest2 } from '@/hooks/core/useRequest';
import { createReply, delReply, downvoteReply, upvoteReply } from '@/api/core/reply';
import { useToast } from '@/hooks/support/useToast';
import { useUserStore } from '@/store/support/useUserStore';

const CommentCard = ({ reply }: { reply: ReplyType }) => {
  console.log('reply', reply);
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
  user,
  parent,
  root,
  upvoteCount,
  replyCount,
  id,
  postId,
  isUpvote,
}: ReplyDetailType) => {
  const context = useContext(CommentContext);
  const { userMap, replyMap, setReplyDataList, refresh } = { ...context };
  const [isUpvoted, setisUpvoted] = useState(isUpvote);
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
      refresh();
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
      setShowCommentInput(false);
      setValue('');

      refresh();
    });
  }, [inputValue, id, root, postId, userInfo?.id, setReplyDataList, toast]);

  const { run: handleUpvote } = useRequest2(
    () => {
      return isUpvoted ? downvoteReply({ replyId: id }) : upvoteReply({ replyId: id });
    },
    {
      onSuccess: () => {
        setisUpvoted((pre) => !pre);
        setReplyDataList((pre) => {
          return pre.map((item) => {
            console.log('item', item);
            if (item.id === id) {
              return {
                ...item,
                upvoteCount: item.upvoteCount + (isUpvoted ? -1 : 1),
                isUpvote: !isUpvoted,
              };
            }
            return item;
          });
        });
      },
    }
  );

  return (
    <Flex w={'100%'} p={2}>
      {/* <Box>{'id' + id + ' root ' + root + ' parent ' + parent}</Box> */}
      <Box>
        <Avatar mt={2} h={'30px'} w={'30px'} src={userMap[user.id]?.avatar} />
      </Box>
      <Box pl={4} pos={'relative'} flex={1} pb={2}>
        <Box fontSize={'md'}>
          {root === parent
            ? userMap[user.id]?.nickname
            : `${userMap[user.id]?.nickname} 回复 ${userMap[replyMap[parent].user.id]?.nickname}`}
        </Box>
        <Box fontSize={'large'} color={'myGray.900'}>
          {content}
        </Box>
        <Flex gap={4} w={'100%'} fontSize={'sm'} py={2}>
          <Box>{formatTimeToChatTime(new Date(createdOn))}</Box>
          <Flex
            align={'center'}
            gap={1}
            _hover={{ cursor: 'pointer' }}
            onClick={handleUpvote}
            color={isUpvoted ? 'primary.600' : 'myGray.600'}
          >
            <MyIcon name="like" /> {upvoteCount ? upvoteCount : '点赞'}
          </Flex>
          <Flex
            align={'center'}
            gap={1}
            onClick={() => setShowCommentInput(!showCommentInput)}
            _hover={{ cursor: 'pointer' }}
          >
            <MyIcon name="comment" /> {replyCount ? replyCount : '回复'}
          </Flex>
          {userInfo?.id === user.id && (
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
          )}
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
