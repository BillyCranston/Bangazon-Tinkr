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
    // eslint-disable-next-line prefer-promise-reject-errors
    .catch((err) => reject('error from GetCategories in productData', err));
});

const getProductsByCategory = (categoryId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Rubbish/Category/${categoryId}`)
    .then((result) => resolve(result.data))
    // eslint-disable-next-line prefer-promise-reject-errors
    .catch((err) => reject('error in productData', err));
});

const getRubbishById = (rubbishId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Rubbish/${rubbishId}`)
    .then((result) => resolve(result.data))
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

const getRubbishByName = (name) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Rubbish/Name/${name}`)
    .then((result) => {
      const rubName = result.data;
      resolve(rubName);
    })
    .catch((error) => reject(error));
});

const getTotalSales = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Rubbish/User/${userId}/TotalSales`)
    .then((result) => {
      const totalSales = result.data;
      resolve(totalSales);
    })
    .catch((error) => reject(error));
});

const getTotalSalesThisMonth = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Rubbish/User/${userId}/SalesThisMonth`)
    .then((result) => {
      const totalSales = result.data;
      resolve(totalSales);
    })
    .catch((error) => reject(error));
});

const getAverageSaleByUserId = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Rubbish/User/${userId}/AverageSale`)
    .then((result) => {
      const avgSalePerItem = result.data;
      const roundedAvgSale = Math.round(avgSalePerItem, 2);
      resolve(roundedAvgSale);
    })
    .catch((error) => reject(error));
});

const getInventoryByUserId = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Rubbish/User/${userId}/Inventory`)
    .then((result) => resolve(result.data))
    .catch((err) => reject(err));
});

export default {
  getProducts,
  getCategories,
  getProductsByCategory,
  getRubbishById,
  getProductsByUserId,
  getRubbishByName,
  getTotalSales,
  getTotalSalesThisMonth,
  getAverageSaleByUserId,
  getInventoryByUserId,
};
