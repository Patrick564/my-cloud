<template>
  <input @keypress.enter="$emit('search', route)" v-model="route" type="search" />
</template>

<script>
export default {
  data() {
    return {
      route: '',
    };
  },

  emits: ['search'],
};
</script>
