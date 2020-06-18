import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.databaseURL;

const getUserById = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/User/{userId}`)
    .then((result) => {
      const user = result.data;
      resolve(user);
    })
    .catch((err) => reject(err));
});

export default { getUserById };
