<template>
  <div v-if="items && items.length" :style="{cursor: 'pointer'}">
     <ul class="collection with-header">
      <li class="collection-header">
        <h4>{{ title }}</h4>
      </li>
      <li
        v-for="item in items"
        :key="item.id"
        class="collection-item"
        @click="onResultClick(item.id)"
      >
        <div>
          {{ item.name }}<br>
          <a target="__blank" @click.stop :href="googleMapsUrl(item.location.lat, item.location.lng)">{{ item.location.address }}</a><br>
          <strong>{{ item.location.distance | validDistance }}</strong>
          <a
            v-if="setFavorite"
            href="#"
            class="secondary-content"
            @click.stop="setFavorite(item.id)"
          >
            <i class="material-icons">star_border</i>
          </a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'results',

  props: {
    title: {
      type: String,
    },
    items: {
      type: Array,
    },
    setFavorite: {
      type: Function,
    },
    onResultClick: {
      type: Function,
    },
  },

  filters: {
    validDistance(value) {
      if (value) {
        return `${value / 1000} KM`;
      }
    }
  },

  methods: {
    googleMapsUrl(latitude, longitude) {
      return `http://maps.google.com/maps?q=${latitude},${longitude}`;
    },
  },
};
</script>
