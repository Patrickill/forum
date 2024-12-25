import useRoute from '@/hooks/support/useRouter';
import { Avatar, Box, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const Header = ({ isVisible = true }: { isVisible?: boolean }) => {
  const { push } = useRoute();

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

      <Box
        flex={'0 0 auto'}
        borderRadius={'50%'}
        overflow={'hidden'}
        cursor={'pointer'}
        onClick={() => push('/me')}
        pr={8}
      >
        <Avatar w={'36px'} h={'36px'} src={'/logo.svg'} borderRadius={'50%'} />
      </Box>
    </Flex>
  );
};

export default Header;
