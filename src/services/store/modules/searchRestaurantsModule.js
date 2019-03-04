import http from '../../http';
import { SEARCH_NEARBY_RESTAURANTS, GET_VENUE_DETAILS } from '../action-types';
import { SET_RESTAURANTS, SET_SORTED_RESTAURANTS, SET_VENUE_DETAILS, RESET_VENUE_DETAILS } from '../mutation-types';
import { searchVenues, venueDetails } from '../endpoints';
import { sort } from '../../helpers';

export default {
  namespaced: true,

  state: {
    restaurants: [],
    venueDetails: {},
  },

  getters: {
    getRestaurants: (state) => (pageNo, pageLimit) => state.restaurants.slice((pageLimit * pageNo) - pageLimit, pageLimit * pageNo),

    getTotalRestaurantsCount: state => state.restaurants.length,

    getVenueDetails: state => state.venueDetails,
  },

  mutations: {
    [SET_RESTAURANTS](state, response) {
      state.restaurants = response;
    },

    [SET_SORTED_RESTAURANTS](state) {
      state.restaurants = sort('location.distance', state.restaurants)
    },

    [SET_VENUE_DETAILS](state, response) {
      state.venueDetails = response;
    },

    [RESET_VENUE_DETAILS](state) {
      state.venueDetails = {};
    },
  },

  actions: {
    [SEARCH_NEARBY_RESTAURANTS]({ commit }, params) {
      return new Promise((resolve) => {
        http.get(searchVenues, { params })
          .then((response) => {
            commit(SET_RESTAURANTS, response.data.venues);
            resolve();
          });
      });
    },

    [GET_VENUE_DETAILS]({ commit }, venueId) {
      return new Promise((resolve) => {
        http.get(`${venueDetails}/${venueId}`, { params: {}})
          .then((response) => {
            commit(SET_VENUE_DETAILS, response.data.venue);
            resolve();
          });
      });
    }
  },
};
