import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
} from '@chakra-ui/react';

const Message = ({
  onClose,
  isOpen,
  title,
}: {
  onClose: () => void;
  isOpen: boolean;
  title: string | React.ReactNode;
}) => {
  return (
    <Drawer placement={'left'} onClose={onClose} isOpen={isOpen} size={'md'}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">{title}</DrawerHeader>
        <DrawerBody>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <Box h={'200px'} bg={'myGray.100'}></Box>
          <Box h={'200px'} bg={'myGray.100'}></Box>
          <Box h={'200px'} bg={'myGray.100'}></Box>
          <Box h={'200px'} bg={'myGray.100'}></Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default Message;
