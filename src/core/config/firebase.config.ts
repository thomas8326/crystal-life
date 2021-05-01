import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyA7Et9JNWlPyV2WTa-tH00Z6_ex2AwJJNA',
  authDomain: 'crystal-showroom.firebaseapp.com',
  databaseURL: 'https://crystal-showroom-default-rtdb.firebaseio.com/',
  projectId: 'crystal-showroom',
  storageBucket: 'crystal-showroom.appspot.com',
  messagingSenderId: '249831469600',
  appId: '1:249831469600:web:ccf76daa2e4e4779780245',
  measurementId: 'G-PHLW3HRD0Z',
};

const initFireBase = firebase.initializeApp(firebaseConfig);

export default initFireBase;
