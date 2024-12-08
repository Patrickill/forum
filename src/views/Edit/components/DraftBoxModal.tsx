import MyModal from '@/components/common/MyModal';
import { Box, ModalBody, Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';

const DraftBoxModal = ({ onClose }: { onClose: () => void }) => {
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
              <Tbody></Tbody>
            </Table>
          </TableContainer>
        </Box>
      </ModalBody>
    </MyModal>
  );
};

export default DraftBoxModal;
