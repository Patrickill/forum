import MyIcon from '@/components/common/MyIcon';
import { Avatar, Box, Flex } from '@chakra-ui/react';
import SliderList from './components/SliserList';
import MDEditor from '@uiw/react-md-editor';
import { useRef } from 'react';
import Header from '@/components/common/Layout/Header';
import { useRequest2 } from '@/hooks/core/useRequest';
import { getPostById } from '@/api/core/post';
import useRoute from '@/hooks/support/useRouter';
import MyBox from '@/components/common/MyBox';
import HotPostList from '@/components/core/post/HotPostList';
import { calculateReadingTime, formatTimeToChatTime } from '@/utils/time';
import HotTagList, { TagList } from '@/components/core/tag/HotTagList';
import Comment from './components/Comment';

const Post = () => {
  const { getQueryParam } = useRoute();

  const commentRef = useRef<HTMLDivElement>(null);
  const scrollToComment = () => {
    if (commentRef.current) {
      commentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { data: post, loading } = useRequest2(
    () => getPostById({ postId: getQueryParam('postId') || '' }),
    {
      manual: false,
    }
  );

  return (
    <MyBox bg={'myGray.50'} w={'100%'} h={'100%'} overflow={'overlay'} isLoading={loading}>
      <Header />
      <SliderList
        pos={'fixed'}
        top={'130px'}
        left={10}
        h={'300px'}
        w={'80px'}
        upvoteCount={post?.upvoteCount || 0}
        collectionCount={post?.collectionCount || 0}
        commentCount={post?.commentCount || 0}
        isCollect={post?.isCollect || false}
        isUpvote={post?.isUpvote || false}
        scrollToComment={scrollToComment}
      />

      <Flex minH={`calc(100vh - 100px)`} mt={'100px'} ml={'10%'} gap={10}>
        <Flex flexDir={'column'} w={'70%'} gap={6}>
          {/* 文章 */}
          <Flex flexDir={'column'} w={'100%'} bg={'white'} p={6}>
            <Box fontSize={'3xl'} color={'myGray.900'} fontWeight={'bold'}>
              {post?.title}
            </Box>
            <Flex alignItems={'center'} gap={6} my={4} color={'myGray.400'}>
              <Box color={'myGray.500'}>{post?.user.nickname}</Box>
              <Box>{formatTimeToChatTime(new Date(post?.createdOn || ''))}</Box>
              <Flex gap={1} align={'center'} justify={'center'}>
                <MyIcon name="view" /> {post?.viewCount}
              </Flex>
              <Flex gap={1} align={'center'} justify={'center'}>
                <MyIcon name="clock" /> {`阅读 ${calculateReadingTime(post?.content || '')} 分钟`}
              </Flex>
            </Flex>
            <Box mb={10}>
              <TagList tagList={post?.tags || []} />
            </Box>

            <MDEditor.Markdown source={post?.content} style={{ whiteSpace: 'pre-wrap' }} />
          </Flex>

          {/* 评论区 */}
          <Box ref={commentRef}>{post && <Comment postId={post?.id} />}</Box>
        </Flex>

        {/* 侧边栏 */}
        <Flex flexDir={'column'} gap={6} w={'25%'}>
          <Flex p={6} bg={'white'} flexDir={'column'} justify={'center'} align={'center'} gap={2}>
            <Avatar src={post?.user.avatar || ''} />
            <Box fontSize={'lg'}>{post?.user.nickname}</Box>
          </Flex>
          <Box bg={'white'} p={6}>
            {/* <HotPostList /> */}
          </Box>
        </Flex>
      </Flex>
    </MyBox>
  );
};

export default Post;
