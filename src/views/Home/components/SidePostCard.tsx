import MyTooltip from '@/components/common/MyToolTip';
import useRoute from '@/hooks/support/useRouter';
import { Box, Flex, Icon, Tooltip } from '@chakra-ui/react';
import { MdOutlineRemoveRedEye } from 'react-icons/md';

const SidePostCard = ({ view, title, id }: { title: string; view: number; id: number }) => {
  const { openNewTab } = useRoute();

  return (
    <Box p={2} pos={'relative'}>
      <MyTooltip title={title}>
        <Box
          color={'myGray.900'}
          className="textEllipsis2"
          fontWeight={'medium'}
          fontSize={'large'}
          _hover={{ cursor: 'pointer' }}
          onClick={() =>
            openNewTab({
              path: '/post',
              params: {
                postId: id.toString(),
              },
            })
          }
        >
          {title}
        </Box>
      </MyTooltip>
      <Flex color={'myGray.400'} alignItems={'center'} gap={1} py={2} fontSize={'md'}>
        <Icon as={MdOutlineRemoveRedEye} />
        <Box>{view}</Box>
      </Flex>
    </Box>
  );
};

export default SidePostCard;
