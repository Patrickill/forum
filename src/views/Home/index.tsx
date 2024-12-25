import { Box, Button, Flex, Icon } from '@chakra-ui/react';
import PageContainer from '@/components/common/Layout/PageContainer';
import LightRowTabs from '@/components/common/Tabs/LightRowTabs';
import { useRef, useState } from 'react';
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
enum TabEnum {
  hot = 'hot',
  new = 'new',
}

const Home = () => {
  const [currentTab, setCurrentTab] = useState(TabEnum.hot);

  const { push } = useRoute();
  const ScrollContainerRef = useRef<HTMLDivElement>(null);

  const { data: topicList, loading } = useRequest2(getTopicList, {
    manual: false,
    onSuccess: (res) => {
      setCurrentTopic(res[0]?.id || 0);
    },
  });
  const [currentTopic, setCurrentTopic] = useState(0);

  const {
    data: postList,
    isLoading,
    ScrollData,
    total,
  } = usePagination<postListType>({
    api: getPostListByTopic,
    params: { categoryId: currentTopic },
    pageSize: 10,
    defaultRequest: true,
    refreshDeps: [currentTopic],
  });

  return (
    <PageContainer>
      <Flex w={'100%'} h={'100%'} p={6} ref={ScrollContainerRef} overflow={'overlay'} gap={6}>
        <Box flex={5}>
          <Flex justify={'center'} w={'100%'} p={1}>
            <TopicTab topicList={topicList || []} value={currentTopic} setValue={setCurrentTopic} />
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
            onChange={setCurrentTab}
            value={currentTab}
            px={4}
            width={'200px'}
          />

          <MyBox isLoading={isLoading} pt={4}>
            <ScrollData ScrollContainerRef={ScrollContainerRef}>
              {postList?.map((item) => <PostCard {...item} />)}
            </ScrollData>
          </MyBox>
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
          {/* <HotPostList /> */}
          <HotTagList />
        </Box>
      </Flex>
    </PageContainer>
  );
};

export default Home;
