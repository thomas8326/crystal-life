import { authContext } from 'src/core/contexts/auth/auth.context';
import { useProvideAuth } from 'src/utils/customer-hook/useAuth';

export function AuthProvider(props: { children: JSX.Element | JSX.Element[] }) {
  const { children } = props;
  const authProvider = useProvideAuth();
  return <authContext.Provider value={authProvider}>{children}</authContext.Provider>;
}
