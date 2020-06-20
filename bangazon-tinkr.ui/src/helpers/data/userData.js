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

export default { getUser, getUserByRubbishId };
