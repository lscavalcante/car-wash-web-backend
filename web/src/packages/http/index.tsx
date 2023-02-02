import axios, { AxiosRequestConfig } from "axios";
import { toast } from "react-toastify";


const instance = axios.create({

  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
  validateStatus: function (status) {


    if (status === 401 || !localStorage.getItem('@carwash:key') == null) {
      localStorage.removeItem('@carwash:key');
      toast.error('Unauthorized')
      window.location.reload();
      window.location.href = '/';
    }

    return status >= 200 && status < 500
  }
});

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem('@carwash:key');

  if (token) {
    config.headers = {
      'Authorization': `Bearer ${token}`,
    }
  }
  // if (token) {
  //   instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  // }
  return config;
}, function (error) {
  return Promise.reject(error);
});

export default instance;


// https://thedutchlab.com/blog/using-axios-interceptors-for-refreshing-your-api-token
// AXIOS WITH INTERCEPTORS
// const axios = require('axios');
// const axiosApiInstance = axios.create();

// // Request interceptor for API calls
// axiosApiInstance.interceptors.request.use(
//   async config => {
//     const value = await redisClient.get(rediskey)
//     const keys = JSON.parse(value)
//     config.headers = { 
//       'Authorization': `Bearer ${keys.access_token}`,
//       'Accept': 'application/json',
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//     return config;
//   },
//   error => {
//     Promise.reject(error)
// });

// // Response interceptor for API calls
// axiosApiInstance.interceptors.response.use((response) => {
//   return response
// }, async function (error) {
//   const originalRequest = error.config;
//   if (error.response.status === 403 && !originalRequest._retry) {
//     originalRequest._retry = true;
//     const access_token = await refreshAccessToken();            
//     axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
//     return axiosApiInstance(originalRequest);
//   }
//   return Promise.reject(error);
// });

// const result = await axiosApiInstance.post(url, data)
