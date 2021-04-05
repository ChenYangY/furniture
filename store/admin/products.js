import axios from '../../plugins/axios';
const routePath = 'admin-api/products';
export const state = () => ({
  products: [],
  total: 0,
});

export const mutations = {
  create(state, data) {
    axios.post(`${routePath}`, data, (err, data) => {
      if(err) console.log(err.toString());
      console.log(data);
    });
  },

  index(state, query, pagination) {
    let keys=Object.keys(query);
    let urlParams = keys.map((key) => {
      return `${key}=${encodeURIComponent(query[key])}`;
    });
    urlParams.push(`page=${pagination.page}&size=${pagination.size}`);
    axios.get(`${routePath}?${urlParams.join('&')}`, (err, response) => {
      state.products = response.data.docs;
      state.total = response.data.count;
    });
  }

};


