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

const getProductsByUserId = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Rubbish/User/${userId}`)
    .then((result) => {
      const allRubbishByUser = result.data;
      resolve(allRubbishByUser);
    })
    .catch((err) => reject(err));
});

const getRubbishByName = (name) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Rubbish/Name/${name}`)
    .then((result) => {
      const rubName = result.data;
      resolve(rubName);
    })
    .catch((error) => reject(error));
});

export default {
  getProducts, getRubbishById, getProductsByUserId, getRubbishByName,
};
