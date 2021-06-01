import './styles.css';
import CrystalShowroom from './crystal-showroom';
import CrystalDashboard from 'src/crystal-dashboard';
import { Switch, Route, Redirect } from 'react-router-dom';
import { MainPath } from 'src/core/enums/main-path';
import { UserLogin } from 'src/login/user-login';
import EmployeeLogin from 'src/login/employee-login';
import { CompletePage } from 'src/shared/complete-page';
import { AdminRoute, UserRoute } from 'src/shared/auth-router';
import React from 'react';
import { NotFoundPage } from 'src/shared/not-found-page';

export default function App() {
  return (
    <>
      <Switch>
        <Route path={MainPath.UserLogin}>
          <UserLogin />
        </Route>
        <UserRoute path={MainPath.CrystalShowroom}>
          <CrystalShowroom />
        </UserRoute>
        <AdminRoute path={MainPath.CrystalDashboard}>
          <CrystalDashboard />
        </AdminRoute>
        <Route path={MainPath.EmployeeLogin}>
          <EmployeeLogin />
        </Route>
        <Route path={MainPath.CompletePage}>
          <CompletePage />
        </Route>
        <Route exact path="/">
          <Redirect to={MainPath.UserLogin} />
        </Route>
        <Route path="*">
          <NotFoundPage></NotFoundPage>
        </Route>
      </Switch>
    </>
  );
}
