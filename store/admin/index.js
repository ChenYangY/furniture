import axios from 'axios';
import _ from 'lodash';

export const  state = () => {
  return {};
};

export const actions = {
  // eslint-disable-next-line no-unused-vars
  async upload({state}, files) {
    let form = new FormData();
    _.each(files, (file, index) => {
      form.append(`file_${index}`, file);
    });
    let response = await axios.post('/admin-api/upload', form);
    return response.data;
  }
};
