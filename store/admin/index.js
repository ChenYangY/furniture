import axios from 'axios';

export const  state = () => {
  return {};
};

export const actions = {
  // eslint-disable-next-line no-unused-vars
  async upload({state}, file) {
    let form = new FormData();
    form.append('file', file);
    let response = await axios.post('/admin-api/upload', form);
    return response.data;
  }
};
