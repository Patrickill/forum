import { Box, Divider, type DividerProps } from '@chakra-ui/react';

const MyDivider = (props: DividerProps) => {
  const { h } = props;
  return (
    <Box w={'90%'}>
      <Divider
        my={4}
        borderBottomWidth={h || '2px'}
        borderColor={props.color || 'myGray.200'}
        {...props}
      ></Divider>
    </Box>
  );
};

export default MyDivider;
