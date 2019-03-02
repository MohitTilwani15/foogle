<template>
  <div>
    <results
      title="Restaurants"
      :items="restaurants"
      :set-favorite="setFavorite"
    />

    <pagination
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
      location: {},
      pageNo: 1,
      pageLimit: 10,
    };
  },

  computed: {
    ...mapGetters({
      total: 'searchRestaurantModule/getTotalRestaurantsCount',
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
        navigator.geolocation.getCurrentPosition((position) => {
          this.location.latitude = position.coords.latitude;
          this.location.longitude = position.coords.longitude;
          this.$store.dispatch(`searchRestaurantModule/${SEARCH_NEARBY_RESTAURANTS}`, {
            ll: `${position.coords.latitude},${position.coords.longitude}`,
          });
        });
      } else {
        console.error('geolocation feature not supported')
      }
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
