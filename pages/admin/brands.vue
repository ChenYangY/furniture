<template>
  <div>
    <AdminBar/>
    <b-container fluid='xs'>
      <b-row>
        <b-col class='col-2' type='dark' variant='dark'>
          <AdminMenu :menus="menus" :current="current" />
        </b-col>
       <b-col>
          <b-container fluid style='margin: 10px; text-align: right;'>
            <b-button variant="info" @click="clickCreate">新建</b-button>
          </b-container>
          <b-table :items="datas" :fields="fields" hover striped fixed>
            <template #cell(logo)="row">
              <b-img :src="row.item.logo" alt="" width=60></b-img>
            </template>
            <template #cell(actions)="row">
              <b-button size="sm" @click="clickUpdate(row.item)" class="mr-1" variant="info">
                编辑
              </b-button>
              <b-button size="sm" @click="deleteRecord(row.item)" variant="danger">
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
      <b-modal id="brand_modal" modal-title="{form.title}"  size="xl" @ok="submitForm()" ref="form">
        <template #modal-title>
          <h6>{{form.title}}</h6>
        </template>
        <form>
          <b-form-group
            label="id"
            label-for="brand_form_id"
            v-show="form._id"
          >
            <b-form-input
              id='brand_form_id'
              v-model="form._id"
              disabled
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="名称"
            label-for="brand_form_name"
            invalid-feedback="Name is required"
          >
            <b-form-input
              id="brand_form_name"
              v-model="form.name"
              required
            ></b-form-input>
          </b-form-group>
           <b-form-group label="logo" label-for="brand_form_file" :description="form.logo">
            <b-form-file
              id='brand_form_file'
              v-model="form.file"
              placeholder="点击添加"
              @change="changeFormFile"
            ></b-form-file>
          </b-form-group>
          <b-form-group label="介绍" label-for="brand_form_description">
            <b-form-textarea id='brand_form_description'
              v-model="form.description"
            ></b-form-textarea>
          </b-form-group>
        </form>
        <template #modal-footer="{ ok, cancel }">
          <b-button size="sm" variant="info" @click="ok()">
            {{form.btnSumitLabel}}
          </b-button>
          <b-button size="sm" variant="danger" @click="cancel()">
            取消
          </b-button>
        </template>
      </b-modal>
    </b-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AdminBar from '../../components/admin/bar';
import AdminMenu from '../../components/admin/menu';
export default {
  components: {AdminBar, AdminMenu},
  data() {
    return {
      menus: this.$store.state.menus,
      current: '品牌管理',
      pageSize: parseInt(this.$route.query.size, 10) || 10,
      pageCur: parseInt(this.$route.query.page, 10) || 1,
      form: {
        _id: '',
        title: '创建品牌',
        btnSumitLabel: '创建',
        name: '',
        logo: '',
        description: '',
        file: null,
      },
    };
  },
  computed: mapState({
    datas: states => states.admin.brands.datas,
    fields: states => states.admin.brands.fields,
    totalRows: states => states.admin.brands.totalRows,
  }),
  methods: {
    changePage(curPage) {
      this.$route.query.page = curPage;
      this.$fetch();
    },
    changeFormFile() {
      this.form.logo = '';
    },
    clickCreate() {
      this.clearForm();
      this.$bvModal.show('brand_modal');
    },
    clickUpdate(item) {
      this.clearForm();
      this.updateForm(item);
      this.$bvModal.show('brand_modal');
    },
    clearForm() {
      this.form.name = '';
      this.form._id = '';
      this.form.description = '';
      this.form.logo = '';
    },
    updateForm(item) {
      this.form.title = '更新品牌';
      this.form._id = item._id;
      this.form.btnSumitLabel = '更新';
      this.form.name = item.name;
      this.form.description = item.description;
      this.form.logo = item.logo;
    },
    async submitForm() {
      let data = {
        _id: this.form._id,
        name: this.form.name,
        description: this.form.description,
      };
      if(!this.form.logo) {
        const uploadRes = await this.$store.dispatch('admin/upload', [this.form.file]);
        if(uploadRes.code !== 0) {
          return ;
        }
        // data.logo = `${window.location.origin}${uploadRes.data.path}`;
        data.logo = uploadRes.data.paths[0];
      }
      else {
        data.logo = this.form.logo;
      }


      this.$store.commit('admin/brands/setBrandForm',data);
      if(!this.form._id) {
        await this.$store.dispatch('admin/brands/create');
      }
      else {
        await this.$store.dispatch('admin/brands/update');
      }
      this.$bvModal.hide('brand_form', 'hide');
      this.form._id = '';
      this.form.name = '';
      this.form.images = [];
      this.$fetch();
    },
    async deleteRecord(item, index) {
      await this.$store.dispatch('admin/brands/remove', {id: item._id, idx: index});
      this.$fetch();
    },

  },
  fetchOnServer: false,
  async fetch() {
    const query = {};
    query.page = parseInt(this.$route.query.page, 10) || 1;
    query.size = parseInt(this.$route.query.size, 10) || 10;
    query.sort = '-create_at';
    await this.$store.dispatch('admin/brands/index', query);
    this.pageSize = query.size || 10;
    this.pageCur = query.page || 1;
    this.$refs.paginationComponent.currentPage = query.page;
  }
};
</script>

