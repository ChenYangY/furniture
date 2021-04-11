<template>
  <div>
    <AdminBar/>
    <b-container fluid='xs'>
      <b-row>
        <b-col class='col-3' type='dark' variant='dark'>
          <AdminMenu :menus="menus" :current="current" />
        </b-col>
        <b-col>
          <b-container fluid style='margin: 10px; text-align: right;'>
            <b-button @click="createRecord" variant="info">新建</b-button>
          </b-container>
          <b-table :items="datas" :fields="fields" hover striped>
            <template #cell(status)="row">
              <b-form-checkbox switch @change="setStatus(row.item, $event)" :checked="row.item.status !== 'OFF'"></b-form-checkbox>
            </template>
            <template #cell(actions)="row">
              <b-button size="sm" @click="updateRecord(row.item, row.index, $event.target)" class="mr-1" variant="info">
                编辑
              </b-button>
              <b-button size="sm" @click="deleteRecord(row.item, row.index, $event.target)" variant="danger">
                删除
              </b-button>
            </template>
          </b-table>
          <b-pagination
            :currentPage="pageCur"
            :total-rows="totalRows"
            :per-page="pageSize"
            first-text="首页"
            prev-text="前一页"
            next-text="下一页"
            last-text="尾页"
            align="center"
            v-on:change="changePage"
            ref="paginationComponent"
          ></b-pagination>
        </b-col>
      </b-row>
      <!-- <b-modal :id="123" :title="hello" ok-only @hide="resetInfoModal"> -->
      <!-- <pre>123</pre>
    </b-modal> -->
    </b-container>
  </div>
</template>

<script>
import AdminBar from '../../components/admin/bar';
import AdminMenu from '../../components/admin/menu';
export default {
  components: {AdminBar, AdminMenu},
  data() {
    return {
      menus: this.$store.state.menus,
      current: '轮播图管理',
      datas: this.$store.state.admin.carousels.datas,
      fields: [
        {key: '_id',label: 'Id'},
        {key: 'name',label: '名称'},
        {key: 'status',label: '状态'},
        {key: 'create_at', label: '创建时间'},
        {key: 'update_at', label: '更新时间'},
        {key: 'actions', label: '操作'}
      ],
      totalRows: 10,
      pageSize: parseInt(this.$route.query.size, 10) || 10,
      pageCur: parseInt(this.$route.query.page, 10) || 1,
    };
  },
  methods: {
    changePage(curPage) {
      this.$route.query.page = curPage;
      this.$fetch();
    },
    resetInfoModal() {
      this.infoModal.title = '';
      this.infoModal.content = '';
    },
    async setStatus(item, val) {
      if(val) {
        item.status = 'ON';
      }
      else {
        item.status = 'OFF';
      }
      const res = await this.$store.commit('admin/carousels/setStatus', {
        id: item._id,
        status: item.status,
      });
      if(res.code != 0) {
        console.log(res.msg);
      }
    },
    clickUpdate(item, index, ele) {

    },

    updateRecord() {

    },
    async deleteRecord(item, index) {
      const res = await this.$store.commit('admin/carousels/remove', item._id);
      console.log(res);
      if(res.code !== 0) {
        console.log(res.msg);
        return;
      }
      this.datas.splice(index, 1);
      this.$fetch();
    },
    createRecord() {

    }
  },
  fetchOnServer: false,
  async fetch() {
    const query = {};
    query.page = parseInt(this.$route.query.page, 10) || 1;
    query.size = parseInt(this.$route.query.size, 10) || 10;
    let params = [];
    Object.keys(query).forEach((key) => {
      params.push(`${key}=${query[key]}`);
    });
    const res = await fetch(
      `http://localhost:3005/admin-api/carousels?${params.join('&')}`
    ).then(res => res.json());
    if(res.code === -1) {
      console.log(res.msg);
      return;
    }
    // console.log(query);
    this.datas = res.data.docs;
    this.totalRows = res.data.count;
    this.pageSize = query.size || 10;
    this.pageCur = query.page || 1;
    this.$refs.paginationComponent.currentPage = query.page;
  }
};
</script>

