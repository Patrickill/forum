const unAuthPage: { [key: string]: boolean } = {
  '/': true,
  '/login': true,
  '/login/provider': true,
  '/login/fastlogin': true,
  '/login/sso': true,
  '/appStore': true,
  '/chat/share': true,
  '/chat/team': true,
  '/tools/price': true,
  '/price': true,
};

const Auth = ({ children }: { children: JSX.Element }) => {
  return <>{children}</>;
};

export default Auth;
