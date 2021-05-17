import { useListVals } from 'react-firebase-hooks/database';
import AllowUser from 'src/core/models/allow-user';
import { realtimeDB } from 'src/core/config/firebase.config';
import { Table } from 'src/styles/components/table';
import { Form1 } from 'src/styles/components/form';
import React, { useRef, useState } from 'react';
import useFormError, { checkFormat, FormControlType } from 'src/utils/customer-hook/useFormError';
import FormErrorMsg from 'src/shared/form-error-msg';
import { useFormValidate } from 'src/utils/customer-hook/useFormValidate';

export default function AllowListController() {
  const dataTable = realtimeDB.ref('allowList');
  const [values] = useListVals<AllowUser>(dataTable);
  const [phone, setPhone] = useState<string>('');

  // validation
  const formRef = useRef<HTMLFormElement | null>(null);
  const validate = useFormValidate(formRef.current, phone);
  const [errMsg, setErrMsg] = useFormError();

  const post = () => {
    const newAllowUser = new AllowUser(phone);
    dataTable.child(phone).set(newAllowUser);
  };

  const updateToggle = (id: string, status: boolean) => {
    dataTable.child(id).update({ activate: status });
  };

  const inputPhoneNumber = (e: React.FormEvent<HTMLInputElement>) => {
    setErrMsg(checkFormat(e));
    setPhone(e.currentTarget.value);
  };

  return (
    <>
      <Form1 ref={formRef}>
        <div className="field">
          <div className="title">手機: </div>
          <input
            type="text"
            className="px-1"
            pattern="^\d{10}$"
            name={FormControlType.Phone}
            required
            onInput={inputPhoneNumber}
          ></input>
          <FormErrorMsg errMsg={errMsg} name={FormControlType.Phone} />
        </div>
        <input type="button" value="新增" onClick={post} disabled={!validate} />
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
