import DashboardNavigation from 'src/core/crystal-dashboard/components/dashboard-navigation';
import HandSizeForm from 'src/core/crystal-dashboard/components/handsize-form';
import RadioGroup from 'src/shared/redio-group';
import { useList, useListVals, useObject, useObjectVal } from 'react-firebase-hooks/database';
import firebase from 'firebase/app';
import AllowUser from 'src/core/models/allow-user';
import AllowListController from 'src/core/crystal-dashboard/components/allowlist-control';
import SliverPipeForm from 'src/core/crystal-dashboard/components/sliver-pipe-form';
import CrystalBeadForm from 'src/core/crystal-dashboard/components/crystal-bead-form';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { MainPath } from 'src/core/enums/main-path';
import { DASHBOARD_NAVIGATION } from 'src/core/constants/constants';

export default function CrystalDashboard() {
  return (
    <div className="h-full flex">
      <Router>
        <DashboardNavigation navigation={DASHBOARD_NAVIGATION} />
        <div className="flex flex-col flex-grow items-center divide-y-2">
          <div className="w-full">
            <Switch>
              <Route path={MainPath.HandSizeForm}>
                <HandSizeForm />
              </Route>
              <Route path={MainPath.SliverPipeForm}>
                <SliverPipeForm />
              </Route>
              <Route path={MainPath.CrystalBead}>
                <CrystalBeadForm />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}
