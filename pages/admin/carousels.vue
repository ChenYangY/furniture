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
      <b-modal id="carousel_modal" modal-title="{carouselForm.title}"  size="xl">
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
                   <b-img class='col-3' v-if="image.pc_url" :src="image.pc_url"  height=100 />

                  <b-img class='col-3' v-if="image.m_url" :src="image.m_url" width=50 />

                  <!-- <a :href="image.url" class='col-6' style='overflow:hidden;'>{{image.url}}</a> -->
                  <span class='col-4' style='overflow:hidden;'>{{image.redirect}}</span>
                  <b-icon class='col-1' icon='x-square' style='margin-top: 5px' @click="removeImageItem(idx)"/>
                </li>
              </ul>
          </div>
        </form>
        <form class='carousel-image-form'>
          <div style='padding-bottom: 5px;'><h5>图片元素添加</h5></div>
          <b-form-group label="添加电脑端图片" label-for="carousel_form_file">
            <b-form-file
              id='carousel_form_pc_file'
              v-model="carouselForm.pc_file"
              placeholder="点击添加"
            ></b-form-file>
          </b-form-group>
          <b-form-group label="添加移动端图片" label-for="carousel_form_file">
            <b-form-file
              id='carousel_form_m_file'
              v-model="carouselForm.m_file"
              placeholder="点击添加"
            ></b-form-file>
          </b-form-group>
          <b-form-group label="跳转链接" label-for="carousel_form_direct" hidden>
            <b-form-input
              id="carousel_form_direct"
              v-model="carouselForm.redirect"
              placeholder="https://www.baidu.com"
            ></b-form-input>
          </b-form-group>
          <b-button variant="info" @click="addImageItem">添加</b-button>
        </form>
        <template #modal-footer="{ cancel }">
          <b-button size="sm" variant="info" @click="submitCarouselForm()">
            {{carouselForm.btnSumitLabel}}
          </b-button>
          <b-button size="sm" variant="danger" @click="cancel()">
            取消
          </b-button>
        </template>
      </b-modal>
    </b-container>
    <AlertHint :msg="alertMsg" v-show="alertMsg"/>
    <Loading :progress="uploadProgress" :isShow="isShowUploadLoading" />
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
import AlertHint from '../../components/AlertHint.vue';
export default {
  components: {AdminBar, AdminMenu, AlertHint},
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
        pc_file: null,
        m_file: null,
      },
      alertMsg: '',
    };
  },
  computed: mapState({
    datas: states => states.admin.carousels.datas,
    // carouselForm: states => states.admin.carousels.carouselForm,
    fields: states => states.admin.carousels.fields,
    totalRows: states => states.admin.carousels.totalRows,
    isShowUploadLoading: states => states.admin.isShowUploadLoading,
    uploadProgress: states => states.admin.uploadProgress
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
      const res = await this.$store.dispatch('admin/carousels/setStatus', {
        id: item._id,
        status: val ? 'ON' : 'OFF',
      });
      if(res.code !== 0) {
        this.alertMsg = res.msg;
        return;
      }
    },
    async addImageItem() {
      if(!this.carouselForm.pc_file && !this.carouselForm.m_file) {
        this.alertMsg = '还未选择图片';
        return;
      }
      const requestBody = {redirect: this.carouselForm.redirect};
      if(this.carouselForm.pc_file) {
        let body = await this.$store.dispatch('admin/upload', [this.carouselForm.pc_file]);
        if(body.code !== 0) {
          this.alertMsg = '电脑端图片:' + body.msg;
          return;
        }
        requestBody.pc_url = body.data.paths[0];
      }
      if(this.carouselForm.m_file) {
        let body = await this.$store.dispatch('admin/upload', [this.carouselForm.m_file]);
        if(body.code !== 0) {
          this.alertMsg = '移动端端图片:' + body.msg;
          return;
        }
        requestBody.m_url = body.data.paths[0];
      }

      // let origin = window.location.origin;
      this.carouselForm.images.push(requestBody);
      this.carouselForm.m_file = null,
      this.carouselForm.pc_file = null;
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
      this.carouselForm.btnSumitLabel = '创建';
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
      let res = null;
      if(!this.carouselForm._id) {
        res = await this.$store.dispatch('admin/carousels/create');
      }
      else {
        res = await this.$store.dispatch('admin/carousels/update');
      }
      if(res.code) {
        this.alertMsg = res.msg;
        return;
      }
      this.$bvModal.hide('carousel_modal');
      this.clearCarouselForm();
      await this.$fetch();
    },
    async deleteRecord(item, index) {
      let res = await this.$store.dispatch('admin/carousels/remove', {id: item._id, idx: index});
      if(res.code) {
        this.alertMsg = res.msg;
        return;
      }
      this.$fetch();
    },

  },
  fetchOnServer: false,
  async fetch() {
    const query = {};
    query.page = parseInt(this.$route.query.page, 10) || 1;
    query.size = parseInt(this.$route.query.size, 10) || 10;
    query.sort = '-create_at';
    let res = await this.$store.dispatch('admin/carousels/index', query);
    if(res.code) {
      this.alertMsg = res.msg;
      return;
    }
    this.pageSize = query.size || 10;
    this.pageCur = query.page || 1;
    this.$refs.paginationComponent.currentPage = query.page;
  }
};
</script>

