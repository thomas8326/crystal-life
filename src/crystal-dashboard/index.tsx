import DashboardNavigation from 'src/crystal-dashboard/components/dashboard-navigation';
import HandSizeForm from 'src/crystal-dashboard/components/handsize-form';
import SliverPipeForm from 'src/crystal-dashboard/components/sliver-pipe-form';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { MainPath } from 'src/core/enums/main-path';
import { DASHBOARD_NAVIGATION } from 'src/core/constants/constants';
import UploadImageForm from 'src/crystal-dashboard/components/upload-image-form';
import AllowListController from 'src/crystal-dashboard/components/allowlist-control';

export default function CrystalDashboard() {
  return (
    <div className="h-full flex">
      <Router>
        <DashboardNavigation navigation={DASHBOARD_NAVIGATION} />
        <div className="flex flex-col flex-grow items-center divide-y-2">
          <div className="w-full">
            <Switch>
              <Route path={MainPath.AllowList}>
                <AllowListController />
              </Route>
              <Route path={MainPath.HandSizeForm}>
                <HandSizeForm />
              </Route>
              <Route path={MainPath.SliverPipeForm}>
                <SliverPipeForm />
              </Route>
              <Route path={MainPath.CrystalBeadForm}>
                <UploadImageForm tableName="crystalImages" />
              </Route>
              <Route path={MainPath.FlowerCoverForm}>
                <UploadImageForm tableName="flowerCovers" />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}
