<template>
  <div />
</template>

<script>
import { GET_ACCESS_TOKEN } from '../services/store/action-types';

export default {
  name: 'callback',

  mounted() {
    this.$store.dispatch(`userModule/${GET_ACCESS_TOKEN}`, { code: this.$route.query.code })
      .then(() => {
        this.$router.replace({
          name: 'Home',
        });
      });
  },
};
</script>
