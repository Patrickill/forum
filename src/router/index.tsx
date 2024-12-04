import { RouteObject, useRoutes } from 'react-router-dom';
import Home from '@/views/Home';
import Login from '@/views/Login';
import Setting from '@/views/Setting';
import Alerts from '@/views/Alerts';
import Me from '@/views/Me';

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
    path: '/setting',
    id: 'Setting',
    element: <Setting />,
  },
  {
    path: '/alerts',
    id: 'Alerts',
    element: <Alerts />,
  },
  {
    path: '/me',
    id: 'Me',
    element: <Me />,
  },
];

// 创建一个可以被 React 应用程序使用的路由实例
const Router = () => {
  const routes = useRoutes(constantRoutes);
  return routes;
};

export default Router;
