import React, { useMemo } from 'react';
import { Avatar, Box, BoxProps, Flex, Link, LinkProps, useDisclosure } from '@chakra-ui/react';
import MyIcon from '@/components/common/Icon';
import { useNavigate, useLocation } from 'react-router-dom';
import MyRightDrawer from '../MyDrawer/MyRightDrawer';
import Message from '@/views/Message';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const navbarList = useMemo(
    () => [
      {
        label: '广场',
        icon: 'core/chat/chatLight',
        activeIcon: 'core/chat/chatFill',
        link: '/home',
        activeLink: ['/home'],
      },
      {
        label: '快讯',
        icon: 'core/app/aiLight',
        activeIcon: 'core/app/aiFill',
        link: `/alerts`,
        activeLink: ['/alerts'],
      },
      {
        label: '消息',
        icon: 'core/dataset/datasetLight',
        activeIcon: 'core/dataset/datasetFill',
        link: `/message`,
        activeLink: ['/message'],
      },
      {
        label: '我的',
        icon: 'support/user/userLight',
        activeIcon: 'support/user/userFill',
        link: '/me',
        activeLink: ['/me'],
      },
      {
        label: '设置',
        icon: 'support/user/userLight',
        activeIcon: 'support/user/userFill',
        link: '/setting',
        activeLink: ['/setting'],
      },
    ],
    []
  );

  const itemStyles: BoxProps & LinkProps = {
    my: 3,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    w: '48px',
    h: '58px',
    borderRadius: 'md',
  };

  return (
    <>
      <Flex
        flexDirection={'column'}
        alignItems={'center'}
        pt={6}
        h={'100%'}
        w={'100%'}
        userSelect={'none'}
      >
        {/* logo */}
        <Box
          flex={'0 0 auto'}
          mb={3}
          border={'2px solid #fff'}
          borderRadius={'50%'}
          overflow={'hidden'}
          cursor={'pointer'}
          onClick={() => navigate('/account')}
        >
          <Avatar w={'36px'} h={'36px'} src={'/logo.svg'} borderRadius={'50%'} />
        </Box>
        {/* 导航列表 */}
        <Box flex={1}>
          {navbarList.map((item) => (
            <Box
              key={item.link}
              {...itemStyles}
              {...(item.activeLink.includes(location.pathname)
                ? {
                    color: 'primary.600',
                    bg: 'white',
                    boxShadow:
                      '0px 0px 1px 0px rgba(19, 51, 107, 0.08), 0px 4px 4px 0px rgba(19, 51, 107, 0.05)',
                  }
                : {
                    color: 'myGray.500',
                    bg: 'transparent',
                    _hover: {
                      bg: 'rgba(255,255,255,0.9)',
                    },
                  })}
              {...(item.link !== location.pathname
                ? {
                    onClick: () => {
                      if (item.link === '/message') onOpen();
                      else navigate(item.link);
                    },
                  }
                : {})}
            >
              <MyIcon
                name={
                  item.activeLink.includes(location.pathname)
                    ? (item.activeIcon as any)
                    : (item.icon as any)
                }
                width={'20px'}
                height={'20px'}
              />
              <Box fontSize={'12px'} transform={'scale(0.9)'} mt={'5px'} lineHeight={1}>
                {item.label}
              </Box>
            </Box>
          ))}
        </Box>
      </Flex>
      isOpen && (
      <Message isOpen={isOpen} onClose={onClose} title={'消息'} />)
    </>
  );
};

export default Navbar;