import firebase from 'firebase';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MainPath } from 'src/core/enums/main-path';

export default function EmployeeLogin() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const onAuthVerified = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        history.push(MainPath.CrystalDashboard);
      })
      .catch((e) => setIsError(true));
  };

  return (
    <>
      <input onInput={(e) => setEmail(e.currentTarget.value)}></input>
      <input type="password" onInput={(e) => setPassword(e.currentTarget.value)}></input>
      <input type="button" onClick={onAuthVerified} value="登入" />
      {isError && <span>帳號密碼錯誤</span>}
    </>
  );
}
