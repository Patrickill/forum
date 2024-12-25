import {
  Box,
  Button,
  ButtonProps,
  Flex,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuItemProps,
  MenuList,
  useDisclosure,
  useOutsideClick,
} from '@chakra-ui/react';
import React, { useRef } from 'react';
import { FaCheck } from 'react-icons/fa';
import MyTag from '../Tag/index';
import TagCard from '@/components/core/tag/TagCard';
import MyBox from '../MyBox';

export type SelectProps<T = any> = {
  value: T[];
  placeholder?: string;
  list: {
    icon?: string;
    label: string | React.ReactNode;
    value: T;
  }[];
  maxH?: number;
  onSelect: (val: T[]) => void;
  header: React.ReactNode;
  loading: boolean;
} & Omit<ButtonProps, 'onSelect'>;

const MultipleSelect = <T = any,>({
  value = [],
  placeholder,
  list = [],
  width = '100%',
  maxH = 400,
  onSelect,
  header,
  loading,
  ...props
}: SelectProps<T>) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const menuItemStyles: MenuItemProps = {
    borderRadius: 'sm',
    display: 'flex',
    alignItems: 'center',
  };

  const onclickItem = (val: T) => {
    if (value.includes(val)) {
      onSelect(value.filter((i) => i !== val));
    } else {
      onSelect([...value, val]);
    }
  };

  return (
    <Box>
      <Menu
        autoSelect={false}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        strategy={'fixed'}
        matchWidth
        closeOnSelect={false}
      >
        <MenuButton
          as={Box}
          ref={ref}
          width={width}
          minH={'40px'}
          px={3}
          py={2}
          borderRadius={'md'}
          border={'base'}
          userSelect={'none'}
          cursor={'pointer'}
          _active={{
            transform: 'none',
          }}
          {...props}
          {...(isOpen
            ? {
                boxShadow: '0px 0px 4px #A8DBFF',
                borderColor: 'primary.500',
                bg: 'white',
              }
            : {})}
        >
          {value.length === 0 && placeholder ? (
            <Box color={'myGray.500'} fontSize={'sm'}>
              {placeholder}
            </Box>
          ) : (
            <Flex alignItems={'center'} gap={2} flexWrap={'wrap'}>
              {value.map((item, i) => {
                const listItem = list.find((i) => i.value === item);
                if (!listItem) return null;

                return (
                  <MyTag key={i} colorSchema="blue" type={'borderFill'}>
                    {listItem.label}
                  </MyTag>
                );
              })}
            </Flex>
          )}
        </MenuButton>

        <MenuList py={0}>
          {header}

          <Flex
            className={props.className}
            minW={(() => {
              const w = ref.current?.clientWidth;
              if (w) {
                return `${w}px !important`;
              }
              return Array.isArray(width)
                ? width.map((item) => `${item} !important`)
                : `${width} !important`;
            })()}
            w={'auto'}
            p={4}
            border={'1px solid #fff'}
            boxShadow={
              '0px 2px 4px rgba(161, 167, 179, 0.25), 0px 0px 1px rgba(121, 141, 159, 0.25);'
            }
            zIndex={99}
            maxH={'40vh'}
            overflowY={'auto'}
            gap={2}
            flexWrap={'wrap'}
          >
            {list.map((item, i) => (
              <Box
                key={i}
                {...menuItemStyles}
                onClick={() => onclickItem(item.value)}
                whiteSpace={'pre-wrap'}
                fontSize={'sm'}
              >
                {typeof item.label === 'string' && (
                  <TagCard tag={item.label} selected={value.includes(item.value)} />
                )}
              </Box>
            ))}
            {list.length === 0 && (
              <Flex align={'center'} justify={'center'} w={'100%'} h={'20px'}>
                <Box>{loading ? '加载中...' : '暂无搜索结果~'}</Box>
              </Flex>
            )}
          </Flex>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default MultipleSelect;
