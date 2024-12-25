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
import { useForm } from 'react-hook-form';
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
    },
  });

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
        const src = await uploadFile(formData);

        //在文章中添加图片，在link里添加图片链接
      } catch (err: any) {
        toast({
          title: typeof err === 'string' ? err : '上传失败',
          status: 'warning',
        });
      }
    },
    [toast]
  );

  const { data: topicList } = useRequest2(getTopicList, {
    manual: false,
  });
  const visibilityOptions = [
    { value: 1, label: '私密' },
    { value: 2, label: '关注可见' },
    { value: 3, label: '好友可见' },
    { value: 4, label: '公开' },
  ];

  const { isOpen: isOpenDraft, onOpen: onOpenDraft, onClose: onCloseDraft } = useDisclosure();

  const defaultCategory = [
    {
      id: 17161302659070,
      tag: '美食',
    },
    {
      id: 1805756781475170,
      tag: '美食食食',
    },
    {
      id: 187022152407040,
      tag: '美物物食',
    },
    {
      id: 187781568917500,
      tag: '美美美美美',
    },
  ];

  const [categoryId, content, tags, visibility] = watch([
    'categoryId',
    'content',
    'tags',
    'visibility',
  ]);

  const {
    data: tagList,
    mutate: setTagList,
    refresh,
  } = useRequest2(getTagList, {
    manual: false,
    defaultParams: [
      {
        q: searchKey,
      },
    ],
    refreshDeps: [searchKey],
  });

  const { runAsync: addTagAsync } = useRequest2(
    ({ name }: { name: string }) => addTag({ name }),
    {}
  );

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

  const onClickSave = useCallback(() => {
    console.log('save');
  }, []);

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

        <Box>
          <Button onClick={onOpenSelectFile}>上传图片</Button>
        </Box>

        <FormControl>
          <FormLabel label={'标签'} />
          <MultipleSelect<number>
            list={defaultCategory.map((item, index) => ({ label: item.tag, value: item.id }))}
            value={tags as any}
            onSelect={(val) => setValue('tags', val)}
            header={RenderTagHeader()}
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
          <Button onClick={() => handleSubmit((data) => console.log(data))()}>{'发帖'}</Button>
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
