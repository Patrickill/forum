import PageContainer from '@/components/common/Layout/PageContainer';
import { Box } from '@chakra-ui/react';

const Me = () => {
  return (
    <PageContainer>
      <Box className="textEllipsis" w={'200px'}>
        这是一段很长的文本，如果超出这个容器的宽度，将会显示省略号。
      </Box>
    </PageContainer>
  );
};

export default Me;
