import { POST } from './utils/request';

type loginProps = {
  username: string;
  password: string;
};

export const Login = ({ username, password }: loginProps) =>
  POST('/api/auth/login', { username, password });

export const Register = ({ username, password, nickname }: loginProps & { nickname: string }) =>
  POST('/api/user/register', { username, password, nickname });
