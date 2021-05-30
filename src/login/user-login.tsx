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
import { useAuth } from 'src/utils/customer-hook/userAuth';
import useKeyBoard from 'src/utils/customer-hook/userKey';
import useStorage from 'src/utils/customer-hook/useStroage';
import { isEmptyOrNil } from 'src/utils/transofrm/ramda-utilis';

export function UserLogin() {
  const history = useHistory();
  const { userLogin } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const { setStorage } = useStorage();
  const { enter } = useKeyBoard();

  // validation
  const [errMsg, setErrMsg] = useFormErrorMsg();
  const { validate, setValidate } = useFormCheckValidate(errMsg, FormControlType.Account);

  const onVerifiedUser = () => {
    if (isEmptyOrNil(phoneNumber)) {
      return;
    }

    userLogin(phoneNumber).then((snapShot) => {
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
    <div className="w-full h-full flex justify-center items-center flex-col novus-logo">
      <Form1 direction="column" className="opacity-95 bg-white" borderColor="black">
        <FormField>
          <div className="title">輸入您的手機號碼:</div>
          <input
            onInput={(e) => {
              setValidate(true);
              setPhoneNumber(e.currentTarget.value);
            }}
            onKeyPress={enter(onVerifiedUser)}
          ></input>
        </FormField>
        {!validate && <FormErrorMsg errMsg={errMsg} name={FormControlType.Account}></FormErrorMsg>}
        <input type="button" onClick={onVerifiedUser} value="登入" />
      </Form1>
    </div>
  );
}
