<template>
  <div>
    <div>
      <input type="search" name="search" id="search">
    </div>
    <div>
      <button @click="previusFolder" type="button">Back</button>
      <button type="">i</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  props: [
    'previusFolder',
  ],
};
</script>
