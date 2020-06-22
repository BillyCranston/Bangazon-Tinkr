import axios from 'axios';

import apiKeys from '../apiKeys.json';
import userData from './userData';

const baseUrl = apiKeys.databaseURL;

const getUserOrder = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Order/${userId}`)
    .then((result) => {
      const userOrder = result.data;
      resolve(userOrder);
    })
    .catch((err) => reject(err));
});

const getOpenOrderByUserId = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Order/OpenOrder/${userId}`)
    .then((result) => {
      const userOrder = result.data;
      resolve(userOrder);
    })
    .catch((err) => reject(err));
})

const getOpenUserOrder = (userIdObj) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/Order/userOpenOrder/`, userIdObj)
    .then((result) => {
      const userOrder = result.data;
      resolve(userOrder);
    })
    .catch((err) => reject(err));
});

const addItemToOrder = (itemObj) => axios.post(`${baseUrl}/Order/AddItem`, itemObj);

export default {
  getUserOrder,
  addItemToOrder,
  getOpenUserOrder,
  getOpenOrderByUserId,
};
