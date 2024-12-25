import React from 'react';
import { ModalBody, Box, Flex, Input, ModalFooter, Button } from '@chakra-ui/react';
import MyModal from '@/components/common/MyModal';
import { useForm } from 'react-hook-form';
import { useRequest } from '@/hooks/core/useRequest';

type FormType = {
  oldPsw: string;
  newPsw: string;
  confirmPsw: string;
};

const UpdatePswModal = ({ onClose }: { onClose: () => void }) => {
  const { register, handleSubmit } = useForm<FormType>({
    defaultValues: {
      oldPsw: '',
      newPsw: '',
      confirmPsw: '',
    },
  });

  // const { mutate: onSubmit, isLoading } = useRequest({
  //   mutationFn: (data: FormType) => {
  //     if (data.newPsw !== data.confirmPsw) {
  //       return Promise.reject('两次密码不一致');
  //     }
  //     return updatePasswordByOld(data);
  //   },
  //   onSuccess() {
  //     onClose();
  //   },
  //   successToast: '密码修改成功',
  //   errorToast: '密码修改失败',
  // });

  return (
    <MyModal isOpen onClose={onClose} iconSrc="/imgs/modal/password.svg" title={'修改密码'}>
      <ModalBody>
        <Flex alignItems={'center'}>
          <Box flex={'0 0 70px'}>{'旧密码' + ':'}</Box>
          <Input flex={1} type={'password'} {...register('oldPsw', { required: true })}></Input>
        </Flex>
        <Flex alignItems={'center'} mt={5}>
          <Box flex={'0 0 70px'}>{'新密码' + ':'}</Box>
          <Input
            flex={1}
            type={'password'}
            {...register('newPsw', {
              required: true,
              maxLength: {
                value: 60,
                message: '密码长度不能超过60个字符',
              },
            })}
          ></Input>
        </Flex>
        <Flex alignItems={'center'} mt={5}>
          <Box flex={'0 0 70px'}>{'确认密码' + ':'}</Box>
          <Input
            flex={1}
            type={'password'}
            {...register('confirmPsw', {
              required: true,
              maxLength: {
                value: 60,
                message: '密码长度不能超过60个字符',
              },
            })}
          ></Input>
        </Flex>
      </ModalBody>
      <ModalFooter>
        <Button mr={3} variant={'whiteBase'} onClick={onClose}>
          {'取消'}
        </Button>
        {/* <Button isLoading={isLoading} onClick={handleSubmit((data) => onSubmit(data))}> */}
        <Button>{'保存'}</Button>
      </ModalFooter>
    </MyModal>
  );
};

export default UpdatePswModal;
