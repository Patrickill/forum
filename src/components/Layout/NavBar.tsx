import React, { useMemo } from 'react';
import { Avatar, Box, BoxProps, Flex, Link, LinkProps } from '@chakra-ui/react';
import MyIcon from '@/components/Icon';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navbarList = useMemo(
    () => [
      {
        label: '广场',
        icon: 'core/chat/chatLight',
        activeIcon: 'core/chat/chatFill',
        // link: `/chat?appId=${lastChatAppId}&chatId=${lastChatId}`,
        activeLink: ['/chat'],
      },
      {
        label: '快讯',
        icon: 'core/app/aiLight',
        activeIcon: 'core/app/aiFill',
        link: `/app/list`,
        activeLink: ['/app/list', '/app/detail'],
      },
      {
        label: '消息',
        icon: 'core/dataset/datasetLight',
        activeIcon: 'core/dataset/datasetFill',
        link: `/dataset/list`,
        activeLink: ['/dataset/list', '/dataset/detail'],
      },
      {
        label: '我的',
        icon: 'support/user/userLight',
        activeIcon: 'support/user/userFill',
        link: '/account',
        activeLink: ['/account'],
      },
      {
        label: '设置',
        icon: 'support/user/userLight',
        activeIcon: 'support/user/userFill',
        link: '/account',
        activeLink: ['/account'],
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
  );
};

export default Navbar;
