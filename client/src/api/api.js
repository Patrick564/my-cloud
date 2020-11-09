import axios from 'axios';

class Api {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:5000',
    });
  }

  // getContent()
  async getContent(path) {
    const content = await this.api.get(`/content${path}`);

    return content.data;
  }

  // async makeFolder(path, folderName) {
  //   const content = await this.api.post(`/content${path}`, {
  //     name: '',
  //   });
  // }

  // async uploadFile(path, file) {}

  // async downloadContent(path, fileName) {}

  // async renameContent(path, oldName, newName) {}

  // async deleteContent(path, fileName) {}
}

export default Api;
