<template>
  <div>
    <div
      v-if="locationError"
      class="row"
    >
      <form class="col s12" v-on:submit.prevent="fetchRestaurantsFromUserInput">
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

    <div
      v-show="restaurants.length"
      class="input-field col s12"
    >
      <select v-model="sort" @change="onSortChange">
        <option value="" disabled selected>Choose your option</option>
        <option value="distance">Distance</option>
      </select>
      <label>Sort By</label>
    </div>

    <results
      :on-result-click="seeVenueDetails"
      title="Restaurants"
      :items="restaurants"
      :set-favorite="setFavorite"
    />

    <pagination
      v-if="restaurants.length"
      :next="next"
      :prev="prev"
    />

    <loading :show="showLoader" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { SEARCH_NEARBY_RESTAURANTS, SET_VENUE_AS_FAVORITE } from '../services/store/action-types';
import { SET_SORTED_RESTAURANTS } from '../services/store/mutation-types';
import Results from '../components/Results';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';

export default {
  name: 'home',

  components: {
    'results': Results,
    'pagination': Pagination,
    'loading': Loading,
  },

  data() {
    return {
      pageNo: 1,
      pageLimit: 10,
      locationError: false,
      location: '',
      sort: this.$route.query.sort,
      showLoader: false,
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

  created() {
    this.getUserLocation();
  },

  mounted() {
    this.initializeSelect();
  },

  methods: {
    ...mapMutations({
      sortRestaurants: `searchRestaurantModule/${SET_SORTED_RESTAURANTS}`,
    }),

    getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.fetchRestaurants, this.handlePositionError);
      } else {
        throw new Error('Geolocation feature not suported');
      }
    },

    initializeSelect() {
      const elems = document.querySelectorAll('select');
      window.M.FormSelect.init(elems, {});
    },

    onSortChange(e) {
      this.$router.push({
        name: this.$route.name,
        query: { sort: e.target.value }
      });

      this.sortRestaurants();
    },

    fetchRestaurants(position) {
      this.showLoader = true;
      this.$store.dispatch(`searchRestaurantModule/${SEARCH_NEARBY_RESTAURANTS}`, {
        ll: `${position.coords.latitude},${position.coords.longitude}`,
      }).then(() => {
        if (this.sort) {
          this.sortRestaurants();
        }

        this.showLoader = false;
      }).catch(() => {
        this.showLoader = false;
      });
    },

    fetchRestaurantsFromUserInput() {
      this.showLoader = true;
      this.$store.dispatch(`searchRestaurantModule/${SEARCH_NEARBY_RESTAURANTS}`, {
        near: this.location,
      }).then(() => {
        if (this.sort) {
          this.sortRestaurants();
        }

        this.showLoader = false;
      }).catch(() => {
        this.showLoader = false;
      });
    },

    handlePositionError() {
      this.locationError = true;
    },

    setFavorite(id) {
      if (this.isAuthenticated) {
        this.$store.dispatch(`userModule/${SET_VENUE_AS_FAVORITE}`, { VENUE_ID: id, set: 1 })
          .then(() => {
            window.M.toast({html: 'Added to favorites', classes: 'rounded'});
          });
      } else {
         window.M.toast({html: 'Please login to set favorites', classes: 'rounded'});
      }
    },

    seeVenueDetails(id) {
      this.$router.push({
        name: 'Venue Details',
        params: {
          id,
        },
      });
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
