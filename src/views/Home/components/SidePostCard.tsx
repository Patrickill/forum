import MyTooltip from '@/components/common/MyToolTip';
import { Box, Flex, Icon, Tooltip } from '@chakra-ui/react';
import { MdOutlineRemoveRedEye } from 'react-icons/md';

const SidePostCard = ({ view, title }: { title: string; view: number }) => {
  return (
    <Box p={2} pos={'relative'}>
      <MyTooltip title={title}>
        <Box color={'myGray.900'} className="textEllipsis2">
          {title}
        </Box>
      </MyTooltip>
      <Flex color={'myGray.400'} alignItems={'center'} gap={1} py={2}>
        <Icon as={MdOutlineRemoveRedEye} />
        <Box>{view}</Box>
      </Flex>
    </Box>
  );
};

export default SidePostCard;
