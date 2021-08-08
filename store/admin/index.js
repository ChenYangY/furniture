import axios from 'axios';
import _ from 'lodash';

export const  state = () => {
  return {
    isShowUploadLoading: false,
    uploadProgress: 0,
  };
};


export const mutations = {
  showUploadLoading(state, status) {
    state.isShowUploadLoading = status;
  },
  updateUploadProgress(state, progress) {
    state.uploadProgress = progress;
  }
};

export const actions = {
  // eslint-disable-next-line no-unused-vars
  async upload({commit}, files) {
    let form = new FormData();
    _.each(files, (file, index) => {
      form.append(`file_${index}`, file);
    });
    let response = null;
    commit('showUploadLoading', true);
    commit('updateUploadProgress', 0);
    try {
      response = await axios.post('/admin-api/upload', form, {
        responseType: 'json',
        onUploadProgress(event) {
          commit('updateUploadProgress', Math.floor((event.loaded/event.total)*100));
        }
      });
    } catch(e) {
      response = e.response;
    }
    commit('showUploadLoading', false);
    console.log(response);
    return response.data;
  }
};
