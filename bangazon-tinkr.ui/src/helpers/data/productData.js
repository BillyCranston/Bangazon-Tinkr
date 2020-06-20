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

const getCategories = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Rubbish/Categories`)
    .then((result) => resolve(result.data))
    .catch((err) => reject('error from GetCategories in productData', err));
})

const getProductsByCategory = (categoryId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Rubbish/Category/${categoryId}`)
    .then((result) => resolve(result.data))
    .catch((err) => reject('error in productData', err));
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

export default { getProducts, getCategories, getProductsByCategory, getRubbishById, getProductsByUserId };
