import MyIcon from '@/components/common/MyIcon';
import MyTooltip from '@/components/common/MyToolTip';
import { Flex, Textarea } from '@chakra-ui/react';
import { useState } from 'react';

const MyTextArea = ({
  TextareaDom,
}: {
  TextareaDom: React.MutableRefObject<HTMLTextAreaElement | null>;
}) => {
  const handleSend = () => {};
  const [inputValue, setValue] = useState<string>();
  const textareaMinH = '22px';
  return (
    <Flex alignItems={'flex-end'} pl={[2, 4]} p={2} gap={2}>
      {/* input area */}
      <Textarea
        bg={'myGray.50'}
        p={4}
        ref={TextareaDom}
        py={0}
        pl={2}
        border={'none'}
        _focusVisible={{
          border: 'none',
          bg: 'myGray.50',
        }}
        placeholder={'平等表达，友善交流'}
        resize={'none'}
        rows={1}
        maxHeight={'50vh'}
        maxLength={-1}
        overflowY={'auto'}
        whiteSpace={'pre-wrap'}
        wordBreak={'break-all'}
        boxShadow={'none !important'}
        color={'myGray.900'}
        value={inputValue}
        fontSize={'sm'}
        onChange={(e) => {
          const textarea = e.target;
          textarea.style.height = textareaMinH;
          textarea.style.height = `${textarea.scrollHeight}px`;
          setValue(textarea.value);
        }}
        onKeyDown={(e) => {
          // enter send.(pc or iframe && enter and unPress shift)
          const isEnter = e.keyCode === 13;
          if (isEnter && TextareaDom.current && (e.ctrlKey || e.altKey)) {
            // Add a new line
            const index = TextareaDom.current.selectionStart;
            const val = TextareaDom.current.value;
            TextareaDom.current.value = `${val.slice(0, index)}\n${val.slice(index)}`;
            TextareaDom.current.selectionStart = index + 1;
            TextareaDom.current.selectionEnd = index + 1;

            TextareaDom.current.style.height = textareaMinH;
            TextareaDom.current.style.height = `${TextareaDom.current.scrollHeight}px`;

            return;
          }

          // 全选内容
          // @ts-ignore
          e.key === 'a' && e.ctrlKey && e.target?.select();

          if (window !== parent && e.keyCode === 13 && !e.shiftKey) {
            handleSend();
            e.preventDefault();
          }
        }}
      />
      <Flex alignItems={'center'}>
        {/* send and stop icon */}
        {
          <Flex
            alignItems={'center'}
            justifyContent={'center'}
            flexShrink={0}
            h={['28px', '32px']}
            w={['28px', '32px']}
            borderRadius={'md'}
            bg={'primary.500'}
            cursor={!!inputValue ? 'pointer' : 'not-allowed'}
            lineHeight={1}
            onClick={handleSend}
          >
            {
              <MyTooltip label={'发送'}>
                <MyIcon name={'send'} width={'18px'} height={'18px'} color={'white'} />
              </MyTooltip>
            }
          </Flex>
        }
      </Flex>
    </Flex>
  );
};

export default MyTextArea;
