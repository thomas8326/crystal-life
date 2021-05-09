import React, { useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { realtimeDB } from 'src/core/config/firebase.config';
import { MainPath } from 'src/core/enums/main-path';
import AllowUser from 'src/core/models/allow-user';
import CrystalShowroom from 'src/crystal-showroom';

export function UserLogin() {
  const history = useHistory();
  const dataTable = realtimeDB.ref('allowList');
  const [phoneNumber, setPhoneNumber] = useState('');

  const onVerifiedUser = () => {
    dataTable
      .child(phoneNumber)
      .get()
      .then((snapShot) => {
        if (!!snapShot.exists()) {
          const user: AllowUser = snapShot.val();
          !!user.activate && history.push(MainPath.CrystalShowroom);
        }
      });
  };

  return (
    <>
      <form>
        <input onInput={(e) => setPhoneNumber(e.currentTarget.value)}></input>
        <input type="button" onClick={onVerifiedUser} value="submit"></input>
      </form>
    </>
  );
}
