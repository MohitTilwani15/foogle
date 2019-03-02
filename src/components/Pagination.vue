<template>
  <ul class="pagination">
    <li class="waves-effect">
      <a @click="prev">
        <i class="material-icons">chevron_left</i>
      </a>
    </li>
    <li class="waves-effect">
      <a @click="next">
        <i class="material-icons">chevron_right</i>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'pagination',

  props: {
    prev: {
      type: Function,
      default: () => {},
      required: true,
    },
    next: {
      type: Function,
      default: () => {},
      required: true,
    },
  },
};
</script>

