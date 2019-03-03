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
    const reqConfig = JSON.parse(JSON.stringify(config));

    if (window.sessionStorage.getItem('access_token')) {
      reqConfig.params.oauth_token = window.sessionStorage.getItem('access_token');
    } else {
      reqConfig.params.client_id = keys.clientID;
      reqConfig.params.client_secret = keys.clientSecret;
    }
  
    reqConfig.params.categoryId = '4d4b7105d754a06374d81259';
    reqConfig.params.v = '20180915';
  
    return reqConfig;
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
