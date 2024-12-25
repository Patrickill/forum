import MyModal from '@/components/common/MyModal';
import { usePostStore } from '@/store/core/usePostStore';
import { createPostType } from '@/types/core/post';
import { formatTimeToChatTime } from '@/utils/time';
import {
  Box,
  Button,
  Flex,
  ModalBody,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { UseFormReset } from 'react-hook-form';

const DraftBoxModal = ({
  onClose,
  reset,
}: {
  onClose: () => void;
  reset: UseFormReset<createPostType>;
}) => {
  const { draftList, removeDraft } = usePostStore();

  return (
    <MyModal title={'草稿箱'} isOpen={true} onClose={onClose}>
      <ModalBody>
        <Box>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>标题</Th>
                  <Th>最后保存时间</Th>
                  <Th>操作</Th>
                </Tr>
              </Thead>
              <Tbody>
                {draftList.map((item) => (
                  <Tr key={item.id}>
                    <Th>{item.title}</Th>
                    <Th>{formatTimeToChatTime(item.time)}</Th>
                    <Th>
                      <Flex gap={2}>
                        <Button
                          variant={'outline'}
                          size={'sm'}
                          onClick={() => {
                            const { id, time, ...resetData } = item;
                            reset(resetData);
                            onClose();
                          }}
                        >
                          应用
                        </Button>
                        <Button
                          variant={'outline'}
                          size={'sm'}
                          onClick={() => removeDraft(item.id)}
                        >
                          删除
                        </Button>
                      </Flex>
                    </Th>
                  </Tr>
                ))}
                {draftList.length === 0 && (
                  <Tr>
                    <Th colSpan={3}>暂无数据</Th>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </ModalBody>
    </MyModal>
  );
};

export default DraftBoxModal;
