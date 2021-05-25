import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { realtimeDB } from 'src/core/config/firebase.config';
import { USER } from 'src/core/constants/storage.constants';
import { FormControlType } from 'src/core/enums/form.enum';
import { MainPath } from 'src/core/enums/main-path';
import AllowUser from 'src/core/models/allow-user';
import FormErrorMsg from 'src/shared/form-error-msg';
import { Form1, FormField } from 'src/styles/components/form';
import useFormErrorMsg, { checkAuth } from 'src/utils/customer-hook/useFormError';
import { useFormCheckValidate } from 'src/utils/customer-hook/useFormValidate';
import useStorage from 'src/utils/customer-hook/useStroage';

export function UserLogin() {
  const history = useHistory();
  const dataTable = realtimeDB.ref('allowList');
  const [phoneNumber, setPhoneNumber] = useState('');
  const { setStorage } = useStorage();

  // validation
  const formRef = useRef<HTMLFormElement | null>(null);
  const [errMsg, setErrMsg] = useFormErrorMsg();
  const { validate, setValidate } = useFormCheckValidate(errMsg, FormControlType.Account);

  const onVerifiedUser = () => {
    dataTable
      .child(phoneNumber)
      .get()
      .then((snapShot) => {
        const user: AllowUser = snapShot.val();
        const error = !snapShot.exists() || !user.activate;

        setErrMsg(checkAuth(error));
        if (error) {
          return;
        }
        setStorage(USER, user);
        history.push(MainPath.CrystalShowroom);
      });
  };

  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <Form1 direction="column" ref={formRef}>
        <FormField>
          <div className="title">輸入您的手機號碼:</div>
          <input
            onInput={(e) => {
              setValidate(true);
              setPhoneNumber(e.currentTarget.value);
            }}
          ></input>
        </FormField>
        <input type="button" onClick={onVerifiedUser} value="登入"></input>
      </Form1>
      {!validate && <FormErrorMsg errMsg={errMsg} name={FormControlType.Account}></FormErrorMsg>}
    </div>
  );
}
