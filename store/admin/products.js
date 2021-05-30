import axios from 'axios';
import _ from 'lodash';
const routePath = '/admin-api/products';
export const state = () => ({
  datas: [],
  total: 0,
  fields: [
    // {key: '_id',label: 'Id'},
    {key: 'name',label: '名称'},
    {key: 'brand',label: '品牌'},
    {key: 'tags', label: '分类'},
    {key: 'dimensions',label: '尺寸'},
    {key: 'material',label: '材料'},
    // {key: 'description',label: '介绍'},
    {key: 'actions', label: '操作'}
  ],
  productForm: {
    _id: '',
    name: '',
    brand: null,
    tags: [],
    description: '',
    images: [],
    dimensions: '',
    material: ''
  }
});

export const mutations = {
  index(state, data) {
    state.datas = data.docs;
    state.totalRows = data.count;
  },
  remove(state, idx) {
    state.datas.splice(idx, 1);
  },
  update(state, id) {
    let keys = ['_id', 'name', 'dimensions', 'description', 'material', 'brand', 'tags', 'images'];
    let idx = -1;
    state.datas.forEach((item, index) => {
      if(item._id.toString() === id) {
        idx = index;
      }
    });
    keys.forEach((key)=> {
      state.datas[idx][key] = state.productForm[key];
    });
  },
  setProductForm(state, data) {
    let fields = ['_id', 'name', 'dimensions', 'description', 'material', 'brand', 'tags', 'images'];
    console.log(data);
    fields.forEach((field) => {
      state.productForm[field] = data[field];
    });
  }
};

export const actions = {
  async create({state}) {
    let fields = ['name', 'dimensions', 'description', 'material', 'brand', 'tags', 'images'];
    let data = _.pick(state.productForm, fields);
    console.log(data);
    const res = await axios.post(routePath, data);
    return res.data;
  },
  async remove({commit}, {id,idx}) {
    const res = await axios.delete(`${routePath}/${id}`);
    commit('remove', idx);
    return res.data;
  },
  async update({commit, state}) {
    let fields = ['name', 'dimensions', 'description', 'material', 'brand', 'tags', 'images'];
    let data = _.pick(state.productForm, fields);
    const res = await axios.put(`${routePath}/${state.productForm._id}`, data);
    commit('update', state.productForm._id);
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


