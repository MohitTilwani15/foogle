import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeRoute from './route.home';
import FavoritesRoute from './route.favorites';
import CallbackRoute from './route.redirect';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [HomeRoute, FavoritesRoute, CallbackRoute],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { selector: to.hash };
    }
    return savedPosition || { x: 0, y: 0 };
  },
});
