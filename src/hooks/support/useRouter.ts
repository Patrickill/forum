import { useLocation, useNavigate } from 'react-router-dom';

const useRoute = () => {
  const location = useLocation();
  const { pathname, search } = location;
  const navigator = useNavigate();

  const queryParams = new URLSearchParams(search);
  const openNewTab = ({ path, params }: { path: string; params: Record<string, string> }) => {
    const queryParams = new URLSearchParams(params).toString();
    window.open(`${path}?${queryParams}`, '_blank');
  };

  return {
    pathname,
    queryParams,
    push: (path: string) => {
      navigator(path);
    },
    getQueryParam: (key: string) => {
      return queryParams.get(key);
    },
    openNewTab,
  };
};

export default useRoute;
