import axios from 'axios';
import http from '../../http';
import { GET_USER_FAVORITE_VENUE, GET_ACCESS_TOKEN, SET_VENUE_AS_FAVORITE } from '../action-types';
import { SET_USER } from '../mutation-types';
import keys from '../../../config/keys';

export default {
  namespaced: true,

  state: {
    user: {},
  },

  getters: {
    getUser: state => state.user,
  },

  mutations: {
    [SET_USER](state, response) {
      state.user = response;
    },
  },

  actions: {
    [GET_USER_FAVORITE_VENUE]({ commit }, params) {
      const apiParams = Object.assign({}, params);
      apiParams.oauth_token = window.sessionStorage.getItem('access_token');
      apiParams.categoryId = '4d4b7105d754a06374d81259';
      apiParams.v = '20180915';

      http.get('users/self/venuelikes', { params: apiParams })
        .then((response) => {
          commit(SET_USER, response.data.response.venues);
        });
    },

    [SET_VENUE_AS_FAVORITE](context, params) {
      const apiParams = Object.assign({}, params);
      apiParams.oauth_token = window.sessionStorage.getItem('access_token');
      apiParams.v = '20180915';

      return new Promise((resolve) => {
        http.post(`venues/${params.VENUE_ID}/like`, apiParams)
        .then(() => {
          resolve();
        });
      });
    },

    [GET_ACCESS_TOKEN](context, params) {
      return new Promise((resolve) => {
        const apiParams = Object.assign({}, params);
        apiParams.client_id = keys.clientID;
        apiParams.client_secret = keys.clientSecret;
        apiParams.grant_type = 'authorization_code'
        apiParams.redirect_uri = 'http://localhost:8080/auth/callback';
  
        axios.get('https://cors-anywhere.herokuapp.com/https://foursquare.com/oauth2/access_token', { params: apiParams })
          .then((response) => {
            window.sessionStorage.setItem('access_token', response.data.access_token);
            resolve();
          });
      });
    },
  },
}