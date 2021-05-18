import AllowUser from 'src/core/models/allow-user';
import { Table } from 'src/styles/components/table';
import { Form1 } from 'src/styles/components/form';
import React, { useRef, useState } from 'react';
import useFormError, { checkFormat } from 'src/utils/customer-hook/useFormError';
import FormErrorMsg from 'src/shared/form-error-msg';
import { useFormValidate } from 'src/utils/customer-hook/useFormValidate';
import { Button1 } from 'src/styles/components/button';
import useHttpClient from 'src/utils/customer-hook/useHttpClient';
import { FormControlType } from 'src/core/enums/form.enum';
import { TAIWAN_PHONE_PATTERN } from 'src/core/constants/form.constants';

export default function AllowListController() {
  const [phone, setPhone] = useState<string>('');
  const { list, post, remove, patch } = useHttpClient<AllowUser>('allowList');

  // validation
  const formRef = useRef<HTMLFormElement | null>(null);
  const validate = useFormValidate(formRef.current, phone);
  const [errMsg, setErrMsg] = useFormError();

  const deleteUser = (id: string) => remove(id);
  const newUser = () => post(new AllowUser(phone), phone).then((error) => !error && setPhone(''));
  const updateStatus = (id: string, status: boolean) => patch(id, { activate: status });

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
            pattern={TAIWAN_PHONE_PATTERN}
            value={phone}
            name={FormControlType.Phone}
            required
            onInput={inputPhoneNumber}
          ></input>
          <FormErrorMsg errMsg={errMsg} name={FormControlType.Phone} />
        </div>
        <input type="button" value="新增" onClick={newUser} disabled={!validate} />
      </Form1>
      <Table className="table">
        <div className="table-header-group">
          <div className="table-cell">編號</div>
          <div className="table-cell">手機號碼</div>
          <div className="table-cell">活動狀態</div>
          <div className="table-cell"></div>
        </div>
        <div className="table-row-group">
          {list &&
            list?.map((v: AllowUser, index: number) => (
              <li key={v.id} className="table-row">
                <div className="table-cell">{index + 1}</div>
                <div className="table-cell">{v.phone}</div>
                <div className="table-cell">
                  <label>
                    <input
                      key={`${v.id}activated`}
                      id="activate"
                      type="radio"
                      name={`activated${index}`}
                      checked={!!v.activate}
                      onChange={() => updateStatus(v.key, true)}
                    />
                    啟用
                  </label>
                  <label>
                    <input
                      key={`${v.id}deactivated`}
                      id="deactivate"
                      type="radio"
                      name={`activated${index}`}
                      checked={!v.activate}
                      onChange={() => updateStatus(v.key, false)}
                    />
                    停用
                  </label>
                </div>
                <div className="space-x-2 table-cell">
                  <Button1 onClick={() => deleteUser(v.id)}>刪除</Button1>
                </div>
              </li>
            ))}
        </div>
      </Table>
    </>
  );
}
