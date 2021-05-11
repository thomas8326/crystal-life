import firebase from 'firebase';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MainPath } from 'src/core/enums/main-path';
import { Form1 } from 'src/styles/components/form';

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
    <div className="w-full h-full flex justify-center items-center">
      <Form1 direction="column" className="items-center" style={{ width: '260px' }}>
        <label className="field ">
          <div className="title">帳號</div>
          <input onInput={(e) => setEmail(e.currentTarget.value)}></input>
        </label>
        <label className="field">
          <div className="title">密碼</div>
          <input type="password" onInput={(e) => setPassword(e.currentTarget.value)}></input>
        </label>
        <input type="button" onClick={onAuthVerified} value="登入" />
        {isError && <div className="warning">帳號密碼錯誤</div>}
      </Form1>
    </div>
  );
}
