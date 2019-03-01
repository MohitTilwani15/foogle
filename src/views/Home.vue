<template>
  <div>
     <ul class="collection with-header">
      <li class="collection-header">
        <h4>Restaurants</h4>
      </li>
      <li
        v-for="item in restaurants"
        :key="item.id"
        class="collection-item"
      >
        <div>
          {{ item.name }}
          <a
            href="#"
            class="secondary-content"
            @click="setFavorite(item.id)"
          >
            <i class="material-icons">send</i>
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { SEARCH_NEARBY_RESTAURANTS, SET_VENUE_AS_FAVORITE } from '../services/store/action-types';

export default {
  name: 'home',

  data() {
    return {
      location: {},
    };
  },

  computed: {
    ...mapGetters({
      restaurants: 'searchRestaurantModule/getRestaurants',
    }),
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
            limit: 10,
          });
        });
      } else {
        console.error('geolocation feature not supported')
      }
    },

    setFavorite(id) {
      this.$store.dispatch(`userModule/${SET_VENUE_AS_FAVORITE}`, { VENUE_ID: id, set: 1 });
    },
  },
};
</script>

<style>

</style>
