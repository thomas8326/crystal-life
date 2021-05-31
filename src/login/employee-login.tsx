import firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { FormControlType } from 'src/core/enums/form.enum';
import { MainPath } from 'src/core/enums/main-path';
import FormErrorMsg from 'src/shared/form-error-msg';
import { Form1, FormField } from 'src/styles/components/form';
import useFormErrorMsg, { checkAccount } from 'src/utils/customer-hook/useFormError';
import { useFormCheckValidate } from 'src/utils/customer-hook/useFormValidate';
import { useAuth } from 'src/utils/customer-hook/useAuth';
import useKeyBoard from 'src/utils/customer-hook/userKey';
import styled from 'styled-components';

const NovusLogo = styled.div`
  width: 50%;
  height: 100%;
  background-color: #d7eaf1;
  flex: 1;
`;

export default function EmployeeLogin() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { adminLogin } = useAuth();
  const { enter } = useKeyBoard();
  const { isAdmin } = useAuth();

  // validation
  const [errMsg, setErrMsg] = useFormErrorMsg();
  const { validate, setValidate } = useFormCheckValidate(errMsg, FormControlType.Account);

  const inputEmail = (e: React.FormEvent<HTMLInputElement>) => {
    setValidate(true);
    setEmail(e.currentTarget.value);
  };

  const inputPassword = (e: React.FormEvent<HTMLInputElement>) => {
    setValidate(true);
    setPassword(e.currentTarget.value);
  };

  const onAuthVerified = () => {
    adminLogin(email, password)
      .then((userCredential) => {
        history.push(MainPath.CrystalDashboard);
      })
      .catch((e) => {
        setErrMsg(checkAccount(true));
        setValidate(false);
      });
  };

  return (
    <>
      {isAdmin ? (
        <Redirect to={{ pathname: MainPath.CrystalDashboard }}></Redirect>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <NovusLogo className="rect-novus-logo"></NovusLogo>
          <div className="flex flex-1 flex justify-center items-center">
            <Form1 direction="column" className="items-center" style={{ width: '260px' }}>
              <FormField className="field ">
                <div className="title">帳號</div>
                <input onInput={inputEmail} onKeyPress={enter(onAuthVerified)}></input>
              </FormField>
              <FormField className="field">
                <div className="title">密碼</div>
                <input type="password" onInput={inputPassword} onKeyPress={enter(onAuthVerified)}></input>
              </FormField>
              <input type="button" onClick={onAuthVerified} value="登入" />
              {!validate && <FormErrorMsg errMsg={errMsg} name={FormControlType.Account}></FormErrorMsg>}
            </Form1>
          </div>
        </div>
      )}
    </>
  );
}
