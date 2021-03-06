import axios from 'axios';
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
  },
  handleError(state, data) {
    state.alertMsg = data.msg;
  }
};

export const actions = {
  async create({state}) {
    let data = {
      name: state.carouselForm.name,
      images: state.carouselForm.images,
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
    } catch (e) {
      res = e.response;
    }
    if(!res.data.code) {
      commit('remove', idx);
    }

    return res.data;
  },
  async update({commit, state}) {
    let data = {
      name: state.carouselForm.name,
      images: state.carouselForm.images,
    };
    let res = null;
    try {
      res = await axios.put(`${routePath}/${state.carouselForm._id}`, data);
    } catch (e) {
      res = e.response;
    }
    if(!res.data.code) {
      commit('update', state.carouselForm._id);
    }
    return res.data;
  },
  async setStatus({commit}, {id, status}) {
    let res = null;
    try {
      res = await axios.put(`${routePath}/${id}`, {status: status});
    } catch (e) {
      res = e.response;
    }
    if(!res.data.code) {
      commit('update', id);
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
