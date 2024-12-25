import Header from '@/components/common/Layout/Header';
import MyDivider from '@/components/common/MyDivider';
import MyTooltip from '@/components/common/MyToolTip';
import LightRowTabs from '@/components/common/Tabs/LightRowTabs';
import HotTagList from '@/components/core/tag/HotTagList';
import { Box, Flex } from '@chakra-ui/react';
import { useState } from 'react';

enum TabEnum {
  hot = 'hot',
  new = 'new',
}

const Tag = () => {
  const testTag = [
    {
      name: 'test',
      id: '1',
    },
    {
      name: 'test2',
      id: '2',
    },
    {
      name: 'test3',
      id: '3',
    },
    {
      name: 'test4',
      id: '4',
    },
    {
      name: 'test5',
      id: '5',
    },
    {
      name: 'test6',
      id: '6',
    },
    {
      name: 'test7',
      id: '7',
    },
    {
      name: 'test8',
      id: '8',
    },
    {
      name: 'test222222229',
      id: '9',
    },
    {
      name: 'test11111111111111110',
      id: '10',
    },
  ];

  const [currentTab, setCurrentTab] = useState(TabEnum.hot);

  return (
    <Box>
      <Header />
      <Flex mt={'60px'} w={'100%'} h={'100%'} overflow={'auto'} p={10} gap={6}>
        <Box flex={5}>
          <Box fontSize={'2xl'} fontWeight={'bold'} color={'myGray.900'}>
            {'标题'}
          </Box>
          <Box fontSize={'sm'} mt={4}>
            {'描述描述描述描述描述描述描述描述描述描述描述描述'}
          </Box>
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
            onChange={setCurrentTab}
            value={currentTab}
            width={'200px'}
          />
        </Box>
        <Box flex={1}>
          <HotTagList tagList={testTag} />
        </Box>
      </Flex>
    </Box>
  );
};

export default Tag;
