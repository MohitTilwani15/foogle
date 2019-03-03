<template>
  <div>
    <results
      v-if="isAuthenticated"
      title="Favorite Restaurants"
      :items="user.items"
    />

    <h3 v-else>
      Please login to see your favorites
    </h3>

    <loading :show="isAuthenticated && !user.items ? true : false" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { GET_USER_FAVORITE_VENUE } from '../services/store/action-types';
import Results from '../components/Results';
import Loading from '../components/Loading';

export default {
  name: 'favorites',

  components: {
    'results': Results,
    'loading': Loading,
  },

  computed: {
    ...mapGetters({
      user: 'userModule/getUser',
      isAuthenticated: 'userModule/isAuthenticated',
    }),
  },

  mounted() {
    if (this.isAuthenticated) {
      this.$store.dispatch(`userModule/${GET_USER_FAVORITE_VENUE}`, {});
    }
  },
};
</script>

<style>

</style>
