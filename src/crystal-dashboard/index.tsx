import DashboardNavigation from 'src/crystal-dashboard/components/dashboard-navigation';
import HandSizeForm from 'src/crystal-dashboard/components/handsize-form';
import SliverPipeForm from 'src/crystal-dashboard/components/sliver-pipe-form';
import { BrowserRouter as Router, Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import { MainPath } from 'src/core/enums/main-path';
import { DASHBOARD_NAVIGATION } from 'src/core/constants/constants';
import UploadImageForm from 'src/crystal-dashboard/components/upload-image-form';
import AllowListController from 'src/crystal-dashboard/components/allowlist-control';

export default function CrystalDashboard() {
  const { url } = useRouteMatch();

  return (
    <div className="h-full flex">
      <DashboardNavigation navigation={DASHBOARD_NAVIGATION} currentUrl={url} />
      <div className="flex flex-col flex-grow items-center divide-y-2">
        <div className="w-full">
          <Switch>
            <Route path={`${url}${MainPath.AllowList}`}>
              <AllowListController />
            </Route>
            <Route path={`${url}${MainPath.HandSizeForm}`}>
              <HandSizeForm />
            </Route>
            <Route path={`${url}${MainPath.SliverPipeForm}`}>
              <SliverPipeForm />
            </Route>
            <Route path={`${url}${MainPath.CrystalBeadForm}`}>
              <UploadImageForm tableName="crystalImages" />
            </Route>
            <Route path={`${url}${MainPath.FlowerCoverForm}`}>
              <UploadImageForm tableName="flowerCovers" />
            </Route>
            <Route exact path={`${url}`}>
              <Redirect to={`${url}${MainPath.AllowList}`}></Redirect>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}
