<template>
  <div>
    <div>
      <search-bar @search="nextFolder"></search-bar>
      <back-button @back="previusFolder"></back-button>
      <info-button :route="path"></info-button>
    </div>

    <div v-if="load" id="content" class="content">
      <div>
        <p>Folders</p>
        <div v-for="(folder, key) of content.directories" :key="`folder[${key}]`">
          <div @dblclick="nextFolder(folder)" :id="folder">
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
        <create-folder @reload="getContent" :path="path"></create-folder>
      </div>
    </div>

    <div v-else>
      Loading content...
    </div>
  </div>
</template>

<script>
import Api from '../api/api';
import Search from './Search.vue';
import BackButton from './Back-button.vue';
import InfoButton from './Info-button.vue';
import UploadButton from './Upload-button.vue';
import CreateFolder from './Create-folder.vue';
import DeleteButton from './Delete-button.vue';

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
    async getContent(path = this.path) {
      try {
        const response = await apiInstance.getContent(path);
        this.content = response.content;
        this.path = response.path.relativePath;
        // this.success = response.success;
        this.load = true;
      } catch (error) {
        // this.message = error.response.data.message;
        // this.success = error.response.data.success;
        this.previusFolder();
      }
    },

    previusFolder() {
      const splited = this.path.split('/');
      const sliced = splited.slice(0, -1);
      this.path = sliced.join('/') ? sliced.join('/') : '/';
      this.getContent();
    },

    nextFolder(folderName) {
      // eslint-disable-next-line prefer-template
      this.path += this.path === '/' ? folderName : '/' + folderName;
      this.getContent();
    },
  },

  components: {
    'search-bar': Search,
    'back-button': BackButton,
    'info-button': InfoButton,
    'create-folder': CreateFolder,
    'upload-button': UploadButton,
    'delete-button': DeleteButton,
  },
};
</script>

<style scoped>
</style>
