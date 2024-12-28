import { searchPost } from '@/api/core/post';
import EmptyTip from '@/components/common/EmptyTip';
import Header from '@/components/common/Layout/Header';
import MyBox from '@/components/common/MyBox';
import PostCard from '@/components/core/post/PostCard';
import { usePagination } from '@/hooks/support/usePagination';
import useRoute from '@/hooks/support/useRouter';
import { postListType } from '@/types/core/post';
import { Box, Flex } from '@chakra-ui/react';
import { useRef } from 'react';

const Search = () => {
  const { getQueryParam } = useRoute();

  const ScrollContainerRef = useRef<HTMLDivElement>(null);

  const q = getQueryParam('q');
  const {
    data: postList,
    isLoading,
    ScrollData,
  } = usePagination<postListType>({
    api: searchPost,
    params: {
      q: q || '',
    },
    pageSize: 10,
    defaultRequest: true,
    refreshDeps: [q],
  });

  return (
    <MyBox bg={'myGray.50'} w={'100%'} h={'100%'} overflow={'overlay'} isLoading={isLoading}>
      <Header />

      <ScrollData
        py={8}
        display={'flex'}
        w={'100%'}
        h={'calc(100% - 60px)'}
        justifyContent={'center'}
        alignContent={'center'}
        flexDir={'column'}
        gap={8}
        px={16}
        mt={'60px'}
        p={4}
        bg={'white'}
        boxShadow={'md'}
        ScrollContainerRef={ScrollContainerRef}
      >
        <Box w={'60%'}>
          {postList?.map((item) => (
            <PostCard key={item.id} {...item} createdOn={item.createdOn || item.modifiedOn!} />
          ))}
        </Box>
      </ScrollData>
    </MyBox>
  );
};

export default Search;
