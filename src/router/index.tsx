import { RouteObject, useRoutes } from 'react-router-dom';
import Home from '@/views/Home';
import Login from '@/views/Login';

/**
 * 公共路由
 */
export const constantRoutes: RouteObject[] = [
  {
    path: '/',
    id: 'Home',
    element: <Home />,
  },
  {
    path: '/login',
    id: 'Login',
    element: <Login />,
  },
];

// 创建一个可以被 React 应用程序使用的路由实例
const Router = () => {
  const routes = useRoutes(constantRoutes);
  return routes;
};

export default Router;
