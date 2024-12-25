import MyIcon from '@/components/common/MyIcon';
import Tag from '@/components/common/Tag';
import { Box, BoxProps, Flex } from '@chakra-ui/react';

const SliderList = ({
  commentCount,
  collectionCount,
  upvoteCount,
  isCollect,
  isUpvote,
  scrollToComment,
  ...props
}: BoxProps & {
  commentCount: number;
  collectionCount: number;
  upvoteCount: number;
  isUpvote: boolean;
  isCollect: boolean;
  scrollToComment: () => void;
}) => {
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
      >
        <Flex align={'center'} justify={'center'}>
          <MyIcon
            w={'24px'}
            h={'24px'}
            name="like"
            color={isUpvote ? 'primary.500' : 'myGray.500'}
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
      >
        <Flex align={'center'} justify={'center'}>
          <MyIcon
            w={'24px'}
            h={'24px'}
            name="star"
            color={isCollect ? 'primary.500' : 'myGray.500'}
          />
        </Flex>
        <Tag color={'myGray.500'} pos={'absolute'} top={-1} right={-3}>
          {collectionCount}
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
          {commentCount}
        </Tag>
      </Flex>
    </Flex>
  );
};

export default SliderList;
