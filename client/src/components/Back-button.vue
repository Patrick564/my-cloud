<template>
  <button @click="$emit('back')" type="button">Back</button>
</template>

<script>
export default {
  data() {
    return {};
  },

  emits: ['back'],
};
</script>
