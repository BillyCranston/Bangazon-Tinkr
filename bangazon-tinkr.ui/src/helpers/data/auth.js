import firebase from 'firebase';
import axios from 'axios';

const baseUrl = 'https://localhost:44300/api';
// interceptors work by changing the outbound request before the xhr is sent
// or by changing the response before it's returned to our .then() method.
axios.interceptors.request.use((request) => {
  const token = sessionStorage.getItem('token');
  if (token != null) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
}, (err) => Promise.reject(err));

const registerUser = (user) =>
  // sub out whatever auth method firebase provides that you want to use.
  // eslint-disable-next-line implicit-arrow-linebreak
  firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then((cred) => {
    // eslint-disable-next-line no-param-reassign
    user.firebaseUid = cred.credential.firebaseUid;

    // get token from firebase
    cred.user.getIdToken()
      // save the token to the session storage
      .then((token) => sessionStorage.setItem('token', token))
      // save the user to the the api
      .then(() => axios.post(`${baseUrl}/RegisteredUser/register`, user));
  });

const loginUser = (user) => {
  // sub out whatever auth method firebase provides that you want to use.
  // eslint-disable-next-line implicit-arrow-linebreak
  return firebase.auth().signInWithEmailAndPassword(user.email, user.password).then((cred) => {
    // get token from firebase
    cred.user.getIdToken()
      // save the token to the session storage
      .then((token) => sessionStorage.setItem('token', token));
  });
};

const logoutUser = () => firebase.auth().signOut();

const getUid = () => firebase.auth().currentUser.uid;

export default {
  getUid,
  loginUser,
  logoutUser,
  registerUser,
};
