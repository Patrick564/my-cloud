<template>
  <button @click="deleteContent">Delete</button>
</template>

<script>
import Api from '../api/api';

const apiInstance = new Api();

export default {
  data() {
    return {};
  },

  props: ['name', 'path'],

  emits: ['reload'],

  methods: {
    async deleteContent() {
      try {
        await apiInstance.deleteContent(this.path, this.name);
        this.$emit('reload');
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
  },
};
</script>

<style scoped>
</style>
