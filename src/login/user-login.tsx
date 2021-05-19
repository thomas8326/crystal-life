import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { realtimeDB } from 'src/core/config/firebase.config';
import { USER } from 'src/core/constants/storage.constants';
import { MainPath } from 'src/core/enums/main-path';
import AllowUser from 'src/core/models/allow-user';
import CrystalShowroom from 'src/crystal-showroom';
import { Form1 } from 'src/styles/components/form';
import useStorage from 'src/utils/customer-hook/useStroage';

export function UserLogin() {
  const history = useHistory();
  const dataTable = realtimeDB.ref('allowList');
  const [phoneNumber, setPhoneNumber] = useState('');
  const { setStorage } = useStorage();

  const onVerifiedUser = () => {
    dataTable
      .child(phoneNumber)
      .get()
      .then((snapShot) => {
        if (!!snapShot.exists()) {
          const user: AllowUser = snapShot.val();
          setStorage(USER, user);
          !!user.activate && history.push(MainPath.CrystalShowroom);
        }
      });
  };

  return (
    <div className="w-full h-full flex justify-center items-center flex-col">
      <Form1 direction="column">
        <label className="field">
          <div className="title">輸入您的手機號碼:</div>
          <input onInput={(e) => setPhoneNumber(e.currentTarget.value)}></input>
        </label>
        <input type="button" onClick={onVerifiedUser} value="登入"></input>
      </Form1>
    </div>
  );
}
