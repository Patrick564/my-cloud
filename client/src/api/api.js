import axios from 'axios';

class Api {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:5000',
    });
  }

  async getContent(path) {
    const content = await this.api.get(`/content${path}`);

    return content.data;
  }

  async makeFolder(path, folderName) {
    const response = await this.api.post(`/content${path}`, {
      name: folderName,
    });

    return response.data;
  }

  async uploadFile(path, files) {
    const response = await this.api.post(`/upload${path}`, files, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  }

  // async downloadContent(path, fileName) {
  //   const request = await this.api.post(`/download${path}`, {
  //     name: fileName,
  //   });

  //   return request.data;
  // }

  // async renameContent(path, oldName, newName) {}

  async deleteContent(path, fileName) {
    const response = await this.api.delete(`/content${path}`, {
      data: {
        name: fileName,
      },
    });

    return response.data;
  }
}

export default Api;
