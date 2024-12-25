import MyDivider from '@/components/common/MyDivider';
import MyIcon from '@/components/common/MyIcon';
import { IconLib } from '@/components/common/MyIcon/constant';
import useRoute from '@/hooks/support/useRouter';
import { UserType } from '@/types/support/user';
import { formatTimeToChatTime } from '@/utils/time';
import { Avatar, Box, Flex } from '@chakra-ui/react';
import { postDetailType } from '@/types/core/post';

const PostCard = ({
  id,
  ipLoc,
  title,
  upvoteCount,
  collectionCount,
  commentCount,
  viewCount,
  user,
  createdOn,
}: postDetailType) => {
  const { openNewTab } = useRoute();

  return (
    <Box w={'100%'}>
      <Box
        mb={6}
        fontWeight={'bold'}
        fontSize={'lg'}
        color={'myGray.900'}
        _hover={{ cursor: 'pointer' }}
        onClick={() => {
          console.log(id);
          openNewTab({
            path: `/post`,
            params: {
              postId: id.toString(),
            },
          });
        }}
      >
        {title}
      </Box>
      <Flex justify={'space-between'}>
        <Flex gap={2} align={'center'}>
          <Avatar w={'20px'} h={'20px'} src={user.avatar} />
          <Box fontSize={'sm'} color={'myGray.600'}>
            {user.nickname}
          </Box>
          <Box ml={4} fontSize={'sm'} color={'myGray.400'}>
            {formatTimeToChatTime(new Date(createdOn))}
          </Box>
        </Flex>
        <Flex gap={3}>
          <IconData name="view" amount={viewCount} />
          <IconData name="comment" amount={commentCount} />
          <IconData name="like" amount={upvoteCount} />
        </Flex>
      </Flex>
      <MyDivider color={'myGray.100'} />
    </Box>
  );
};

const IconData = ({ name, amount }: { name: keyof typeof IconLib; amount: number }) => {
  return (
    <Flex align={'center'} gap={1}>
      <MyIcon name={name} />
      <Box fontSize={'sm'}>{amount}</Box>
    </Flex>
  );
};

export default PostCard;
