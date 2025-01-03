import MyDivider from '@/components/common/MyDivider';
import MyIcon from '@/components/common/MyIcon';
import { IconLib } from '@/components/common/MyIcon/constant';
import useRoute from '@/hooks/support/useRouter';
import { UserType } from '@/types/support/user';
import { formatTimeToChatTime } from '@/utils/time';
import { Avatar, Box, Flex } from '@chakra-ui/react';
import { postDetailType, postListType } from '@/types/core/post';
import { useUserStore } from '@/store/support/useUserStore';
import { delPost } from '@/api/core/post';
import { useRequest2 } from '@/hooks/core/useRequest';
import { useConfirm } from '@/hooks/common/useConfirm';

const PostCard = ({
  id,
  ipLoc,
  title,
  upvoteCount,
  collectCount,
  replyCount,
  viewCount,
  user,
  content,
  createdOn,
  setData,
}: postDetailType & { setData?: React.Dispatch<React.SetStateAction<postListType[]>> }) => {
  const { openNewTab } = useRoute();
  const { userInfo } = useUserStore();

  const { openConfirm, ConfirmModal } = useConfirm({
    type: 'delete',
  });

  const { run: deletePost } = useRequest2(({ id }: { id: number }) => delPost({ id }), {
    successToast: '删除成功',
    onSuccess: () => {
      setData && setData((pre) => pre.filter((item) => item.id !== id));
    },
  });

  return (
    <Box w={'100%'} pos={'relative'}>
      <Box
        mb={4}
        fontWeight={'bold'}
        fontSize={'lg'}
        color={'myGray.900'}
        _hover={{ cursor: 'pointer' }}
        onClick={() => {
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
      <Box mb={6} className="textEllipsis2" dangerouslySetInnerHTML={{ __html: content }}></Box>
      <Flex justify={'space-between'}>
        <Flex gap={2} align={'center'}>
          <Avatar w={'20px'} h={'20px'} src={user?.avatar} />
          <Box fontSize={'sm'} color={'myGray.600'}>
            {user?.nickname}
          </Box>
          <Box ml={4} fontSize={'sm'} color={'myGray.400'}>
            {formatTimeToChatTime(new Date(createdOn))}
          </Box>
        </Flex>
        <Flex gap={3}>
          <IconData name="view" amount={viewCount} />
          <IconData name="comment" amount={replyCount} />
          <IconData name="like" amount={upvoteCount} />
          {userInfo?.id === user.id && (
            <Box
              color={'myGray.400'}
              _hover={{ color: 'red', cursor: 'pointer' }}
              onClick={() => {
                openConfirm(() => deletePost({ id }), undefined, '确认删除该帖子吗')();
              }}
            >
              <MyIcon name="trash" />
            </Box>
          )}
        </Flex>
      </Flex>
      <MyDivider color={'myGray.100'} />
      <ConfirmModal />
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
