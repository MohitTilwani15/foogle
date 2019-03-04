import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import userModule from './modules/userModule';
import searchRestaurantModule from './modules/searchRestaurantsModule';

const strict = process.env.NODE_ENV !== 'production';
const plugins = [];

if (process.env.NODE_ENV !== 'production') {
  plugins.push(createLogger());
}

const modules = {
  userModule,
  searchRestaurantModule,
};

Vue.use(Vuex);

export const store = new Vuex.Store({
  strict,
  plugins,
  modules,
});