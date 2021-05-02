import DashboardNavigation from 'src/core/crystal-dashboard/components/dashboard-navigation';
import HandSizeForm from 'src/core/crystal-dashboard/components/handsize-form';
import RadioGroup from 'src/shared/redio-group';
import { useList, useListVals, useObject, useObjectVal } from 'react-firebase-hooks/database';
import firebase from 'firebase/app';
import initFireBase from 'src/core/config/firebase.config';
import AllowUser from 'src/core/models/allow-user';
import AllowListController from 'src/core/crystal-dashboard/components/allowlist-control';

export default function CrystalDashboard() {
  return (
    <div className="h-full flex">
      <DashboardNavigation />
      <div className="flex flex-col flex-grow items-center divide-y-2">
        <div className="w-full">
          <AllowListController></AllowListController>
        </div>
        <div className="w-full">
          手圍
          <div>
            <span>水晶珠大小</span>
            <label>
              <input type="radio" value={8} name="crystalSize"></input>
              8nm
            </label>
            <label>
              <input type="radio" value={10} name="crystalSize"></input>
              10nm
            </label>
          </div>
          <div>
            <span>水晶珠數量</span>
            <input type="text" className="border"></input>
          </div>
        </div>
        <div className="w-full">手圍</div>
        <div className="w-full">手圍</div>
        <div className="w-full">手圍</div>
        <div className="w-full">手圍</div>
      </div>
    </div>
  );
}
