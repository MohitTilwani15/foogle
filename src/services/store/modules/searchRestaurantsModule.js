import http from '../../http';
import { SEARCH_NEARBY_RESTAURANTS } from '../action-types';
import { SET_RESTAURANTS } from '../mutation-types';
import { searchVenues } from '../endpoints';
import keys from '../../../config/keys';

export default {
  namespaced: true,

  state: {
    restaurants: [],
  },

  getters: {
    getRestaurants: state => state.restaurants,
  },

  mutations: {
    [SET_RESTAURANTS](state, response) {
      state.restaurants = response;
    },
  },

  actions: {
    [SEARCH_NEARBY_RESTAURANTS]({ commit }, params) {
      const apiParams = Object.assign({}, params);
      apiParams.client_id = keys.clientID;
      apiParams.client_secret = keys.clientSecret;
      apiParams.categoryId = '4d4b7105d754a06374d81259';
      apiParams.v = '20180915';

      http.get(searchVenues, { params: apiParams })
        .then((response) => {
          commit(SET_RESTAURANTS, response.data.response.venues);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
