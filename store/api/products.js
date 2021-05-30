import axios from 'axios';
export const state = () => {
  return {
    products: [],
    product: '',
  };
};

export const mutations = {
  index() {
    console.log('get product list');
  },
  show(state, id) {
    state.product = id;
    console.log(`get product ${id} detail`);
  }
};

export const actions = {
  async index({commit}, data) {
    let res = await axios.get('/api/v1/products',{params: data});
    commit('index', res.data);
    return res.data;
  },
  async show({commit}, id) {
    let res = await axios.get(`/api/v1/products/${id}`);
    commit('show', id);
    return res.data;
  }
};




