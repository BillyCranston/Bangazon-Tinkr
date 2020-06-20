import axios from 'axios';

import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.databaseURL;

const getProducts = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Rubbish/`)
    .then((result) => {
      const allRubbish = result.data;
      resolve(allRubbish);
    })
    .catch((err) => reject(err));
});

const getProductsByUserId = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Rubbish/User/${userId}`)
    .then((result) => {
      const allRubbishByUser = result.data;
      resolve(allRubbishByUser);
    })
    .catch((err) => reject(err));
});

export default { getProducts, getProductsByUserId };
