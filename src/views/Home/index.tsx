import { Box, Button, Flex, Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import PageContainer from '@/components/common/Layout/PageContainer';
import LightRowTabs from '@/components/common/Tabs/LightRowTabs';
import { useMemo, useRef, useState } from 'react';
import MyDivider from '@/components/common/MyDivider';
import { BiChevronRight } from 'react-icons/bi';
import useRoute from '@/hooks/support/useRouter';
import SidePostCard from './components/SidePostCard';
import TagCard from '@/components/core/tag/TagCard';
import HotTagList from '@/components/core/tag/HotTagList';
import TopicTab from './components/TopicTab';
import { useRequest2 } from '@/hooks/core/useRequest';
import { getPostListByTopic } from '@/api/core/post';
import { usePagination } from '@/hooks/support/usePagination';
import MyBox from '@/components/common/MyBox';
import PostCard from '@/components/core/post/PostCard';
import { postListType } from '@/types/core/post';
import HotPostList from '@/components/core/post/HotPostList';
import { getTopicList } from '@/api/core/topic';
import MyIcon from '@/components/common/MyIcon';
import SearchInput from '@/components/core/post/SearchInput';
enum TabEnum {
  hot = 'hot',
  new = 'new',
}

const Home = () => {
  const [currentTab, setCurrentTab] = useState(TabEnum.hot);

  const { push, openNewTab } = useRoute();
  const ScrollContainerRef = useRef<HTMLDivElement>(null);

  const [currentTopic, setCurrentTopic] = useState(1);

  const {
    data: topicList,
    loading,
    mutate,
  } = useRequest2(getTopicList, {
    manual: false,
    onSuccess: (res) => {
      setCurrentTopic(res.list[0]?.id);
    },
  });

  const {
    data: postList,
    isLoading,
    getData: getPostList,
    ScrollData,
    setData: setPostList,
    total,
  } = usePagination<postListType>({
    api: getPostListByTopic,
    params: { categoryId: currentTopic },
    pageSize: 10,
    defaultRequest: true,
    refreshDeps: [currentTopic, topicList],
  });
  console.log('postList', postList);
  return (
    <PageContainer>
      <Flex w={'100%'} h={'100%'} p={6} ref={ScrollContainerRef} overflow={'overlay'} gap={6}>
        <Box flex={5}>
          <Flex justify={'space-between'} w={'100%'} p={1}>
            <TopicTab
              topicList={topicList?.list || []}
              value={currentTopic}
              setValue={setCurrentTopic}
            />
            <SearchInput />
          </Flex>
          <Box>
            <MyDivider color={'myGray.300'} />
          </Box>
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
            px={4}
            width={'200px'}
          />

          <ScrollData ScrollContainerRef={ScrollContainerRef} pt={4}>
            {postList?.map((item) => <PostCard {...item} />)}
          </ScrollData>
        </Box>
        <Box flex={1} h={'100%'} pl={4}>
          <Box w={'100%'} p={4}>
            <Button w={'300px'} borderRadius={20}>
              <Flex>
                <Box onClick={() => push('/edit')}>{'我要发帖子'}</Box>
                <Icon as={BiChevronRight} w={'20px'} h={'20px'} />
              </Flex>
            </Button>
          </Box>
          <HotPostList />
          <HotTagList />
        </Box>
      </Flex>
    </PageContainer>
  );
};

export default Home;
