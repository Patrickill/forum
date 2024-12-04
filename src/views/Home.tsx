import { Box, Button, Flex, Icon } from '@chakra-ui/react';
import PageContainer from '@/components/common/Layout/PageContainer';
import LightRowTabs from '@/components/common/Tabs/LightRowTabs';
import { useState } from 'react';
import MyDivider from '@/components/common/MyDivider';
import { BiChevronRight } from 'react-icons/bi';
enum TabEnum {
  hot = 'hot',
  new = 'new',
}

const Home = () => {
  const [currentTab, setCurrentTab] = useState(TabEnum.hot);

  return (
    <PageContainer>
      <Flex w={'100%'} h={'100%'} p={6}>
        <Box flex={1}>
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
          />
          <Box h={'200px'} w={'100%'} bg={'myGray.200'}></Box>
          <Box h={'200px'} w={'100%'} bg={'myGray.200'}></Box>
          <Box h={'200px'} w={'100%'} bg={'myGray.200'}></Box>
          <Box h={'200px'} w={'100%'} bg={'myGray.200'}></Box>
        </Box>
        <Box w={'30vw'} p={4}>
          <Box w={'100%'}>
            <Button w={'300px'} borderRadius={20}>
              <Flex>
                <Box>{'我要发帖子'}</Box>
                <Icon as={BiChevronRight} w={'20px'} h={'20px'} />
              </Flex>
            </Button>
          </Box>
          <Box>
            <Box fontWeight={'600'} fontSize={'xl'} color={'myGray.900'}>
              {'本周热门帖子'}
            </Box>
            <MyDivider px={2} />
          </Box>
        </Box>
      </Flex>
    </PageContainer>
  );
};

export default Home;
