import { useListVals } from 'react-firebase-hooks/database';
import AllowUser from 'src/core/models/allow-user';
import { realtimeDB } from 'src/core/config/firebase.config';
import { Table } from 'src/styles/components/table';
import { Form1 } from 'src/styles/components/form';
import React, { useState } from 'react';

export default function AllowListController() {
  const dataTable = realtimeDB.ref('allowList');
  const [values] = useListVals<AllowUser>(dataTable);
  const [phone, setPhone] = useState<string>('');

  const post = () => {
    const newAllowUser = new AllowUser(phone);
    dataTable.child(phone).set(newAllowUser);
  };

  const updateToggle = (id: string, status: boolean) => {
    dataTable.child(id).update({ activate: status });
  };

  return (
    <>
      <Form1>
        <div className="field">
          <div className="title">手機: </div>
          <input type="text" className="px-1" onInput={(e) => setPhone(e.currentTarget.value)}></input>
        </div>
        <input type="button" value="新增" onClick={post} />
      </Form1>
      <Table className="table">
        <div className="table-header-group">
          <div className="table-cell">編號</div>
          <div className="table-cell">手機號碼</div>
          <div className="table-cell">活動狀態</div>
        </div>
        <div className="table-row-group">
          {values &&
            values?.map((v: AllowUser, index: number) => (
              <li key={v.key} className="table-row">
                <div className="table-cell">{index + 1}</div>
                <div className="table-cell">{v.phone}</div>
                <div className="table-cell">
                  <label>
                    <input
                      id="activate"
                      type="radio"
                      name={`activated${index}`}
                      defaultChecked={!!v.activate}
                      onChange={() => updateToggle(v.key, true)}
                    />
                    啟用
                  </label>
                  <label>
                    <input
                      id="deactivate"
                      type="radio"
                      name={`activated${index}`}
                      defaultChecked={!v.activate}
                      onChange={() => updateToggle(v.key, false)}
                    />
                    停用
                  </label>
                </div>
              </li>
            ))}
        </div>
      </Table>
    </>
  );
}
