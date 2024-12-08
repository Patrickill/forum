import { Box, Button, Flex, Icon } from '@chakra-ui/react';
import PageContainer from '@/components/common/Layout/PageContainer';
import LightRowTabs from '@/components/common/Tabs/LightRowTabs';
import { useState } from 'react';
import MyDivider from '@/components/common/MyDivider';
import { BiChevronRight } from 'react-icons/bi';
import useRoute from '@/hooks/useRouter';
import SidePostCard from './components/SidePostCard';
import TagCard from '@/components/core/tag/TagCard';
enum TabEnum {
  hot = 'hot',
  new = 'new',
}

const Home = () => {
  const [currentTab, setCurrentTab] = useState(TabEnum.hot);

  const { push } = useRoute();

  const testTag = ['1111', '22222', '33333', '444442222', '222222222222sadsad'];

  return (
    <PageContainer>
      <Flex w={'100%'} h={'100%'} p={6}>
        <Box flex={5}>
          <Box w={'100%'} h={'200px'} bg={'myGray.100'}>
            {'我是背景图'}
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
        </Box>
        <Box flex={1} h={'100%'} p={4}>
          <Box w={'100%'} p={4}>
            <Button w={'300px'} borderRadius={20}>
              <Flex>
                <Box onClick={() => push('/edit')}>{'我要发帖子'}</Box>
                <Icon as={BiChevronRight} w={'20px'} h={'20px'} />
              </Flex>
            </Button>
          </Box>
          <Box>
            <Box fontWeight={'600'} fontSize={'xl'} color={'myGray.900'}>
              {'本周热门帖子'}
            </Box>
            <MyDivider px={2} />
            <SidePostCard
              title={'测试标题测试标题测试标题测试标题测试标题测试标题2222'}
              view={100}
            />
            <SidePostCard
              title={'测试标题测试标题测试标题测试标题测试标题测试标题2222'}
              view={100}
            />
            <SidePostCard
              title={'测试标题测试标题测试标题测试标题测试标题测试标题2222'}
              view={100}
            />
            <SidePostCard
              title={'测试标题测试标题测试标题测试标题测试标题测试标题2222'}
              view={100}
            />
            <SidePostCard
              title={'测试标题测试标题测试标题测试标题测试标题测试标题2222'}
              view={100}
            />
            <SidePostCard
              title={'测试标题测试标题测试标题测试标题测试标题测试标题2222'}
              view={100}
            />
          </Box>
          <Box>
            <Box fontWeight={'600'} fontSize={'xl'} color={'myGray.900'}>
              {'本周热门标签'}
            </Box>
            <MyDivider px={2} />
            <Flex flexWrap={'wrap'} gap={2}>
              {testTag.map((item) => (
                <TagCard key={item} tag={item} />
              ))}
            </Flex>
          </Box>
        </Box>
      </Flex>
    </PageContainer>
  );
};

export default Home;
