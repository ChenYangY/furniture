import axios from 'axios';

export const state = () => ({
  menus: [{
    name: '品牌管理',
    path: './brands'
  },{
    name: '产品管理',
    path: './products'
  },{
    name: '轮播图管理',
    path: './carousels'
  }],
});

export const mutations = {
  login() {
    console.log('user logined');
  }
};

export const actions = {
  async login({commit}, data) {
    let res = null;
    try {
      res = await axios.post('/login', data);
    } catch(e) {
      res = e.response;
    }
    if(res.data.code === ' ok') {
      commit('login');
    }
    return res.data;
  }
};
