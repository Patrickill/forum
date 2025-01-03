import { CancelCollectPost, CancelStarPost, collectPost, starPost } from '@/api/core/post';
import MyIcon from '@/components/common/MyIcon';
import Tag from '@/components/common/Tag';
import { useRequest2 } from '@/hooks/core/useRequest';
import { Box, BoxProps, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const SliderList = ({
  replyCount,
  collectCount,
  upvoteCount,
  isCollect,
  isUpvote,
  scrollToComment,
  postId,
  refresh,
  ...props
}: BoxProps & {
  replyCount: number;
  collectCount: number;
  upvoteCount: number;
  isUpvote: boolean;
  isCollect: boolean;
  scrollToComment: () => void;
  postId: number;
  refresh: () => void;
}) => {
  const [collected, setCollected] = useState(isCollect);
  const [upvoted, setUpvoted] = useState(isUpvote);
  const { run: handleUpvote } = useRequest2(
    () => {
      console.log('isUpvote', isUpvote);
      return upvoted ? CancelStarPost({ id: postId }) : starPost({ id: postId });
    },
    {
      manual: true,
      onSuccess: () => {
        setUpvoted(!upvoted);
        refresh();
      },
    }
  );

  const { run: handleCollect } = useRequest2(
    () => {
      return collected ? CancelCollectPost({ id: postId }) : collectPost({ id: postId });
    },
    {
      manual: true,
      onSuccess: () => {
        setCollected(!collected);
        refresh();
      },
    }
  );

  useEffect(() => {
    setCollected(isCollect);
    setUpvoted(isUpvote);
  }, [isCollect, isUpvote]);

  return (
    <Flex gap={10} flexDir={'column'} {...props}>
      <Flex
        borderRadius={'50%'}
        bg={'white'}
        shadow={'base'}
        pos={'relative'}
        align={'center'}
        justify={'center'}
        w={'48px'}
        h={'48px'}
        cursor={'pointer'}
        onClick={handleUpvote}
      >
        <Flex align={'center'} justify={'center'}>
          <MyIcon
            w={'24px'}
            h={'24px'}
            name="like"
            color={upvoted ? 'primary.500' : 'myGray.500'}
          />
        </Flex>
        <Tag color={'myGray.500'} pos={'absolute'} top={-1} right={-3}>
          {upvoteCount}
        </Tag>
      </Flex>
      <Flex
        borderRadius={'50%'}
        bg={'white'}
        shadow={'base'}
        pos={'relative'}
        align={'center'}
        justify={'center'}
        w={'48px'}
        h={'48px'}
        cursor={'pointer'}
        onClick={handleCollect}
      >
        <Flex align={'center'} justify={'center'}>
          <MyIcon
            w={'24px'}
            h={'24px'}
            name="star"
            color={collected ? 'primary.500' : 'myGray.500'}
          />
        </Flex>
        <Tag color={'myGray.500'} pos={'absolute'} top={-1} right={-3}>
          {collectCount}
        </Tag>
      </Flex>
      <Flex
        borderRadius={'50%'}
        bg={'white'}
        shadow={'base'}
        pos={'relative'}
        align={'center'}
        justify={'center'}
        w={'48px'}
        h={'48px'}
        cursor={'pointer'}
        onClick={scrollToComment}
      >
        <Flex align={'center'} justify={'center'}>
          <MyIcon w={'24px'} h={'24px'} name="comment" />
        </Flex>
        <Tag color={'myGray.500'} pos={'absolute'} top={-1} right={-3}>
          {replyCount}
        </Tag>
      </Flex>
    </Flex>
  );
};

export default SliderList;
