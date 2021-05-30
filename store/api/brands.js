import axios from 'axios';
export const state = () => {
  return {
    brands: []
  };
};

export const mutations = {
  index() {
    console.log('get brand list');
  }
};

export const actions = {
  async index({commit}, data) {
    let res = await axios.get('/api/v1/brands',{params: data});
    commit('index', res.data);
    return res.data;
  }
};




