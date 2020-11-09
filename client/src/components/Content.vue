<template>
  <div>
    <top-buttons :previusFolder="previusFolder"></top-buttons>

    <div v-if="load" id="content" class="content">
      <div>
        <p>Folders</p>
        <div v-for="(folder, key) of content.directories" :key="`folder[${key}]`">
          <div @dblclick="nextFolder(folder)" :id="folder">
            {{ folder }}
          </div>
        </div>
      </div>

      <div>
        <p>Files</p>
        <div v-for="(file, key) of content.files" :key="`file[${key}]`">
          <div :id="file">
            {{ file }}
          </div>
        </div>
      </div>

      <bot-buttons></bot-buttons>
    </div>

    <div v-else>
      Loading content...
    </div>
  </div>
</template>

<script>
import Api from '../api/api';
import TopButtons from './Top-buttons.vue';
import BotButtons from './Bottom-buttons.vue';

const apiInstance = new Api();

export default {
  data() {
    return {
      load: false,
      content: {},
      errors: '',
      path: '',
    };
  },

  mounted() {
    setInterval(() => {
      this.getContent();
    }, 1000);
  },

  methods: {
    async getContent() {
      try {
        const response = await apiInstance.getContent(this.path);
        this.content = response.content;
        this.path = response.path.relativePath;
        this.load = true;
      } catch (error) {
        this.errors = error.message;
      }
    },

    previusFolder() {
      const splited = this.path.split('/');
      const sliced = splited.slice(0, -1);
      this.path = sliced.join('/') ? sliced.join('/') : '/';
      console.log(this.path);
      this.getContent(this.path);
    },

    nextFolder(folderName) {
      // eslint-disable-next-line prefer-template
      this.path += this.path === '/' ? folderName : '/' + folderName;
      this.getContent(this.path);
    },
  },

  components: {
    'top-buttons': TopButtons,
    'bot-buttons': BotButtons,
  },
};
</script>

<style scoped>
</style>
