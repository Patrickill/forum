import { Box, Flex } from '@chakra-ui/react';
import LoginForm from './components/LoginForm';
import { useState } from 'react';
import RegisterForm from './components/RegisterForm';

export enum LoginPageTypeEnum {
  passwordLogin = 'passwordLogin',
  register = 'register',
}

const Login = () => {
  const [pageType, setPageType] = useState<`${LoginPageTypeEnum}`>();

  function DynamicComponent({ type }: { type: `${LoginPageTypeEnum}` }) {
    const TypeMap = {
      [LoginPageTypeEnum.passwordLogin]: LoginForm,
      [LoginPageTypeEnum.register]: RegisterForm,
    };

    const Component = TypeMap[type];

    return <Component setPageType={setPageType} />;
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
