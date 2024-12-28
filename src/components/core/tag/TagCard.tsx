import useRoute from '@/hooks/support/useRouter';
import { Box } from '@chakra-ui/react';

const TagCard = ({
  tag,
  selected = false,
  tagId,
}: {
  tag: string;
  selected?: boolean;
  tagId: number;
}) => {
  const { openNewTab } = useRoute();

  return (
    <Box
      borderRadius={'lg'}
      bg={selected ? 'adora.200' : 'adora.50'}
      px={2}
      py={1}
      cursor={'pointer'}
      onClick={() =>
        openNewTab({
          path: '/tag',
          params: {
            tagId: tagId.toString(),
          },
        })
      }
    >
      <Box
        maxW={'100px'}
        className="textEllipsis"
        color={selected ? 'adora.600' : 'adora.500'}
        fontSize={'sm'}
      >
        {tag}
      </Box>
    </Box>
  );
};

export default TagCard;
