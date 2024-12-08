import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import MarkdownEditor from './components/MarkdownEditer';
import { useForm } from 'react-hook-form';
import { PostType } from '@/types/post';
import MySelect from '@/components/common/MySelect';
import MultipleSelect from '@/components/common/MySelect/MultipleSelect';
import DraftBoxModal from './components/DraftBoxModal';

const Editor = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<PostType>();

  const defaultList = ['测试板块1', '测试板块2', '测试板块3', '测试板块4', '测试板块5'];
  const defaultCategory = [
    '测试板块1',
    '测试板块2',
    '测试板块3',
    '测试板块4',
    '测试板块5',
    '测试板块1',
    '测试板块2',
    '测试板块3',
    '测试板块4',
    '测试板块5',
    '测试板块1',
    '测试板块2',
    '测试板块3',
    '测试板块4',
    '测试板块5',
  ];

  const { isOpen: isOpenDraft, onOpen: onOpenDraft, onClose: onCloseDraft } = useDisclosure();

  const [topic, content, categoryIdList] = watch(['topic', 'content', 'categoryIdList']);
  return (
    <Box py={8} px={16} bg={'myGray.50'} h={'100%'} overflow={'overlay'}>
      <Flex w={'100%'} flexDir={'column'} gap={8}>
        <Flex align={'center'} justify={'space-between'}>
          <Box fontSize={'2xl'} fontWeight={'400'} color={'myGray.900'}>
            {'我要发帖子'}
          </Box>
          <Box color={'myGray.500'} cursor={'pointer'} onClick={onOpenDraft}>
            {'草稿箱'}
          </Box>
        </Flex>
        <Flex>
          <FormControl isInvalid={!!errors.topic}>
            <FormLabel label={'板块'} />
            <MySelect
              {...register('topic', { required: true })}
              value={topic}
              list={defaultList.map((item) => ({ label: item, value: item }))}
              onchange={(val) => {
                setValue('topic', val);
              }}
            />
          </FormControl>
        </Flex>
        <Flex>
          <FormControl isInvalid={!!errors.title}>
            <FormLabel label={'标题'} />
            <Input
              {...register('title', {
                required: true,
                maxLength: {
                  value: 120,
                  message: '标题不能超过120个字符',
                },
              })}
              placeholder={'请输入帖子标题'}
            />
          </FormControl>
        </Flex>

        <MarkdownEditor minHeight={2} value={content} setValue={(v) => setValue('content', v)} />

        <FormControl>
          <FormLabel label={'标签'} />
          <MultipleSelect<number>
            list={defaultCategory.map((item, index) => ({ label: item, value: index }))}
            value={categoryIdList as any}
            onSelect={(val) => setValue('categoryIdList', val)}
          />
        </FormControl>

        <Box>
          <FormLabel label={'权限控制'} />
          <CheckboxGroup>
            <Checkbox {...register('visibility')}>{'仅自己可见'}</Checkbox>
          </CheckboxGroup>
        </Box>
        <Flex w={'100%'} justify={'center'} gap={8}>
          <Button variant={'outline'} bg={'myGray.100'}>
            {'存为草稿'}
          </Button>
          <Button onClick={() => handleSubmit((data) => console.log(data))()}>{'发帖'}</Button>
        </Flex>
      </Flex>
      {isOpenDraft && <DraftBoxModal onClose={onCloseDraft} />}
    </Box>
  );
};

const FormLabel = ({ label }: { label: string }) => {
  return (
    <Box color={'myGray.500'} fontSize={'md'} pb={4}>
      {label}
    </Box>
  );
};

export default Editor;
