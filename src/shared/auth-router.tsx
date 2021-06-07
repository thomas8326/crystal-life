import { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { MainPath } from 'src/core/enums/main-path.enum';
import { useAuth } from 'src/utils/customer-hook/useAuth';

class ProtectedRoute {
  children!: JSX.Element | JSX.Element[];
  [rest: string]: any;
}

export const UserRoute = ({ children, ...rest }: ProtectedRoute) => {
  const { isUser } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isUser ? children : <Redirect to={{ pathname: MainPath.UserLogin, state: { from: location } }}></Redirect>
      }
    ></Route>
  );
};

export function AdminRoute({ children, ...rest }: ProtectedRoute) {
  const { isAdmin } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAdmin ? children : <Redirect to={{ pathname: MainPath.EmployeeLogin, state: { from: location } }}></Redirect>
      }
    ></Route>
  );
}
