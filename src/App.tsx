import './styles.css';
import CrystalShowroom from './crystal-showroom';
import CrystalDashboard from 'src/crystal-dashboard';
import { Switch, Route, Redirect } from 'react-router-dom';
import { MainPath } from 'src/core/enums/main-path';
import { UserLogin } from 'src/login/user-login';
import EmployeeLogin from 'src/login/employee-login';
import { CompletePage } from 'src/shared/complete-page';

export default function App() {
  return (
    <>
      <Switch>
        <Route path={MainPath.UserLogin}>
          <UserLogin />
        </Route>
        <Route path={MainPath.EmployeeLogin}>
          <EmployeeLogin />
        </Route>
        <Route path={MainPath.CrystalShowroom}>
          <CrystalShowroom />
        </Route>
        <Route path={MainPath.CompletePage}>
          <CompletePage />
        </Route>
        <Route path={MainPath.CrystalDashboard}>
          <CrystalDashboard />
        </Route>
        <Route exact path="/">
          <Redirect to={MainPath.UserLogin} />
        </Route>
      </Switch>
    </>
  );
}
