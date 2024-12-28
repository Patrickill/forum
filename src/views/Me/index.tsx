import { uploadFile } from '@/api/support/file';
import PageContainer from '@/components/common/Layout/PageContainer';
import MyTooltip from '@/components/common/MyToolTip';
import { useSelectFile } from '@/hooks/common/useSelectFile';
import { useToast } from '@/hooks/support/useToast';
import { useUserStore } from '@/store/support/useUserStore';
import { UserType } from '@/types/support/user';
import { Avatar, Box, BoxProps, Button, Flex, Input, useDisclosure } from '@chakra-ui/react';
import { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import UpdatePswModal from './components/UpdatePswModal';
import LightRowTabs from '@/components/common/Tabs/LightRowTabs';
import { useRequest2 } from '@/hooks/core/useRequest';
import { updateUserInfo } from '@/api/support/user';
import { usePagination } from '@/hooks/support/usePagination';
import { delPost, getCollectPostList, getMyPostList, getStaredPostList } from '@/api/core/post';
import EmptyTip from '@/components/common/EmptyTip';
import PostCard from '@/components/core/post/PostCard';
import Loading from '@/components/common/MyLoading';
import useRoute from '@/hooks/support/useRouter';

enum TabEnum {
  like = 'like',
  star = 'star',
  my = 'my',
}

export interface UserUpdateParams {
  avatar?: string;
  name?: string;
}

const Me = () => {
  const { userInfo, setUserInfo } = useUserStore();

  const { toast } = useToast();

  const { getQueryParam } = useRoute();

  const userId = getQueryParam('id');

  const [currentTab, setCurrentTab] = useState(TabEnum.my);

  const {
    isOpen: isOpenUpdatePsw,
    onClose: onCloseUpdatePsw,
    onOpen: onOpenUpdatePsw,
  } = useDisclosure();

  const labelStyles: BoxProps = {
    fontSize: 'sm',
    color: 'myGray.900',
  };

  const { reset, watch } = useForm<UserUpdateParams>({
    defaultValues: userInfo as UserType,
  });

  const avatar = watch('avatar');

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
        const { fileUrl: src } = await uploadFile(formData);

        onclickSave({
          ...userInfo,
          avatar: src,
        });

        setUserInfo({
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
  const ScrollContainerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, setData, ScrollData } = usePagination({
    api:
      currentTab === TabEnum.my
        ? getMyPostList
        : currentTab === TabEnum.like
          ? getStaredPostList
          : getCollectPostList,
    pageSize: 10,
    defaultRequest: true,
    params: { authorId: userId || userInfo?.id },
    refreshDeps: [currentTab],
  });

  return (
    <PageContainer>
      {/* <Box className="textEllipsis" w={'200px'}> */}
      <Box p={10}>
        <Flex h={'200px'} w={'100%'} bg={'myGray.100'} align={'center'} borderRadius={'xl'}>
          <Flex align={'center'}>
            <Flex alignItems={'center'} cursor={userId ? 'default' : 'pointer'} p={10}>
              <MyTooltip label={userId ? '' : '点击修改头像'}>
                <Box
                  w={'100px'}
                  h={'100px'}
                  borderRadius={'50%'}
                  overflow={'hidden'}
                  p={'2px'}
                  mb={10}
                  onClick={() => {
                    if (!userId) onOpenSelectFile();
                  }}
                >
                  <Avatar src={avatar} borderRadius={'50%'} w={'100%'} h={'100%'} />
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
                    if (!userInfo) return;
                    const val = e.target.value;
                    if (val === userInfo?.nickname) return;
                    try {
                      putUpdateMemberName(val);
                      setUserInfo({ ...userInfo, nickname: val });
                    } catch (error) {}
                  }}
                  isReadOnly={!!userId}
                />
              </Box>
              {!userId && (
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
              )}
            </Flex>
          </Flex>
        </Flex>

        <Box mt={5}>
          <LightRowTabs<TabEnum>
            list={[
              {
                label: (userId ? '他' : '我') + '发布的',
                value: TabEnum.my,
              },
              ...(!userId
                ? [
                    {
                      label: '收藏',
                      value: TabEnum.star,
                    },
                    {
                      label: '点赞',
                      value: TabEnum.like,
                    },
                  ]
                : []),
            ]}
            onChange={setCurrentTab}
            value={currentTab}
            px={4}
            width={'200px'}
          />
          <ScrollData ScrollContainerRef={ScrollContainerRef} mt={5}>
            {isLoading && <Loading />}
            {!isLoading && data.length === 0 && <EmptyTip text={'暂无记录~'} />}
            {data.map((item) => item.id && <PostCard key={item.id} {...item} setData={setData} />)}
          </ScrollData>
        </Box>

        {isOpenUpdatePsw && <UpdatePswModal onClose={onCloseUpdatePsw} />}
        <File onSelect={onSelectFile} />
      </Box>
    </PageContainer>
  );
};

export default Me;
