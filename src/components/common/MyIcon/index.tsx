import { Icon, IconProps } from '@chakra-ui/react';
import { IconLib } from './constant';

const MyIcon = ({ name, ...props }: IconProps & { name: keyof typeof IconLib }) => {
  return <Icon {...props} as={IconLib[name]} />;
};

export default MyIcon;
