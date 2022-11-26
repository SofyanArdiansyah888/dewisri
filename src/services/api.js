/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import { baseUrl } from '../utils/constant';

const token = "1|Pbc4ZVuqabFPLR4VHRxvDS5UAweWRmEGIQlch4mJ";
const defaults = {
  baseURL: baseUrl,
  headers: () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`//getStoredAuthToken() ? `Bearer ${getStoredAuthToken()}` : undefined,
  }),
  error: {
    code: 'INTERNAL_ERROR',
    message: 'Something went wrong. Please check your internet connection or contact our support.',
    status: 503,
    data: {},
  },
};

const api = (method, url, variables) =>
  new Promise((resolve, reject) => {
    axios({
      url: `${defaults.baseURL}${url}`,
      method,
      headers: defaults.headers(),
      params: method === 'get' ? variables : undefined,
      data: method !== 'get' ? variables : undefined,
    //   paramsSerializer: objectToQueryString,
    }).then(
      response => {
        resolve(response.data);
      },
      error => {
        
        if (error.response) {
          if(error.response.data.data)
            reject(error.response.data.data.message);
          else
          
          reject(error.response.data.message);
          // if (error.response.data.meta.status === 405) {
          //   // removeStoredAuthToken();
          //   history.push('/register');
          // }
        } else {
          reject(defaults.error);
        }
      },
    );
  });


export default {
  get: (...args) => api('get', ...args),
  post: (...args) => api('post', ...args),
  put: (...args) => api('put', ...args),
  patch: (...args) => api('patch', ...args),
  delete: (...args) => api('delete', ...args)
};