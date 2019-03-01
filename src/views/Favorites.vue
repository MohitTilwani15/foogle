<template>
  <div>
    Favorites
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { GET_USER_FAVORITE_VENUE } from '../services/store/action-types';

export default {
  name: 'favorites',

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
