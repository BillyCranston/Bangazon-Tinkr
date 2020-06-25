import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.databaseURL;

const getUser = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/User/${userId}`)
    .then((result) => {
      const user = result.data;
      resolve(user);
    })
    .catch((err) => reject(err));
});

const getUserByRubbishId = (rubbishId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/User/Rubbish/${rubbishId}`)
    .then((result) => {
      const user = result.data;
      resolve(user);
    })
    .catch((err) => reject(err));
});

const getSellerByInfo = (sellerInfo) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/User/Info/${sellerInfo}`)
    .then((result) => {
      const returnedSellerInfo = result.data;
      resolve(returnedSellerInfo);
    })
    .catch((error) => reject(error));
});

export default { getUser, getUserByRubbishId, getSellerByInfo };
