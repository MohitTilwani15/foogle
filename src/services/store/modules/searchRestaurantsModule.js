import http from '../../http';
import { SEARCH_NEARBY_RESTAURANTS } from '../action-types';
import { SET_RESTAURANTS } from '../mutation-types';
import { searchVenues } from '../endpoints';

export default {
  namespaced: true,

  state: {
    restaurants: [],
  },

  getters: {
    getRestaurants: (state) => (pageNo, pageLimit) => state.restaurants.slice((pageLimit * pageNo) - pageLimit, pageLimit * pageNo),

    getTotalRestaurantsCount: state => state.restaurants.length,
  },

  mutations: {
    [SET_RESTAURANTS](state, response) {
      state.restaurants = response;
    },
  },

  actions: {
    [SEARCH_NEARBY_RESTAURANTS]({ commit }, params) {
      http.get(searchVenues, { params })
        .then((response) => {
          commit(SET_RESTAURANTS, response.data.venues);
        })
    },
  },
};
