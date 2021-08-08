import axios from 'axios';
import _ from 'lodash';
const routePath = '/admin-api/products';
export const state = () => ({
  datas: [],
  totalRows: 0,
  batchImportProgress: 0,
  isShowBatchLoading: false,
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
    fields.forEach((field) => {
      state.productForm[field] = data[field];
    });
  },
  batchImport() {
    console.log('batch-import zip file');
  },
  updateProgress(state, progess) {
    state.batchImportProgress = progess;
  },
  showBatchLoading(state, status) {
    state.isShowBatchLoading = status;
  }
};

export const actions = {
  async create({state}) {
    let fields = ['name', 'dimensions', 'description', 'material', 'brand', 'tags', 'images'];
    let data = _.pick(state.productForm, fields);
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
    let fields = ['name', 'dimensions', 'description', 'material', 'brand', 'tags', 'images'];
    let data = _.pick(state.productForm, fields);
    let res = null;
    try {
      res = await axios.put(`${routePath}/${state.productForm._id}`, data);
    } catch(e) {
      res = e.response;
    }
    if(!res.data.code) {
      commit('update', state.productForm._id);
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
  },
  async batchImport({commit}, file) {
    let form = new FormData();
    form.append('file', file);
    let res = null;
    try {
      commit('updateProgress', 0);
      commit('showBatchLoading', true);
      res = await axios.post(`${routePath}/batch-import`, form, {
        onUploadProgress(event) {
          commit('updateProgress', Math.floor((event.loaded/event.total)*100));
        },
      });
    } catch(e) {
      res = e.response;
    }
    commit('showBatchLoading', false);
    if(!res.data.code) {
      commit('batchImport');
    }
    return res.data;
  }
};


