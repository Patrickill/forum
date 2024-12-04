import { Box, useDisclosure } from '@chakra-ui/react';
import Navbar from './NavBar';
import Auth from './Auth';
import MyRightDrawer from '../MyDrawer/MyRightDrawer';

const PageContainer = ({ children }: { children: JSX.Element }) => {
  return (
    <Box h={'100%'} w={'100%'} bg={'myGray.100'}>
      <Box h={'100%'} position={'fixed'} left={0} top={0} w={'64px'}>
        <Navbar />
      </Box>
      <Box h={'100%'} w={'100%'} ml={'70px'} overflow={'overlay'}>
        <Box
          h={'100%'}
          w={'100%'}
          borderColor={'borderColor.base'}
          borderWidth={[0, 1]}
          boxShadow={'1.5'}
          overflow={'overlay'}
          bg={'myGray.25'}
          borderRadius={[0, '16px']}
          overflowX={'hidden'}
        >
          <Auth>{children}</Auth>
        </Box>
      </Box>
    </Box>
  );
};

export default PageContainer;
