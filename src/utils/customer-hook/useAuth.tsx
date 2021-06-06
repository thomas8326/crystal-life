import firebase from 'firebase';
import { useContext, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { realtimeDB } from 'src/core/config/firebase.config';
import { authContext } from 'src/core/contexts/auth/auth.context';
import { MainPath } from 'src/core/enums/main-path';
import { Auth } from 'src/core/models/auth';
import useStorage from 'src/utils/customer-hook/useStroage';

export const useAuth = () => useContext(authContext);

class AccessRight {
  adminToken!: string | null;
  isUser!: boolean;

  constructor(accessRight?: AccessRight) {
    this.adminToken = accessRight?.adminToken ?? null;
    this.isUser = accessRight?.isUser ?? false;
  }
}

export const useProvideAuth = (): Auth => {
  const { getSession, setSession } = useStorage();
  const history = useHistory();
  const { adminToken, isUser: userState } =
    getSession<AccessRight>('accessRight') ?? new AccessRight({ adminToken: null, isUser: false });

  const tokenRef = useRef(adminToken);
  const [isAdmin, setIsAdmin] = useState<boolean>(!!adminToken);
  const [isUser, setIsUser] = useState<boolean>(userState);

  useEffect(() => {
    if (userState) {
      setSession('accessRight', new AccessRight({ adminToken: null, isUser: userState }));
      return;
    }

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!tokenRef.current) {
        setIsAdmin(false);
      }

      Promise.resolve(user)
        .then((user) => {
          if (!user) {
            setIsAdmin(false);
          }

          return user?.getIdToken();
        })
        .then((token) => {
          setIsAdmin(token === tokenRef.current);
          token !== tokenRef.current && setSession('accessRight', new AccessRight({ adminToken: null, isUser: false }));
        });
    });

    return () => unsubscribe();
  }, []);

  const adminLogin = (email: string, password: string) => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
              setIsAdmin(true);
              setIsUser(false);

              console.log(userCredential.user);
              return userCredential.user?.getIdToken();
            })
            .then((id) => {
              id && (tokenRef.current = id);
              id && setSession('accessRight', new AccessRight({ adminToken: id, isUser: false }));
              resolve(id);
            })
            .catch((error) => reject(error));
        });
    });
  };

  const adminLogout = () => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          setIsAdmin(false);
          setIsUser(false);
          setSession('accessRight', new AccessRight({ adminToken: null, isUser: false }));
          resolve('log out');
          history.push(MainPath.EmployeeLogin);
        })
        .catch((e) => {
          console.warn(e);
          reject('log out fail');
        });
    });
  };

  const userLogin = (account: string) => {
    return new Promise((resolve, reject) => {
      realtimeDB
        .ref('allowList')
        .child(account)
        .get()
        .then((userCredential) => {
          setIsAdmin(false);
          setIsUser(true);
          setSession('accessRight', new AccessRight({ adminToken: null, isUser: true }));
          resolve(userCredential);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const userLogout = () => {
    return new Promise((resolve, reject) => {
      setIsAdmin(false);
      setIsUser(false);
      setSession('accessRight', new AccessRight({ adminToken: null, isUser: false }));
      history.push(MainPath.UserLogin);
      resolve('log out');
    });
  };

  return { isAdmin, isUser, adminLogin, userLogin, adminLogout, userLogout };
};
