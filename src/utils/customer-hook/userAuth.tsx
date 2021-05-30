import firebase from 'firebase';
import { useContext, useState } from 'react';
import { realtimeDB } from 'src/core/config/firebase.config';
import { authContext } from 'src/core/contexts/auth/auth.context';
import { Auth } from 'src/core/models/auth';

export const useAuth = () => useContext(authContext);

export const useProvideAuth = (): Auth => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isUser, setIsUser] = useState<boolean>(false);

  const adminLogin = (email: string, password: string) => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          setIsAdmin(true);
          setIsUser(false);
          resolve(userCredential);
        })
        .catch((error) => reject(error));
    });
  };

  const userLogin = (account: string) => {
    return new Promise((resolve, reject) => {
      realtimeDB
        .ref('allowList')
        .child(account)
        .get()
        .then((userCredential) => {
          console.log('In');
          setIsAdmin(false);
          setIsUser(true);
          resolve(userCredential);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  return { isAdmin, isUser, adminLogin, userLogin };
};
