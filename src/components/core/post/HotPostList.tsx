import { getHotPostList } from '@/api/core/post';
import MyDivider from '@/components/common/MyDivider';
import { useRequest2 } from '@/hooks/core/useRequest';
import SidePostCard from '@/views/Home/components/SidePostCard';
import { Box } from '@chakra-ui/react';

const HotPostList = () => {
  const { data } = useRequest2(getHotPostList, {
    manual: false,
    defaultParams: [{ pageNum: 1, pageSize: 10 }],
  });

  return (
    <Box fontWeight={'600'} fontSize={'xl'} color={'myGray.900'}>
      {'本周热门帖子'}

      <MyDivider px={2} />

      {data?.list.map((item) => (
        <SidePostCard key={item.id} title={item.title} view={item.viewCount} id={item.id} />
      ))}
    </Box>
  );
};

export default HotPostList;
