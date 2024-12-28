import { getPostByTag } from '@/api/core/post';
import EmptyTip from '@/components/common/EmptyTip';
import Header from '@/components/common/Layout/Header';
import MyDivider from '@/components/common/MyDivider';
import MyTooltip from '@/components/common/MyToolTip';
import LightRowTabs from '@/components/common/Tabs/LightRowTabs';
import PostCard from '@/components/core/post/PostCard';
import HotTagList from '@/components/core/tag/HotTagList';
import { useRequest2 } from '@/hooks/core/useRequest';
import { usePagination } from '@/hooks/support/usePagination';
import useRoute from '@/hooks/support/useRouter';
import { postListType } from '@/types/core/post';
import { Box, Flex } from '@chakra-ui/react';
import { useRef, useState } from 'react';

enum TabEnum {
  hot = 'hot',
  new = 'new',
}

const Tag = () => {
  const { getQueryParam } = useRoute();

  const ScrollContainerRef = useRef<HTMLDivElement>(null);

  const {
    data: postList,
    isLoading,
    setData: setPostList,

    ScrollData,
  } = usePagination<postListType>({
    api: getPostByTag,
    params: {
      tagId: getQueryParam('tagId'),
    },
    pageSize: 10,
    defaultRequest: true,
  });
  const [currentTab, setCurrentTab] = useState(TabEnum.hot);

  return (
    <Box>
      <Header />
      <Flex mt={'60px'} w={'100%'} h={'100%'} overflow={'auto'} p={10} gap={6}>
        <Box flex={5}>
          <Box fontSize={'2xl'} fontWeight={'bold'} color={'myGray.900'}>
            {'标题'}
          </Box>
          {/* <Box fontSize={'sm'} mt={4}>
            {'描述描述描述描述描述描述描述描述描述描述描述描述'}
          </Box> */}
          <Flex my={4}>
            <Box fontSize={'sm'} color={'myGray.400'}>
              {'帖子'}
            </Box>
            <Box ml={2} fontSize={'sm'} color={'myGray.900'} fontWeight={'bold'}>
              {'45092'}
            </Box>
          </Flex>
          <MyDivider />
          <LightRowTabs<TabEnum>
            list={[
              {
                label: '推荐',
                value: TabEnum.hot,
              },
              {
                label: '最新',
                value: TabEnum.new,
              },
            ]}
            onChange={(e) => {
              setPostList((res) => {
                if (e === TabEnum.hot) {
                  return res.sort((a, b) => b.upvoteCount - a.upvoteCount);
                }
                return res.sort(
                  (a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()
                );
              });
              setCurrentTab(e);
            }}
            value={currentTab}
            width={'200px'}
          />
          <ScrollData w={'100%'} p={4} bg={'white'} ScrollContainerRef={ScrollContainerRef}>
            {postList?.map((item) => (
              <PostCard key={item.id} {...item} createdOn={item.createdOn || item.modifiedOn!} />
            ))}
            {postList?.length === 0 && !isLoading && <EmptyTip />}
          </ScrollData>
        </Box>

        <Box flex={1}>
          <HotTagList />
        </Box>
      </Flex>
    </Box>
  );
};

export default Tag;
