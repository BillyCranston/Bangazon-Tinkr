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

const getOpenOrderByUserId = (userId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Order/OpenOrder/${userId}`)
    .then((result) => {
      const userOrder = result.data;
      resolve(userOrder);
    })
    .catch((err) => reject(err));
});

const getOpenUserOrder = (userIdObj) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/Order/userOpenOrder/`, userIdObj)
    .then((result) => {
      const userOrder = result.data;
      resolve(userOrder);
    })
    .catch((err) => reject(err));
});

const getCompletedOrderByProductId = (rubbishId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Order/Completed/Rubbish/${rubbishId}`)
    .then((result) => {
      const completedOrder = result.data;
      resolve(completedOrder);
    })
    .catch((err) => reject(err));
});

const getOrdersBySeller = (sellerId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/Order/History/${sellerId}`)
    .then((result) => resolve(result.data))
    .catch((err) => reject('error in orderData', err));
});

const addItemToOrder = (itemObj) => axios.post(`${baseUrl}/Order/AddItem`, itemObj);

const deleteLineItem = (lineItemId) => axios.delete(`${baseUrl}/Order/deleteItem/${lineItemId}`);

const completeOrder = (orderId) => axios.put(`${baseUrl}/Order/checkout/${orderId}`);

const updatePayment = (orderId, paymentId) => axios.put(`${baseUrl}/Order/${orderId}/updatePayment/${paymentId}`);

export default {
  getUserOrder,
  addItemToOrder,
  getOpenUserOrder,
  getOpenOrderByUserId,
  deleteLineItem,
  getCompletedOrderByProductId,
  getOrdersBySeller,
  completeOrder,
  updatePayment,
};
