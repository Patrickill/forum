import { Box, Flex } from '@chakra-ui/react';
import TagCard from './TagCard';
import MyDivider from '@/components/common/MyDivider';
import { TagType } from '@/types/core/post';

const HotTagList = () => {
  const testTag = [
    {
      tag: 'test',
      id: 1,
    },
    {
      tag: 'test2',
      id: 2,
    },
    {
      tag: 'test3',
      id: 3,
    },
    {
      tag: 'test222222229',
      id: 9,
    },
    {
      tag: 'test11111111111111110',
      id: 10,
    },
  ];

  return (
    <>
      <Box fontWeight={'600'} fontSize={'xl'} color={'myGray.900'}>
        {'本周热门标签'}
      </Box>
      <MyDivider px={2} />
      <TagList tagList={testTag} />
    </>
  );
};

export const TagList = ({ tagList }: { tagList: TagType[] }) => {
  return (
    <Flex flexWrap={'wrap'} gap={2}>
      {tagList.map((item) => (
        <TagCard tag={item.tag} />
      ))}
    </Flex>
  );
};
export default HotTagList;
