<template>
  <div>
    <input @change="update" type="file" ref="content" multiple>
    <button @click="sendFiles">Upload</button>
  </div>
</template>

<script>
import Api from '../api/api';

const apiInstance = new Api();

export default {
  data() {
    return {
      files: '',
    };
  },

  props: ['path'],

  emits: ['reload'],

  methods: {
    async sendFiles() {
      const data = new FormData();

      Object.keys(this.files).forEach((key) => {
        data.append('files', this.files[key]);
      });

      try {
        await apiInstance.uploadFile(this.path, data);
        this.$emit('reload');
      } catch (error) {
        console.log(error.response.data);
      }
    },

    update() {
      this.files = this.$refs.content.files;
    },
  },
};
</script>

<style scoped>
</style>
