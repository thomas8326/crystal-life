import { Redirect, Route } from 'react-router-dom';
import { MainPath } from 'src/core/enums/main-path';
import { useAuth } from 'src/utils/customer-hook/userAuth';

class ProtectedRoute {
  children!: JSX.Element | JSX.Element[];
  [rest: string]: any;
}

export const UserRoute = ({ children, ...rest }: ProtectedRoute) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.isUser ? children : <Redirect to={{ pathname: MainPath.UserLogin, state: { from: location } }}></Redirect>
      }
    ></Route>
  );
};

export function AdminRoute({ children, ...rest }: ProtectedRoute) {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.isAdmin ? (
          children
        ) : (
          <Redirect to={{ pathname: MainPath.EmployeeLogin, state: { from: location } }}></Redirect>
        )
      }
    ></Route>
  );
}
