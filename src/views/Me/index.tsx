import { uploadFile } from '@/api/support/file';
import PageContainer from '@/components/common/Layout/PageContainer';
import MyTooltip from '@/components/common/MyToolTip';
import { useSelectFile } from '@/hooks/common/useSelectFile';
import { useToast } from '@/hooks/support/useToast';
import { useUserStore } from '@/store/support/useUserStore';
import { UserType } from '@/types/support/user';
import { Avatar, Box, BoxProps, Button, Flex, Input, useDisclosure } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import UpdatePswModal from './components/UpdatePswModal';
import LightRowTabs from '@/components/common/Tabs/LightRowTabs';
import { useRequest2 } from '@/hooks/core/useRequest';
import { updateUserInfo } from '@/api/support/user';
import { usePagination } from '@/hooks/support/usePagination';
import { getCollectPostList, getStaredPostList } from '@/api/core/post';
import EmptyTip from '@/components/common/EmptyTip';
import PostCard from '@/components/core/post/PostCard';

enum TabEnum {
  like = 'like',
  star = 'star',
}

export interface UserUpdateParams {
  avatar?: string;
  name?: string;
}

const Me = () => {
  const { userInfo } = useUserStore();
  const { toast } = useToast();
  console.log('userInfo', userInfo);

  const [currentTab, setCurrentTab] = useState(TabEnum.like);

  const {
    isOpen: isOpenUpdatePsw,
    onClose: onCloseUpdatePsw,
    onOpen: onOpenUpdatePsw,
  } = useDisclosure();

  const labelStyles: BoxProps = {
    fontSize: 'sm',
    color: 'myGray.900',
  };

  const { reset } = useForm<UserUpdateParams>({
    defaultValues: userInfo as UserType,
  });

  const { File, onOpen: onOpenSelectFile } = useSelectFile({
    fileType: '.jpg,.png',
    multiple: false,
  });

  const onclickSave = useCallback(
    async (data: UserType) => {
      await updateUserInfo({
        ...data,
        avatar: data.avatar,
      });
      reset(data);
      toast({
        title: '保存成功',
        status: 'success',
      });
    },
    [reset, toast, updateUserInfo]
  );

  const onSelectFile = useCallback(
    async (e: File[]) => {
      const file = e[0];
      console.log('file', file);
      if (!file || !userInfo) return;
      try {
        const formData = new FormData();
        formData.append('file', file);
        const src = await uploadFile(formData);

        onclickSave({
          ...userInfo,
          avatar: src,
        });
      } catch (err: any) {
        toast({
          title: typeof err === 'string' ? err : '上传失败',
          status: 'warning',
        });
      }
    },
    [onclickSave, toast, userInfo]
  );

  const { run: putUpdateMemberName } = useRequest2((name: string) => {
    if (!userInfo) return Promise.reject();
    return updateUserInfo({ ...userInfo, nickname: name });
  }, {});

  const { data, isLoading } = usePagination({
    api: currentTab === TabEnum.like ? getStaredPostList : getCollectPostList,
    pageSize: 10,
    defaultRequest: true,
    refreshDeps: [currentTab],
  });

  return (
    <PageContainer>
      {/* <Box className="textEllipsis" w={'200px'}> */}
      <Box p={10}>
        <Flex h={'200px'} w={'100%'} bg={'myGray.100'} align={'center'} borderRadius={'xl'}>
          <Flex align={'center'}>
            <Flex alignItems={'center'} cursor={'pointer'} p={10}>
              <MyTooltip label={'点击修改头像'}>
                <Box
                  w={'100px'}
                  h={'100px'}
                  borderRadius={'50%'}
                  overflow={'hidden'}
                  p={'2px'}
                  mb={10}
                  onClick={onOpenSelectFile}
                >
                  <Avatar src={'userInfo?.avatar'} borderRadius={'50%'} w={'100%'} h={'100%'} />
                </Box>
              </MyTooltip>
            </Flex>

            <Flex flexDir={'column'} gap={2} mb={10}>
              <Box mt={[0, 4]} alignItems={'center'}>
                <Input
                  flex={'1 0 0'}
                  fontSize={'2xl'}
                  defaultValue={userInfo?.nickname}
                  title={'点击修改昵称'}
                  borderColor={'transparent'}
                  transform={'translateX(-11px)'}
                  maxLength={20}
                  onBlur={(e) => {
                    const val = e.target.value;
                    if (val === userInfo?.nickname) return;
                    try {
                      putUpdateMemberName(val);
                    } catch (error) {}
                  }}
                />
              </Box>
              <Box>
                <Flex alignItems={'center'}>
                  <Box {...labelStyles}>{'账号'}:&nbsp;</Box>
                  <Box>{userInfo?.username || ''}</Box>
                </Flex>
                <Flex alignItems={'center'} gap={2}>
                  <Box {...labelStyles}>{'密码'}:&nbsp;</Box>
                  <Box>*****</Box>
                  <Button size={'sm'} variant={'whitePrimary'} onClick={onOpenUpdatePsw}>
                    {'修改'}
                  </Button>
                </Flex>
              </Box>
            </Flex>
          </Flex>
        </Flex>

        <Box mt={5}>
          <LightRowTabs<TabEnum>
            list={[
              {
                label: '点赞',
                value: TabEnum.like,
              },
              {
                label: '收藏',
                value: TabEnum.star,
              },
            ]}
            onChange={setCurrentTab}
            value={currentTab}
            px={4}
            width={'200px'}
          />
          <Box mt={5}>
            {!isLoading && data.length === 0 && (
              <EmptyTip text={currentTab === TabEnum.like ? '暂无点赞记录~' : '暂无收藏记录~'} />
            )}
            {data.map((item) => (
              <PostCard key={item.id} {...item} />
            ))}
          </Box>
        </Box>

        {isOpenUpdatePsw && <UpdatePswModal onClose={onCloseUpdatePsw} />}
        <File onSelect={onSelectFile} />
      </Box>
    </PageContainer>
  );
};

export default Me;
