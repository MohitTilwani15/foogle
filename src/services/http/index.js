import axios from 'axios';
import keys from '../../config/keys';

const API_BASEURL = 'https://cors-anywhere.herokuapp.com/https://api.foursquare.com/v2/';

const options = {
  baseURL: API_BASEURL,
  headers: {
    Accept: 'application/json',
  },
};

const instance = axios.create(options);

function requestInterceptor(config) {
  try {
    if (window.sessionStorage.getItem('access_token')) {
      config.params.oauth_token = window.sessionStorage.getItem('access_token');
    } else {
      config.params.client_id = keys.clientID;
      config.params.client_secret = keys.clientSecret;
    }
  
    config.params.categoryId = '4d4b7105d754a06374d81259';
    config.params.v = '20180915';
  
    return config;
  } catch (err) {
    return config;
  }
}

function responseInterceptor(response) {
  const interceptedResponse = {};

  /* istanbul ignore else */
  if (response.data && response.data.response) {
    interceptedResponse.data = response.data.response;
  }

  interceptedResponse.headers = response.headers;
  interceptedResponse.status = response.status;
  interceptedResponse.statusText = response.statusText;

  return interceptedResponse;
}

instance.interceptors.request.use(requestInterceptor, Promise.reject);
instance.interceptors.response.use(responseInterceptor, Promise.reject);

export default instance;
