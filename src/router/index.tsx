import { RouteObject, useRoutes } from 'react-router-dom';
import Home from '@/views/Home';
import Login from '@/views/Login';

import Me from '@/views/Me';
import Editor from '@/views/Edit';
import Post from '@/views/Post';
import Tag from '@/views/Tag';
import Search from '@/views/Search';

/**
 * 公共路由
 */
export const constantRoutes: RouteObject[] = [
  {
    path: '/',
    id: 'index',
    element: <Home />,
  },
  {
    path: '/home',
    id: 'Home',
    element: <Home />,
  },
  {
    path: '/login',
    id: 'Login',
    element: <Login />,
  },
  {
    path: '/me',
    id: 'Me',
    element: <Me />,
  },
  {
    path: '/edit',
    id: 'edit',
    element: <Editor />,
  },
  {
    path: '/post',
    id: 'post',
    element: <Post />,
  },
  {
    path: '/tag',
    id: 'tag',
    element: <Tag />,
  },
  {
    path: '/search',
    id: 'search',
    element: <Search />,
  },
];

// 创建一个可以被 React 应用程序使用的路由实例
const Router = () => {
  const routes = useRoutes(constantRoutes);
  return routes;
};

export default Router;
