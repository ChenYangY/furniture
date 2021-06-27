import axios from 'axios';
const routePath = '/admin-api/product-brands';
export const state = () => ({
  fields: [
    {key: '_id',label: 'Id'},
    {key: 'name',label: '名称'},
    {key: 'logo',label: 'logo'},
    // {key: 'description',label: '介绍'},
    {key: 'actions', label: '操作'}
  ],
  brandForm: {
    _id: '',
    name: '',
    logo: '',
    description: '',
  },
  totalRows: 10,
  datas: [],
});

export const mutations = {
  remove(state, idx) {
    state.datas.splice(idx, 1);
  },
  update(state, id) {
    let keys = ['name', 'logo', 'description'];
    let idx = -1;
    state.datas.forEach((item, index) => {
      if(item._id.toString() === id) {
        idx = index;
      }
    });
    keys.forEach((key)=> {
      state.datas[idx][key] = state.brandForm[key];
    });
  },
  index(state, data) {
    state.datas = data.docs;
    state.totalRows = data.count;
  },
  setBrandForm(state, data) {
    let fields = ['_id', 'name', 'logo', 'description'];
    fields.forEach((field) => {
      state.brandForm[field] = data[field];
    });
  }
};

export const actions = {
  async create({state}) {
    let data = {
      name: state.brandForm.name,
      logo: state.brandForm.logo,
      description: state.brandForm.description,
    };
    let res = null;
    try {
      res = await axios.post(routePath, data);
    } catch(e) {
      res = e.response;
    }
    return res.data;
  },
  async remove({commit}, {id,idx}) {
    let res = null;
    try {
      res = await axios.delete(`${routePath}/${id}`);
    } catch(e) {
      res = e.response;
    }
    if(!res.data.code) {
      commit('remove', idx);
    }

    return res.data;
  },
  async update({commit, state}) {
    let data = {
      name: state.brandForm.name,
      logo: state.brandForm.logo,
      description: state.brandForm.description,
    };
    let res = null;
    try {
      res = await axios.put(`${routePath}/${state.brandForm._id}`, data);
    } catch(e) {
      res = e.response;
    }
    if(!res.data.code) {
      commit('update', state.brandForm._id);
    }
    return res.data;
  },
  async setStatus({commit}, {id, idx, status}) {
    let res = null;
    try {
      res = await axios.put(`${routePath}/${id}`, {status: status});
    } catch(e) {
      res = e.response;
    }
    if(!res.data.code) {
      commit('update', idx);
    }
    return res.data;
  },
  async index({commit}, {page,size, sort}) {
    let res = null;
    try {
      res = await axios.get(`${routePath}?page=${page}&size=${size}&sort=${sort}`);
    } catch(e) {
      res = e.response;
    }
    if(!res.data.code) {
      commit('index', res.data.data);
    }
    return res.data;
  }
};
