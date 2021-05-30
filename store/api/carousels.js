import axios from 'axios';
export const state = () => {
  return {
    carousels: []
  };
};

export const mutations = {
  index() {
    console.log('get carousel list');
  }
};

export const actions = {
  async index({commit}, data) {
    let res = await axios.get('/api/v1/carousels',{params: data});
    commit('index', res.data);
    return res.data;
  }
};




