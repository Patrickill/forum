import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  Input,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import MarkdownEditor from './components/MarkdownEditer';
import { set, useForm } from 'react-hook-form';
import { createPostType } from '@/types/core/post';
import MySelect from '@/components/common/MySelect';
import MultipleSelect from '@/components/common/MySelect/MultipleSelect';
import DraftBoxModal from './components/DraftBoxModal';
import Header from '@/components/common/Layout/Header';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRequest2 } from '@/hooks/core/useRequest';
import { getTopicList } from '@/api/core/topic';
import { useSelectFile } from '@/hooks/common/useSelectFile';
import { uploadFile } from '@/api/support/file';
import { useToast } from '@/hooks/support/useToast';
import { usePostStore } from '@/store/core/usePostStore';
import { getNanoid } from '@/utils/support/tools';
import { addTag, getTagList } from '@/api/core/tag';
import { createPost } from '@/api/core/post';
import { usePagination } from '@/hooks/support/usePagination';
import { TopicType } from '@/types/core/topic';

const Editor = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm<createPostType>({
    defaultValues: {
      visibility: 4,
      link: [],
      tagIds: [],
    },
  });

  const [categoryId, content, tagIds, visibility, link] = watch([
    'categoryId',
    'content',
    'tagIds',
    'visibility',
    'link',
  ]);

  const [searchKey, setSearchKey] = useState('');

  const { toast } = useToast();
  const { File, onOpen: onOpenSelectFile } = useSelectFile({
    fileType: '.jpg,.png',
    multiple: false,
  });

  const { addDraft } = usePostStore();

  const onSelectFile = useCallback(
    async (e: File[]) => {
      const file = e[0];
      console.log('file', file);
      if (!file) return;
      try {
        const formData = new FormData();
        formData.append('file', file);
        const { fileUrl: src } = await uploadFile(formData);
        console.log('content', content);
        //在文章中添加图片，在link里添加图片链接
        setValue('content', content ? content + `![image](${src})` : `![image](${src})`);
      } catch (err: any) {
        toast({
          title: typeof err === 'string' ? err : '上传失败',
          status: 'warning',
        });
      }
    },
    [toast, content, setValue]
  );

  const { data: topicList } = usePagination<TopicType>({
    api: getTopicList,
    pageSize: 10,
    defaultRequest: true,
  });

  const visibilityOptions = [
    { value: 1, label: '私密' },
    { value: 2, label: '关注可见' },
    { value: 3, label: '好友可见' },
    { value: 4, label: '公开' },
  ];

  const { isOpen: isOpenDraft, onOpen: onOpenDraft, onClose: onCloseDraft } = useDisclosure();

  const {
    data: tagList,
    mutate: setTagList,
    refresh,
    loading: tagListLoading,
  } = useRequest2(
    () => {
      if (searchKey === '') {
        return Promise.resolve([]);
      }
      return getTagList({
        q: searchKey,
      });
    },
    {
      manual: false,
      debounceWait: 100,
      refreshDeps: [searchKey],
    }
  );

  const { runAsync: addTagAsync } = useRequest2(({ name }: { name: string }) => addTag({ name }), {
    successToast: '添加成功',
  });

  const RenderTagHeader = () => {
    const [addTag, setAddTag] = useState('');

    return (
      <Flex p={4} w={'100%'} justify={'space-between'}>
        <Flex align={'center'}>
          <Box whiteSpace={'nowrap'}>{'搜索：'}</Box>
          <Input
            placeholder="搜索"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
        </Flex>

        <Flex gap={4}>
          <Input value={addTag} onChange={(e) => setAddTag(e.target.value)} />
          <Button
            onClick={() => {
              try {
                addTagAsync({ name: addTag });
                refresh();
              } catch (err) {}
            }}
          >
            {'添加'}
          </Button>
        </Flex>
      </Flex>
    );
  };

  const { run: onClickCreate, loading } = useRequest2(
    (data: createPostType) => {
      console.log('data', data);

      return createPost(data);
    },
    {
      successToast: '发帖成功',
    }
  );

  return (
    <Box h={'100%'} overflow={'auto'} borderRadius={'lg'} bg={'myGray.50'}>
      <Header />

      <Flex
        py={8}
        w={'100%'}
        h={'calc(100% - 60px)'}
        flexDir={'column'}
        gap={8}
        px={16}
        mt={'60px'}
      >
        <Flex align={'center'} justify={'space-between'}>
          <Box fontSize={'2xl'} fontWeight={'400'} color={'myGray.900'}>
            {'我要发帖子'}
          </Box>
          <Box color={'myGray.500'} cursor={'pointer'} onClick={onOpenDraft}>
            {'草稿箱'}
          </Box>
        </Flex>
        <Flex>
          <FormControl isInvalid={!!errors.categoryId}>
            <FormLabel label={'板块'} />
            <MySelect
              {...register('categoryId', { required: true })}
              value={categoryId}
              list={topicList?.map((item) => ({ label: item.name, value: item.id })) || []}
              onchange={(val) => {
                setValue('categoryId', val);
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
        <Box {...register('link')}></Box>
        <Box>
          <Button onClick={onOpenSelectFile}>上传图片</Button>
        </Box>

        <FormControl>
          <FormLabel label={'标签'} />
          <MultipleSelect<number>
            list={tagList?.map((item, index) => ({ label: item.name, value: item.id })) || []}
            value={tagIds as any}
            onSelect={(val) => setValue('tagIds', val)}
            header={RenderTagHeader()}
            loading={tagListLoading}
          />
        </FormControl>

        <Box>
          <FormLabel label={'权限控制'} />
          <Flex gap={4}>
            {visibilityOptions.map((option) => (
              <Checkbox
                isChecked={visibility === option.value}
                key={option.value}
                value={option.value}
                onChange={() => setValue('visibility', option.value)}
              >
                {option.label}
              </Checkbox>
            ))}
          </Flex>
        </Box>
        <Flex w={'100%'} justify={'center'} gap={8} pb={8}>
          <Button
            variant={'outline'}
            bg={'myGray.100'}
            onClick={() => {
              handleSubmit((data) => addDraft({ ...data, id: getNanoid(), time: new Date() }))();
              toast({
                title: '存为草稿成功',
                status: 'success',
              });
            }}
          >
            {'存为草稿'}
          </Button>
          <Button isLoading={loading} onClick={() => handleSubmit(onClickCreate)()}>
            {'发帖'}
          </Button>
        </Flex>
      </Flex>
      <File onSelect={onSelectFile} />
      {isOpenDraft && <DraftBoxModal onClose={onCloseDraft} reset={reset} />}
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
