import React from 'react';
import { Flex, Box, FlexProps, Icon } from '@chakra-ui/react';
import { PiEmpty } from 'react-icons/pi';
type Props = FlexProps & {
  text?: string | React.ReactNode;
  iconSize?: string | number;
};

const EmptyTip = ({ text, iconSize = '48px', ...props }: Props) => {
  return (
    <Flex mt={5} flexDirection={'column'} alignItems={'center'} py={'10vh'} {...props}>
      <Icon as={PiEmpty} w={iconSize} h={iconSize} color={'transparent'} />
      <Box mt={2} color={'myGray.500'} fontSize={'sm'}>
        {text || '暂无数据~'}
      </Box>
    </Flex>
  );
};

export default EmptyTip;
