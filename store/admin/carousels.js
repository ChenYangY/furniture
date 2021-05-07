import axios from 'axios';
import { BIconFileEarmarkSlides } from 'bootstrap-vue';
const routePath = '/admin-api/carousels';
export const state = () => ({
  fields: [
    {key: '_id',label: 'Id'},
    {key: 'name',label: '名称'},
    {key: 'status',label: '状态'},
    {key: 'create_at', label: '创建时间'},
    {key: 'update_at', label: '更新时间'},
    {key: 'actions', label: '操作'}
  ],
  carouselForm: {
    _id: '',
    name: '',
    images: []
  },
  totalRows: 10,
  datas: [],
});

export const mutations = {
  remove(state, idx) {
    state.datas.splice(idx, 1);
  },
  update(state, id) {
    let keys = ['images', 'name'];
    let idx = -1;
    state.datas.forEach((item, index) => {
      if(item._id.toString() === id) {
        idx = index;
      }
    });
    keys.forEach((key)=> {
      state.datas[idx][key] = state.carouselForm[key];
    });
  },
  setStatus(state, {idx, status}) {
    state.datas[idx].status = status;
  },
  index(state, data) {
    state.datas = data.docs;
    state.totalRows = data.count;
  },
  setCarouselForm(state, data) {
    let fields = ['_id', 'name', 'images'];
    fields.forEach((field) => {
      state.carouselForm[field] = data[field];
    });
  }
};

export const actions = {
  async create({state}) {
    let data = {
      name: state.carouselForm.name,
      images: state.carouselForm.images,
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
      name: state.carouselForm.name,
      images: state.carouselForm.images,
    };
    const res = await axios.put(`${routePath}/${state.carouselForm._id}`, data);
    commit('update', state.carouselForm._id);
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
