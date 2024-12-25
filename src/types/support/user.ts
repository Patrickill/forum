export interface User {
  avatar: string;
  email: string;
  nickname: string;
  phone: string;
  username: string;
}

export interface UserType extends User {
  id: number;
  status: number;
  type: number;
}
