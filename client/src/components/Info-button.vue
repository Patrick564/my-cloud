<template>
  <div>
    <button @click="showInfo" type="button">i</button>
    <span v-if="show">{{ route }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },

  props: ['route'],

  methods: {
    showInfo() {
      this.show = !this.show;
    },
  },
};
</script>
