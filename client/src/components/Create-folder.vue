<template>
  <div>
    <button @click="expand" type="button">+</button>
    <div v-if="show">
      <input @keypress.enter="makeFolder" type="text" v-model="name" />
    </div>
  </div>
</template>

<script>
import Api from '../api/api';

const apiInstance = new Api();

export default {
  data() {
    return {
      name: '',
      show: false,
    };
  },

  props: ['path'],

  emits: ['reload'],

  methods: {
    async makeFolder() {
      try {
        await apiInstance.makeFolder(this.path, this.name);
        this.$emit('reload');
      } catch (error) {
        console.log(error);
      }
    },

    expand() {
      this.show = !this.show;
    },
  },
};
</script>
