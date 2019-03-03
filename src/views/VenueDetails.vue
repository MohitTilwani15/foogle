<template>
  <div>
    <div v-if="!showLoader" class="row">
      <div class="col s6">
        <img
          :src="imageUrl"
          class="materialboxed"
          :data-caption="venueDetails.description"
        />
      </div>
      <div class="col s6">
        <p>{{ venueDetails.description }}</p>
        <dl class="definition-list">
          <dt>Price:</dt>
          <dd>{{ venueDetails.price.message }}</dd>

          <dt>Likes:</dt>
          <dd>{{ venueDetails.likes.count }}</dd>

          <dt>Website Link:</dt>
          <dd>{{ venueDetails.url }}</dd>
        </dl>
      </div>
    </div>
    <loading :show="showLoader" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import Loading from '../components/Loading';
import { GET_VENUE_DETAILS } from '../services/store/action-types';
import { RESET_VENUE_DETAILS } from '../services/store/mutation-types';

export default {
  name: 'VenueDetails',

  components: {
    'loading': Loading,
  },

  data() {
    return {
      showLoader: false,
    };
  },

  created() {
    this.showLoader = true;
    const venueId = this.$route.params.id;

    this.$store.dispatch(`searchRestaurantModule/${GET_VENUE_DETAILS}`, venueId)
      .then(() => {
        this.showLoader = false;
        this.$nextTick(() => {
          this.initializeIamge();
        });
      })
      .catch(() => {
        this.showLoader = false;
      });
  },

  beforeDestroy() {
    this.resetVenueDetails();
  },

  computed: {
    ...mapGetters({
      venueDetails: 'searchRestaurantModule/getVenueDetails',
    }),

    imageUrl() {
      return this.venueDetails.photos.groups[1].items[0].prefix + '300x500' + this.venueDetails.photos.groups[1].items[0].suffix;
    }
  },

  methods: {
    ...mapMutations({
      resetVenueDetails: `searchRestaurantModule/${RESET_VENUE_DETAILS}`,
    }),

    initializeIamge() {
      const elems = document.querySelectorAll('.materialboxed');
      window.M.Materialbox.init(elems, {});
    },
  },
};
</script>
<style>
.definition-list {
  margin: 10px 0;
}

.definition-list dt {
  display: block;
  margin: 0 10px 0 0;
  float: left;
  clear: left;
  font-weight: bold;
}

.definition-list dd {
  display: block;
  margin: 0 40px 0 0;
  float: left;
}
</style>

