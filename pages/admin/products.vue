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
            <template #cell(tags)="row">
              {{row.item.tags.join(',')}}
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
      <b-modal id="product_modal" modal-title="{form.title}"  size="xl" @ok="submitForm()" ref="form">
        <template #modal-title>
          <h6>{{form.title}}</h6>
        </template>
        <form>
          <b-form-group
            label="id"
            label-for="product_form_id"
            v-show="form._id"
          >
            <b-form-input
              id='product_form_id'
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
              id="product_form_name"
              v-model="form.name"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="品牌" label-for="product_form_brand">
            <b-select :optioins="brands"></b-select>
          </b-form-group>
          <b-form-group
            label="尺寸"
            label-for="product_form_dimensions"
          >
            <b-input type='text' v-model="form.dimensions" id='product_form_dimensions'/>
          </b-form-group>
          <b-form-group
            label="材料"
            label-for="product_form_material"
          >
            <b-input type='text' v-model="form.material" id='product_form_material'/>
          </b-form-group>
          <b-form-group
            label="标签"
            label-for="brand_form_tags"
          >
            <TagInput :tags="form.tags" @delete='delTag' @add="addTag"/>
          </b-form-group>
          <ImageInput :images="form.images" @del="delFormImage" @add='addFormImage'/>
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
import _ from 'lodash';
import AdminBar from '../../components/admin/bar';
import AdminMenu from '../../components/admin/menu';
import TagInput from '../../components/TagInput';
import ImageInput from '../../components/ImageInuput';
export default {
  components: {AdminBar, AdminMenu, TagInput, ImageInput},
  data() {
    return {
      menus: this.$store.state.menus,
      current: '产品管理',
      pageSize: parseInt(this.$route.query.size, 10) || 10,
      pageCur: parseInt(this.$route.query.page, 10) || 1,
      brands: [],
      form: {
        _id: '',
        title: '创建产品',
        btnSumitLabel: '创建',
        name: '',
        tags: [''],
        description: '',
        material: '',
        images: [],
        dimensions: '',
        brand: null,
        file: null,
      },
    };
  },
  computed: mapState({
    datas: states => states.admin.products.datas,
    fields: states => states.admin.products.fields,
    totalRows: states => states.admin.products.totalRows,
  }),
  methods: {
    addTag(tag) {
      this.form.tags.push(tag);
    },
    delTag(tag) {
      this.form.tags.splice(this.form.tags.indexOf(tag),1);
    },
    delFormImage(index) {
      this.form.images.splice(index, 1);
    },
    addFormImage(path) {
      const url = `${window.location.origin}${path}`;
      this.form.images.push(url);
    },
    changePage(curPage) {
      this.$route.query.page = curPage;
      this.$fetch();
    },
    clickCreate() {
      this.clearForm();
      this.$bvModal.show('product_modal');
    },
    clickUpdate(item) {
      this.clearForm();
      this.updateForm(item);
      this.$bvModal.show('product_modal');
    },
    clearForm() {
      this.form._id = '';
      this.form.name = '';
      this.form.description = '';
      this.form.material = '';
      this.form.demensions = '';
      this.form.tags = [];
      this.form.models = [];
      this.form.title = '新建产品';
      this.form.btnSumitLabel = '创建';
    },
    updateForm(item) {
      this.form.title = '更新产品';
      this.form.btnSumitLabel = '更新';
      this.form._id = item._id;
      this.form.name = item.name;
      this.form.description = item.description;
      this.form.material = item.material;
      this.form.dimensions = item.dimensions;
      this.form.tags = item.tags;
      this.form.images = item.images;
    },
    async submitForm() {
      const fields = [
        '_id', 'name', 'description', 'material', 'brand',
        'images', 'dimensions', 'tags',
      ];
      let data = _.pick(this.form, fields);
      this.$store.commit('admin/products/setProductForm', data);
      if(!this.form._id) {
        await this.$store.dispatch('admin/products/create');
      }
      else {
        await this.$store.dispatch('admin/products/update');
      }
      this.$bvModal.hide('product_form', 'hide');
      this.clearForm();
      this.$fetch();
    },
    async deleteRecord(item, index) {
      await this.$store.dispatch('admin/products/remove', {id: item._id, idx: index});
      this.$fetch();
    },

  },
  fetchOnServer: false,
  async fetch() {
    const query = {};
    query.page = parseInt(this.$route.query.page, 10) || 1;
    query.size = parseInt(this.$route.query.size, 10) || 10;
    query.sort = '-create_at';
    await this.$store.dispatch('admin/products/index', query);
    this.pageSize = query.size || 10;
    this.pageCur = query.page || 1;
    this.$refs.paginationComponent.currentPage = query.page;
  }
};
</script>

