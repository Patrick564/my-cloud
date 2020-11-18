<template>
  <div>
    <div>
      <search-bar @search="next"></search-bar>
      <back-button @back="previus"></back-button>
      <info-button :route="path"></info-button>
    </div>

    <div v-if="load" id="content" class="content">
      <div>
        <p>Folders</p>
        <div v-for="(folder, key) of content.directories" :key="`folder[${key}]`">
          <div @dblclick="next(folder)" :id="folder">
            {{ folder }}
            <delete-button @reload="getContent" :path="path" :name="folder"></delete-button>
          </div>
        </div>
      </div>

      <div>
        <p>Files</p>
        <div v-for="(file, key) of content.files" :key="`file[${key}]`">
          <div :id="file">
            {{ file }}
            <delete-button @reload="getContent" :path="path" :name="file"></delete-button>
          </div>
        </div>
      </div>

      <div>
        <upload-button @reload="getContent" :path="path"></upload-button>
        <create-button @reload="getContent" :path="path"></create-button>
      </div>
    </div>

    <div v-else>
      Loading content...
    </div>
  </div>
</template>

<script>
import SearchBar from './Search-bar.vue';
import BackButton from './Back-button.vue';
import InfoButton from './Info-button.vue';
import UploadButton from './Upload-button.vue';
import CreateButton from './Create-button.vue';
import DeleteButton from './Delete-button.vue';

import Api from '../api/api';

const apiInstance = new Api();

export default {
  data() {
    return {
      load: false,
      content: {},
      path: '',
    };
  },

  created() {
    this.getContent();

    setInterval(() => { this.getContent(); }, 3500);
  },

  methods: {
    async getContent() {
      try {
        const response = await apiInstance.getContent(this.path);
        this.content = response.content;
        this.path = response.path.relativePath;
        this.load = true;
      } catch (error) {
        if (!error.response.data.success) {
          this.previus();
        } else {
          this.message = error.response.data.message;
        }
      }
    },

    previus() {
      const splited = this.path.split('/');
      const sliced = splited.slice(0, -1);
      this.path = sliced.join('/') ? sliced.join('/') : '/';
      this.getContent();
    },

    next(folderName) {
      // eslint-disable-next-line prefer-template
      this.path += this.path === '/' ? folderName : '/' + folderName;
      this.getContent();
    },
  },

  components: {
    'search-bar': SearchBar,
    'back-button': BackButton,
    'info-button': InfoButton,
    'create-button': CreateButton,
    'upload-button': UploadButton,
    'delete-button': DeleteButton,
  },
};
</script>

<style scoped>
</style>
