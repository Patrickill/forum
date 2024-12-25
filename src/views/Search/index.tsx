import { searchPost } from '@/api/core/post';
import Header from '@/components/common/Layout/Header';
import MyBox from '@/components/common/MyBox';
import PostCard from '@/components/core/post/PostCard';
import { usePagination } from '@/hooks/support/usePagination';
import useRoute from '@/hooks/support/useRouter';
import { postListType } from '@/types/core/post';
import { Flex } from '@chakra-ui/react';

const Search = () => {
  const { getQueryParam } = useRoute();
  const q = getQueryParam('q');
  const { data: postList } = usePagination<postListType>({
    api: searchPost,
    params: {
      q: q || '',
    },
    pageSize: 10,
    defaultRequest: true,
    refreshDeps: [q],
  });

  return (
    <MyBox bg={'myGray.50'} w={'100%'} h={'100%'} overflow={'overlay'}>
      <Header />
      <Flex
        py={8}
        w={'100%'}
        h={'calc(100% - 60px)'}
        flexDir={'column'}
        gap={8}
        px={16}
        mt={'60px'}
        align={'center'}
      >
        {postList?.map((item) => <PostCard key={item.id} {...item} />)}
      </Flex>
    </MyBox>
  );
};

export default Search;
