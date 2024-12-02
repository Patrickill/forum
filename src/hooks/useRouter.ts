import { useLocation, useNavigate } from 'react-router-dom';

const useRoute = () => {
  const { pathname } = useLocation();
  const navigator = useNavigate();
  return {
    pathname,
    push: (path: string) => {
      navigator(path);
    },
  };
};

export default useRoute;
