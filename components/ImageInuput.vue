<template>
  <b-form-group
    label="图片"
    label-for="product_form_images"
  >
    <div>
      <div v-for="(image, index) in images" :key="index" class='image-input-item'>
        <b-img  :src="image" thumbnail width=100 />
        <b-icon icon='x' @click="del(index)"/>
      </div>
    </div>
    <b-form-file
      id='product_form_images'
      placeholder="点击添加"
      v-model="files"
      multiple
      @change="add"
    ></b-form-file>
  </b-form-group>
</template>

<style>
  .image-input-item {
    margin: 5px;
    display: inline-block;
  }

</style>

<script>
export default {
  data() {
    return {files: []};
  },
  props: {
    images: Array,
  },
  methods: {
    del(index) {
      this.$emit('del', index);
    },
    async add(event) {
      if(!event.target.files[0]) return;
      let response = await this.$store.dispatch('admin/upload', event.target.files);
      this.files = [];
      if(response.code < 0) {
        this.$emit('error', response.msg);
        return ;
      }
      this.$emit('add', response.data.paths);
    }
  }
};
</script>
