import { Box, Flex } from '@chakra-ui/react';
import TagCard from './TagCard';
import MyDivider from '@/components/common/MyDivider';
import { TagType } from '@/types/core/post';
import { usePagination } from '@/hooks/support/usePagination';
import { getHotPostList } from '@/api/core/post';
import { getHotTagList } from '@/api/core/tag';

const HotTagList = () => {
  const { data: tagList } = usePagination({
    api: getHotTagList,
    defaultRequest: true,
  });

  return (
    <>
      <Box fontWeight={'600'} fontSize={'xl'} color={'myGray.900'}>
        {'本周热门标签'}
      </Box>
      <MyDivider px={2} />
      <TagList tagList={tagList} />
    </>
  );
};

export const TagList = ({ tagList }: { tagList: TagType[] }) => {
  return (
    <Flex flexWrap={'wrap'} gap={2}>
      {tagList.map((item) => (
        <TagCard tag={item.name} tagId={item.id} />
      ))}
    </Flex>
  );
};
export default HotTagList;
