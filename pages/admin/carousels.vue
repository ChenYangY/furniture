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
            <b-button variant="info" @click="clickCreate">新建</b-button>
          </b-container>
          <b-table :items="datas" :fields="fields" hover striped>
            <template #cell(status)="row">
              <b-form-checkbox switch @change="setStatus(row.item, $event)" :checked="row.item.status !== 'OFF'"></b-form-checkbox>
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
      <b-modal id="carousel_modal" modal-title="{carouselForm.title}"  size="xl" @ok="submitCarouselForm()" ref="carouselForm">
        <template #modal-title>
          <h6>{{carouselForm.title}}</h6>
        </template>
        <form>
          <b-form-group
            label="id"
            label-for="carousel_form_id"
            v-show="carouselForm._id"
          >
            <b-form-input
              id='carousel_form_id'
              v-model="carouselForm._id"
              disabled
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="名称"
            label-for="carousel_form_name"
            invalid-feedback="Name is required"
          >
            <b-form-input
              id="carousel_form_name"
              v-model="carouselForm.name"
              required
            ></b-form-input>
          </b-form-group>
          <div>
              <label>轮播图片</label>
              <ul style='padding-left: 10px;'>
                <li v-for="(image, idx) in carouselForm.images" :key="idx" class='row' style='box-shadow: 1px 1px 1px #888888;margin: 2px;'>
                  <a :href="image.url" class='col-6' style='overflow:hidden;'>{{image.url}}</a>
                  <span class='col-4' style='overflow:hidden;'>{{image.redirect}}</span>
                  <b-icon class='col-1' icon='x-square' style='margin-top: 5px' @click="removeImageItem(idx)"/>
                </li>
              </ul>
          </div>
        </form>
        <form class='carousel-image-form'>
          <div style='padding-bottom: 5px;'><h5>图片元素添加</h5></div>
          <b-form-group label="添加图片" label-for="carousel_form_file">
            <b-form-file
              id='carousel_form_file'
              v-model="carouselForm.file"
              placeholder="点击添加"
            ></b-form-file>
          </b-form-group>
          <b-form-group label="跳转链接" label-for="carousel_form_direct">
            <b-form-input
              id="carousel_form_direct"
              v-model="carouselForm.redirect"
              placeholder="https://www.baidu.com"
            ></b-form-input>
          </b-form-group>
          <b-button variant="info" @click="addImageItem">添加</b-button>
        </form>
        <template #modal-footer="{ ok, cancel }">
          <b-button size="sm" variant="info" @click="ok()">
            {{carouselForm.btnSumitLabel}}
          </b-button>
          <b-button size="sm" variant="danger" @click="cancel()">
            取消
          </b-button>
        </template>
      </b-modal>
    </b-container>
  </div>
</template>

<style scoped>
  .carousel-image-form {
    padding:20px;
    border: 1px solid black;
  }
  .custom-file-input:lang(en) ~ .custom-file-label::after {
    content: '浏览';
  }
</style>

<script>
import { mapState } from 'vuex';
import AdminBar from '../../components/admin/bar';
import AdminMenu from '../../components/admin/menu';
export default {
  components: {AdminBar, AdminMenu},
  data() {
    return {
      menus: this.$store.state.menus,
      current: '轮播图管理',
      pageSize: parseInt(this.$route.query.size, 10) || 10,
      pageCur: parseInt(this.$route.query.page, 10) || 1,
      carouselForm: {
        _id: '',
        title: '创建轮播图',
        btnSumitLabel: '创建',
        name: '',
        images: [],
        redirect: '',
        file: null,
      },
    };
  },
  computed: mapState({
    datas: states => states.admin.carousels.datas,
    // carouselForm: states => states.admin.carousels.carouselForm,
    fields: states => states.admin.carousels.fields,
    totalRows: states => states.admin.carousels.totalRows,
  }),
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
      const res = await this.$store.dispatch('admin/carousels/setStatus', {
        id: item._id,
        status: item.status,
      });
      if(res.code != 0) {
        console.log(res.msg);
      }
    },
    async addImageItem() {
      let body = await this.$store.dispatch('admin/upload', this.carouselForm.file);
      if(body.code !== 0) {
        console.log(body.msg);
        return;
      }
      // let origin = window.location.origin;
      this.carouselForm.images.push({
        url: `${body.data.path}`,
        redirect: this.carouselForm.redirect,
      });

      this.carouselForm.file = null,
      this.carouselForm.redirect = '';

    },
    removeImageItem(idx) {
      this.carouselForm.images.splice(idx, 1);
    },
    clickCreate() {
      this.clearCarouselForm();
      this.$bvModal.show('carousel_modal');
    },
    clickUpdate(item) {
      this.clearCarouselForm();
      this.updateCarousel(item);
      this.$bvModal.show('carousel_modal');
    },
    clearCarouselForm() {
      this.carouselForm.title = '创建轮播图';
      this.carouselForm._id = '';
      this.carouselForm.name = '';
      this.carouselForm.images = [];
    },
    updateCarousel(item) {
      this.carouselForm.title = '更新轮播图';
      this.carouselForm._id = item._id;
      this.carouselForm.btnSumitLabel = '更新';
      this.carouselForm.name = item.name;
      this.carouselForm.images = item.images.concat([]);
    },
    async submitCarouselForm() {
      let data = {
        _id: this.carouselForm._id,
        name: this.carouselForm.name,
        images: this.carouselForm.images,
      };
      this.$store.commit('admin/carousels/setCarouselForm',data);

      if(!this.carouselForm._id) {
        await this.$store.dispatch('admin/carousels/create');
      }
      else {
        await this.$store.dispatch('admin/carousels/update');
      }
      this.$bvModal.hide('carousel_form', 'hide');
      this.carouselForm._id = '';
      this.carouselForm.name = '';
      this.carouselForm.images = [];
      this.$fetch();
    },
    async deleteRecord(item, index) {
      await this.$store.dispatch('admin/carousels/remove', {id: item._id, idx: index});
      this.$fetch();
    },

  },
  fetchOnServer: false,
  async fetch() {
    const query = {};
    query.page = parseInt(this.$route.query.page, 10) || 1;
    query.size = parseInt(this.$route.query.size, 10) || 10;
    query.sort = '-create_at';
    await this.$store.dispatch('admin/carousels/index', query);
    this.pageSize = query.size || 10;
    this.pageCur = query.page || 1;
    this.$refs.paginationComponent.currentPage = query.page;
  }
};
</script>

