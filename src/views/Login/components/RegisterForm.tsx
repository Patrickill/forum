import { Box, Button, Flex, FormControl, Image, Input } from '@chakra-ui/react';
import { SYSTEM_TITLE } from '@/constants/system';
import { useForm } from 'react-hook-form';
import { useCallback, useState } from 'react';
import { useToast } from '@/hooks/useToast';
import { useNavigate } from 'react-router-dom';
import { LoginPageTypeEnum } from '..';

type RegisterFormType = {
  username: string;
  password: string;
  password2: string;
};

const LoginForm = ({ setPageType }: { setPageType: (type: `${LoginPageTypeEnum}`) => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>();

  const { toast } = useToast();
  const [requesting, setRequesting] = useState(false);
  const navigate = useNavigate();

  const onclickLogin = useCallback(
    async ({ username, password }: RegisterFormType) => {
      setRequesting(true);
      console.log(username, password);
      try {
        // loginSuccess(
        //   await postLogin({
        //     username,
        //     password,
        //   })
        // );
        toast({
          title: '登陆成功',
          status: 'success',
        });
        navigate('/');
      } catch (error: any) {
        toast({
          title: error.message || '登陆失败',
          status: 'error',
        });
      }
      setRequesting(false);
    },
    [toast]
  );

  return (
    <Flex flexDirection={'column'} h={'100%'}>
      <Flex alignItems={'center'} justify={'space-between'}>
        <Flex alignItems={'center'}>
          <Flex
            w={['42px', '56px']}
            h={['42px', '56px']}
            bg={'myGray.25'}
            borderRadius={['semilg', 'lg']}
            borderWidth={['1px', '1.5px']}
            borderColor={'myGray.200'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Image src={'/logo.svg'} w={['22.5px', '36px']} alt={'icon'} />
          </Flex>
          <Box ml={[3, 5]} fontSize={['lg', 'xl']} fontWeight={'bold'} color={'myGray.900'}>
            {SYSTEM_TITLE}
          </Box>
        </Flex>
      </Flex>
      <Box
        mt={9}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey && !requesting) {
            handleSubmit(onclickLogin)();
          }
        }}
      >
        <FormControl isInvalid={!!errors.username}>
          <Input
            bg={'myGray.50'}
            size={'lg'}
            fontSize={'sm'}
            placeholder={'用户名'}
            {...register('username', {
              required: true,
            })}
          ></Input>
        </FormControl>
        <FormControl mt={7} isInvalid={!!errors.password}>
          <Input
            bg={'myGray.50'}
            size={'lg'}
            fontSize={'sm'}
            type={'password'}
            placeholder={'请输入密码'}
            {...register('password', {
              required: true,
              maxLength: {
                value: 60,
                message: '密码不能超过60个字符',
              },
            })}
          ></Input>
        </FormControl>
        <FormControl mt={7} isInvalid={!!errors.password2}>
          <Input
            bg={'myGray.50'}
            size={'lg'}
            fontSize={'sm'}
            type={'password'}
            placeholder={'请再次输入密码'}
            {...register('password', {
              required: true,
              maxLength: {
                value: 60,
                message: '密码不能超过60个字符',
              },
            })}
          ></Input>
        </FormControl>
        <Button
          type="submit"
          my={5}
          w={'100%'}
          size={['md', 'md']}
          h={[10, 10]}
          colorScheme="blue"
          isLoading={requesting}
          onClick={handleSubmit(onclickLogin)}
        >
          {'注册'}
        </Button>
        <Box
          float={'right'}
          fontSize="mini"
          mt={3}
          mb={'50px'}
          fontWeight={'medium'}
          color={'primary.700'}
          cursor={'pointer'}
          _hover={{ textDecoration: 'underline' }}
          onClick={() => setPageType(LoginPageTypeEnum.passwordLogin)}
        >
          {'去登陆'}
        </Box>
      </Box>
    </Flex>
  );
};

export default LoginForm;
