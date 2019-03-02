<template>
  <div>

    <div v-if="locationError" class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field col s6">
            <i class="material-icons prefix">location_on</i>
            <input id="icon_prefix" type="text" v-model="location">
            <label for="icon_prefix">location</label>
            <a class="waves-effect waves-light btn-large" @click="fetchRestaurantsFromUserInput">Button</a>
          </div>
        </div>
      </form>
    </div>

    <results
      title="Restaurants"
      :items="restaurants"
      :set-favorite="setFavorite"
      :is-authenticated="isAuthenticated"
    />

    <pagination
      v-if="restaurants.length"
      :next="next"
      :prev="prev"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { SEARCH_NEARBY_RESTAURANTS, SET_VENUE_AS_FAVORITE } from '../services/store/action-types';
import Results from '../components/Results';
import Pagination from '../components/Pagination';
// import Loading from '../components/Loading';

export default {
  name: 'home',

  components: {
    'results': Results,
    'pagination': Pagination,
  },

  data() {
    return {
      pageNo: 1,
      pageLimit: 10,
      locationError: false,
      location: '',
    };
  },

  computed: {
    ...mapGetters({
      total: 'searchRestaurantModule/getTotalRestaurantsCount',
      isAuthenticated: 'userModule/isAuthenticated',
    }),

    restaurants() {
      return this.$store.getters['searchRestaurantModule/getRestaurants'](this.pageNo, this.pageLimit);
    },
  },

  mounted() {
    this.getUserLocation();
  },

  methods: {
    getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.fetchRestaurants, this.handlePositionError);
      } else {
        throw new Error('Geolocation feature not suported');
      }
    },

    fetchRestaurants(position) {
      this.$store.dispatch(`searchRestaurantModule/${SEARCH_NEARBY_RESTAURANTS}`, {
        ll: `${position.coords.latitude},${position.coords.longitude}`,
      });
    },

    fetchRestaurantsFromUserInput() {
      this.$store.dispatch(`searchRestaurantModule/${SEARCH_NEARBY_RESTAURANTS}`, {
        near: this.location,
      });
    },

    handlePositionError() {
      this.locationError = true;
    },

    setFavorite(id) {
      this.$store.dispatch(`userModule/${SET_VENUE_AS_FAVORITE}`, { VENUE_ID: id, set: 1 });
    },

    prev() {
      if (this.pageNo > 1) {
        this.pageNo -= 1;
      }
    },

    next() {
      if ((this.total / this.pageLimit) > this.pageNo) {
        this.pageNo += 1;
      }
    },
  },
};
</script>

<style>

</style>
