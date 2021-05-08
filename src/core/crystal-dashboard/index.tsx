import DashboardNavigation from 'src/core/crystal-dashboard/components/dashboard-navigation';
import HandSizeForm from 'src/core/crystal-dashboard/components/handsize-form';
import RadioGroup from 'src/shared/redio-group';
import { useList, useListVals, useObject, useObjectVal } from 'react-firebase-hooks/database';
import firebase from 'firebase/app';
import AllowUser from 'src/core/models/allow-user';
import AllowListController from 'src/core/crystal-dashboard/components/allowlist-control';
import SliverPipeForm from 'src/core/crystal-dashboard/components/sliver-pipe-form';
import CrystalBeadForm from 'src/core/crystal-dashboard/components/crystal-bead-form';

export default function CrystalDashboard() {
  return (
    <div className="h-full flex">
      <DashboardNavigation />
      <div className="flex flex-col flex-grow items-center divide-y-2">
        <div className="w-full flex">
          <AllowListController></AllowListController>
        </div>
        <div className="w-full flex">
          <HandSizeForm></HandSizeForm>
        </div>
        <div className="w-full flex">
          <SliverPipeForm />
        </div>
        <div className="w-full flex">
          <CrystalBeadForm />
        </div>
        <div className="w-full">手圍</div>
      </div>
    </div>
  );
}
