<template>
  <results
    title="Favorite Restaurants"
    :items="user.items"
  />
</template>

<script>
import { mapGetters } from 'vuex';
import { GET_USER_FAVORITE_VENUE } from '../services/store/action-types';
import Results from '../components/Results';
import Loading from '../components/Loading';

export default {
  name: 'favorites',

  components: {
    'loading': Loading,
    'results': Results,
  },

  computed: {
    ...mapGetters({
      user: 'userModule/getUser',
    }),
  },

  mounted() {
    this.$store.dispatch(`userModule/${GET_USER_FAVORITE_VENUE}`, {});
  },
};
</script>

<style>

</style>
