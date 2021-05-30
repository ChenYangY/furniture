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
    let res = await axios.post('/login', data);
    if(res.data.msg === ' ok') {
      commit('login');
      return 0;
    }
    return -1;
  }
};
