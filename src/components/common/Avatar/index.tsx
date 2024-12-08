import { Box, Icon } from '@chakra-ui/react';
import type { ImageProps } from '@chakra-ui/react';
import MyImage from '../MyImage/MyImage';
import { IconType } from 'react-icons';
import { FaRegCircleQuestion } from 'react-icons/fa6';

const Avatar = ({
  w = '30px',
  src,
  isIcon = false,
  as = FaRegCircleQuestion,
  ...props
}: ImageProps & {
  isIcon?: boolean;
  as?: IconType;
}) => {
  // @ts-ignore
  const LOGO_ICON = '/logo.svg';

  return isIcon ? (
    <Box display={'inline-flex'} {...props}>
      <Icon as={as} w={w} borderRadius={props.borderRadius} />
    </Box>
  ) : (
    <MyImage
      fallbackSrc={LOGO_ICON}
      fallbackStrategy={'onError'}
      objectFit={'contain'}
      alt=""
      w={w}
      h={w}
      src={src || LOGO_ICON}
      {...props}
    />
  );
};

export default Avatar;
