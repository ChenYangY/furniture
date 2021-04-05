<template>
  <div>
    <AdminBar/>
    <b-container fluid='xs'>
      <b-row>
        <b-col class='col-3' type='dark' variant='dark'>
          <AdminMenu :menus="menus" :current="current" />
        </b-col>
        <b-col>
          <b-table :items="datas" :fields="fields" :busy.sync="isBusy"></b-table>
          <b-pagination
            v-model="pagination.cur"
            :total-rows="pagination.total"
            :per-page="pagination.size"
            first-text="首页"
            prev-text="前一页"
            next-text="下一页"
            last-text="尾页"
            align="center"
            v-on:change="changePage"
          ></b-pagination>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// import { mapState } from 'vuex';
import AdminBar from '../../components/admin/bar';
import _ from 'lodash';
import AdminMenu from '../../components/admin/menu';
import axios from 'axios';
export default {
  components: {AdminBar, AdminMenu},
  data() {
    return {
      menus: this.$store.state.menus,
      current: '产品管理',
      datas: [
        {_id: '1234', name: '12378921', brand: '1234'},
        {_id: '1234', name: '12378921', brand: '1234'}
      ],
      pagination: {
        cur: 1,
        size: 20,
        total: 50
      },
      isBusy: false,
      fields: [
        {key: '_id',label: 'Id'},
        {key: 'name',label: '名称'},
        {key: 'brand',label: '品牌'}
      ],

    };
  },
  computed: {
    // ...mapState(['menus'])
  },
  methods: {
    changePage(curPage) {

    },
    created: function () {
      // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
      // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
      // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
      // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
      // 请参考：https://lodash.com/docs#debounce
      this.debouncedGetAnswer = _.debounce(this.getProducts, 500);
    },
    getProducts() {
      if (this.question.indexOf('?') === -1) {
        this.answer = 'Questions usually contain a question mark. ;-)';
        return;
      }
      this.answer = 'Thinking...';
      var vm = this;
      axios.get('https://yesno.wtf/api')
        .then(function (response) {
          vm.answer = _.capitalize(response.data.answer)
        })
        .catch(function (error) {
          vm.answer = 'Error! Could not reach the API. ' + error
        });
    }
  }
};
</script>
