import axios from 'axios';

const API_BASEURL = 'https://cors-anywhere.herokuapp.com/https://api.foursquare.com/v2/';

const options = {
  baseURL: API_BASEURL,
  headers: {
    Accept: 'application/json',
  },
};

const instance = axios.create(options);

export default instance;
