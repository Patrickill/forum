import MyIcon from '@/components/common/MyIcon';
import Tag from '@/components/common/Tag';
import { Box, BoxProps, Flex } from '@chakra-ui/react';
import { useMemo } from 'react';

const SliderList = ({ ...props }: BoxProps) => {
  return (
    <Flex gap={10} flexDir={'column'} {...props}>
      <SliderButton />
      <SliderButton />
      <SliderButton />
    </Flex>
  );
};

const SliderButton = () => {
  return (
    <Flex
      borderRadius={'50%'}
      bg={'white'}
      shadow={'base'}
      pos={'relative'}
      align={'center'}
      justify={'center'}
      w={'48px'}
      h={'48px'}
      cursor={'pointer'}
    >
      <Flex align={'center'} justify={'center'}>
        <MyIcon w={'24px'} h={'24px'} name="like" />
      </Flex>
      <Tag color={'myGray.500'} pos={'absolute'} top={-1} right={-6}>
        {111}
      </Tag>
    </Flex>
  );
};

export default SliderList;
