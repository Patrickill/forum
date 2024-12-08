import MyIcon from '@/components/common/MyIcon';
import { Box, Flex } from '@chakra-ui/react';
import SliderList from './components/SliserList';
import MDEditor from '@uiw/react-md-editor';
import SidePostCard from '../Home/components/SidePostCard';
import MyDivider from '@/components/common/MyDivider';
import MyTextArea from '@/components/core/post/TextArea';
import { useRef } from 'react';

const Post = () => {
  const testPost =
    '# 1111 \n nihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihaonihao';
  const TextareaDom = useRef<HTMLTextAreaElement>(null);

  return (
    <Box bg={'myGray.50'} w={'100%'} h={'100%'} overflow={'overlay'}>
      <SliderList pos={'fixed'} top={20} left={10} h={'300px'} w={'80px'} />

      <Flex minH={'100%'} mt={'80px'} ml={'12%'} gap={10}>
        <Flex flexDir={'column'} w={'70%'} gap={6}>
          {/* 文章 */}
          <Flex flexDir={'column'} w={'100%'} bg={'white'} p={6}>
            <Box fontSize={'3xl'} color={'myGray.900'} fontWeight={'bold'}>
              {'测试标题测试标题测试标题测试标题测试标题测试标题'}
            </Box>
            <Flex alignItems={'center'} gap={2} mt={4} mb={10}>
              <Box>{'作者'}</Box>
              <Box>{'时间'}</Box>
              <Box>{'浏览量'}</Box>
              <Box>{'标签list'}</Box>
            </Flex>
            <MDEditor.Markdown source={testPost} style={{ whiteSpace: 'pre-wrap' }} />
          </Flex>

          {/* 评论区 */}
          <Flex flexDir={'column'} w={'100%'} bg={'white'} p={6}>
            <Box fontSize={'lg'} fontWeight={'bold'} color={'myGray.900'}>
              {'评论 58'}
            </Box>

            <MyTextArea TextareaDom={TextareaDom} />
          </Flex>
        </Flex>

        {/* 侧边栏 */}
        <Flex flexDir={'column'} gap={6}>
          <Box p={6} bg={'white'}>
            {'头像'}
          </Box>
          <Box bg={'white'} p={6}>
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
        </Flex>
      </Flex>
    </Box>
  );
};

export default Post;
