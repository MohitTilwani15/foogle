<template>
  <div v-if="items && items.length">
     <ul class="collection with-header">
      <li class="collection-header">
        <h4>{{ title }}</h4>
      </li>
      <li
        v-for="item in items"
        :key="item.id"
        class="collection-item"
      >
        <div>
          {{ item.name }}<br>
          {{ item.location.address }}<br>
          <strong>{{ item.location.distance | validDistance }}</strong>
          <a
            v-if="setFavorite"
            href="#"
            class="secondary-content"
            @click="setFavorite(item.id)"
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
  },

  filters: {
    validDistance(value) {
      if (value) {
        return `${value / 1000} KM`;
      }
    }
  },
};
</script>

