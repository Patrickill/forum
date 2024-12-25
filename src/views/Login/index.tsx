import { Box, Flex } from '@chakra-ui/react';
import LoginForm from './components/LoginForm';
import { useCallback, useState } from 'react';
import RegisterForm from './components/RegisterForm';
import { ResLogin } from '@/api/support/login';
import useRoute from '@/hooks/support/useRouter';
import { useRequest2 } from '@/hooks/core/useRequest';
import { getUserInfo } from '@/api/support/user';
import { useUserStore } from '@/store/support/useUserStore';

export enum LoginPageTypeEnum {
  passwordLogin = 'passwordLogin',
  register = 'register',
}

const Login = () => {
  const [pageType, setPageType] = useState<`${LoginPageTypeEnum}`>();
  const { push } = useRoute();
  const { setUserInfo } = useUserStore();

  const { runAsync: initUserInfo } = useRequest2(getUserInfo, {
    onSuccess: (res) => {
      console.log('res', res);
      setUserInfo(res);
    },
    onFinally: () => {
      console.log('finally');
    },
  });

  function DynamicComponent({ type }: { type: `${LoginPageTypeEnum}` }) {
    const TypeMap = {
      [LoginPageTypeEnum.passwordLogin]: LoginForm,
      [LoginPageTypeEnum.register]: RegisterForm,
    };

    const loginSuccess = useCallback(async (res: ResLogin) => {
      //本地存储token和用户信息
      await initUserInfo();
      setTimeout(() => {
        push('/home');
      }, 300);
    }, []);

    const Component = TypeMap[type];

    return <Component setPageType={setPageType} loginSuccess={loginSuccess} />;
  }
  return (
    <>
      <Flex
        alignItems={'center'}
        justifyContent={'center'}
        // bg={`url(${getWebReqUrl('/icon/login-bg.svg')}) no-repeat`}
        bg={'blue.50'}
        backgroundSize={'cover'}
        userSelect={'none'}
        h={'100%'}
      >
        <Flex
          flexDirection={'column'}
          w={['100%', '556px']}
          h={['100%', '677px']}
          bg={'white'}
          px={['5vw', '88px']}
          py={['5vh', '64px']}
          borderRadius={[0, '16px']}
          boxShadow={[
            '',
            '0px 32px 64px -12px rgba(19, 51, 107, 0.20), 0px 0px 1px 0px rgba(19, 51, 107, 0.20)',
          ]}
        >
          <Box w={['100%', '380px']} flex={'1 0 0'}>
            <DynamicComponent type={pageType || LoginPageTypeEnum.passwordLogin} />
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Login;
