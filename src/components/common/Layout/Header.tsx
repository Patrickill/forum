import SearchInput from '@/components/core/post/SearchInput';
import useRoute from '@/hooks/support/useRouter';
import { useUserStore } from '@/store/support/useUserStore';
import { Avatar, Box, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const Header = ({ isVisible = true }: { isVisible?: boolean }) => {
  const { push } = useRoute();

  const { userInfo } = useUserStore();

  return (
    <Flex
      bg={'white'}
      pos={'fixed'}
      top={0}
      left={0}
      right={0}
      transition={'transform 0.3s ease'}
      h={'60px'}
      alignItems={'center'}
      zIndex={100}
      transform={isVisible ? 'translateY(0)' : 'translateY(-60px)'}
      justify={'space-between'}
      boxShadow={'md'}
    >
      <Flex pl={8} cursor={'pointer'} onClick={() => push('/home')} gap={10}>
        <Box
          flex={'0 0 auto'}
          borderRadius={'50%'}
          overflow={'hidden'}
          cursor={'pointer'}
          onClick={() => push('/home')}
        >
          <Avatar w={'36px'} h={'36px'} src={'/logo.svg'} borderRadius={'50%'} />
        </Box>
        <Box
          fontSize={'xl'}
          color={'myGray.900'}
          fontWeight={'bold'}
          cursor={'pointer'}
          onClick={() => push('/')}
        >
          {'精弘论坛'}
        </Box>
      </Flex>

      <Flex pr={8} gap={10}>
        <SearchInput />
        <Box>
          <Avatar
            cursor={'pointer'}
            borderRadius={'50%'}
            w={'36px'}
            h={'36px'}
            src={userInfo?.avatar}
            onClick={() => push('/me')}
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Header;
