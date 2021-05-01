import DashboardNavigation from 'src/core/crystal-dashboard/components/dashboard-navigation';
import HandSizeForm from 'src/core/crystal-dashboard/components/handsize-form';
import RadioGroup from 'src/shared/redio-group';
import { useList, useListVals, useObject, useObjectVal } from 'react-firebase-hooks/database';
import firebase from 'firebase/app';
import initFireBase from 'src/core/config/firebase.config';

export default function CrystalDashboard() {
  const [values, loading, error] = useObjectVal<[]>(firebase.database(initFireBase).ref('allowList'));
  console.log(values);
  return (
    <div className="h-full flex">
      <DashboardNavigation />
      <div className="flex flex-col flex-grow items-center divide-y-2">
        <ul className="w-full">{values && values?.map((v: any) => <li>{v.phone}</li>)}</ul>
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
