import axios from 'axios';
const routePath = '/admin-api/carousels';
export const state = () => ({
  datas: [],
});

export const mutations = {
  async create(state, data) {
    return await axios.post(routePath, data);
  },
  async remove(state, id) {
    return await axios.delete(`${routePath}/${id}`);
  },
  async update(state, data) {
    return await axios.put(`${routePath}/${data.id}`, data);
  },
  async setStatus(state, data) {
    return await axios.put(`${routePath}/${data.id}`, {status: data.status});
  }
};
