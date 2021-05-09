import axios from 'axios';
const routePath = '/admin-api/product-brands';
export const state = () => ({
  fields: [
    {key: '_id',label: 'Id'},
    {key: 'name',label: '名称'},
    {key: 'logo',label: 'logo'},
    {key: 'description',label: '介绍'},
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
    const res = await axios.post(routePath, data);
    return res.data;
  },
  async remove({commit}, {id,idx}) {
    const res = await axios.delete(`${routePath}/${id}`);
    commit('remove', idx);
    return res.data;
  },
  async update({commit, state}) {
    let data = {
      name: state.brandForm.name,
      logo: state.brandForm.logo,
      description: state.brandForm.description,
    };
    const res = await axios.put(`${routePath}/${state.brandForm._id}`, data);
    commit('update', state.brandForm._id);
    return res.data;
  },
  async setStatus({commit}, {id, idx, status}) {
    const res = await axios.put(`${routePath}/${id}`, {status: status});
    commit('update', idx);
    return res.data;
  },
  async index({commit}, {page,size, sort}) {
    const res = await axios.get(`${routePath}?page=${page}&size=${size}&sort=${sort}`);
    commit('index', res.data.data);
    return res.data;
  }
};
