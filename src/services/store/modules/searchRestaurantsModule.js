import http from '../../http';
import { SEARCH_NEARBY_RESTAURANTS } from '../action-types';
import { SET_RESTAURANTS, SET_SORTED_RESTAURANTS } from '../mutation-types';
import { searchVenues } from '../endpoints';

const sort = function (prop, arr) {
  prop = prop.split('.');
  const len = prop.length;
  
  arr.sort(function (a, b) {
    let i = 0;
    while(i < len) {
      a = a[prop[i]];
      b = b[prop[i]];
      i += 1;
    }

    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  });
  return arr;
};

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

    [SET_SORTED_RESTAURANTS](state) {
      state.restaurants = sort('location.distance', state.restaurants)
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
