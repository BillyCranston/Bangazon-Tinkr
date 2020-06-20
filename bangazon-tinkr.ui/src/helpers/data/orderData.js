import axios from 'axios';

import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.databaseURL;

const getUserOrder = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Order/${userId}`)
    .then((result) => {
      const userOrder = result.data;
      resolve(userOrder);
    })
    .catch((err) => reject(err));
});

export default { getUserOrder };
