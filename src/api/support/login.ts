import { RegisterFormType } from '@/views/Login/components/RegisterForm';
import { POST } from '../utils/request';

type loginProps = {
  username: string;
  password: string;
};

export interface ResLogin {
  user: string;
  token: string;
}

export const Login = ({ username, password }: loginProps) =>
  POST<ResLogin>('/api/auth/login', { username, password });

export const Register = (data: RegisterFormType) => POST<ResLogin>('/api/user/register', data);
