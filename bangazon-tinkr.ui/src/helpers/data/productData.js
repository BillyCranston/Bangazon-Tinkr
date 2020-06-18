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

const getRubbishById = (rubbishId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Rubbish/${rubbishId}`)
    .then((result) => resolve(result.data))
    .catch((error) => reject(error));
});

export default { getProducts, getRubbishById };
