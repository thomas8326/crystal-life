import HandSizeForm from 'src/core/crystal-dashboard/components/handsize-form';
import RadioGroup from 'src/shared/redio-group';
import { useList, useListVals, useObjectVal } from 'react-firebase-hooks/database';
import firebase from 'firebase/app';
import initFireBase from 'src/core/config/firebase.config';
import AllowUser from 'src/core/models/allow-user';

export default function AllowListController() {
  const dataTable = firebase.database(initFireBase).ref('allowList');
  const [values] = useListVals<AllowUser>(dataTable);

  const post = () => {
    const newPost = dataTable.push();
    const newAllowUser = new AllowUser('0933123456');
    newPost.set(newAllowUser);
  };

  return (
    <>
      <ul className="table">
        <li className="table-row">
          <div className="table-cell">編號</div>
          <div className="table-cell">手機號碼</div>
          <div className="table-cell">活動狀態</div>
        </li>
        {values &&
          values?.map((v: AllowUser, index: number) => (
            <li key={v.key} className="table-row">
              <div className="table-cell">{index + 1}</div>
              <div className="table-cell">{v.phone}</div>
              <div className="table-cell">
                <label>
                  <input id="activate" type="radio" name={`activated${index}`} defaultChecked={!!v.activate} />
                  啟用
                </label>
                <label>
                  <input id="deactivate" type="radio" name={`activated${index}`} defaultChecked={!v.activate} />
                  停用
                </label>
              </div>
            </li>
          ))}
      </ul>
      <div onClick={post}>Add +</div>
    </>
  );
}
